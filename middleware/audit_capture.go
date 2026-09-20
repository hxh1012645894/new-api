package middleware

import (
	"io"
	"math/rand"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting/operation_setting"

	"github.com/gin-gonic/gin"
)

// auditResponseRecorder tees bytes written to the client into a capped buffer.
// It records total bytes written so truncated captures can be flagged even
// though only the first maxSize bytes are kept.
type auditResponseRecorder struct {
	gin.ResponseWriter
	total   int64
	maxSize int
	body    []byte
}

func newAuditResponseRecorder(writer gin.ResponseWriter, maxSize int) *auditResponseRecorder {
	return &auditResponseRecorder{
		ResponseWriter: writer,
		maxSize:        maxSize,
		body:           make([]byte, 0, 4096),
	}
}

func (r *auditResponseRecorder) capture(b []byte) {
	r.total += int64(len(b))
	if len(r.body) >= r.maxSize {
		return
	}
	if room := r.maxSize - len(r.body); len(b) > room {
		b = b[:room]
	}
	r.body = append(r.body, b...)
}

func (r *auditResponseRecorder) Write(b []byte) (int, error) {
	r.capture(b)
	return r.ResponseWriter.Write(b)
}

func (r *auditResponseRecorder) WriteString(s string) (int, error) {
	r.capture([]byte(s))
	return r.ResponseWriter.WriteString(s)
}

// AuditCapture records the raw request/response of a relay call for admin
// audit. It must be registered after TokenAuth and Distribute so the user,
// token, channel, and model are already bound to the request context. Capture
// is skipped entirely when the feature is off, the channel is not allowlisted,
// or the sampling gate rejects the call; the record is persisted off the
// request path.
func AuditCapture() gin.HandlerFunc {
	return func(c *gin.Context) {
		setting := operation_setting.GetAuditSetting()
		if !setting.Enabled || setting.MaxResponseBytes <= 0 {
			c.Next()
			return
		}
		channelId := common.GetContextKeyInt(c, constant.ContextKeyChannelId)
		if !operation_setting.AuditChannelAllowed(channelId) {
			c.Next()
			return
		}
		if setting.SampleRate < 100 && rand.Intn(100) >= setting.SampleRate {
			c.Next()
			return
		}

		requestBody, requestTruncated := readAuditRequestBody(c, setting.MaxRequestBytes)

		recorder := newAuditResponseRecorder(c.Writer, setting.MaxResponseBytes)
		c.Writer = recorder
		startTime := time.Now()
		c.Next()

		responseBody, responseTruncated := model.TruncateAuditBody(string(recorder.body), setting.MaxResponseBytes)
		go saveRequestAudit(auditCaptureParams{
			UserId:                c.GetInt("id"),
			TokenId:               c.GetInt("token_id"),
			ChannelId:             channelId,
			ModelName:             common.GetContextKeyString(c, constant.ContextKeyOriginalModel),
			RequestId:             c.GetString(common.RequestIdKey),
			RequestBody:           requestBody,
			ResponseBody:          responseBody,
			RequestBodyTruncated:  requestTruncated,
			ResponseBodyTruncated: responseTruncated || recorder.total > int64(setting.MaxResponseBytes),
			StatusCode:            recorder.Status(),
			IsStream: strings.HasPrefix(recorder.Header().Get("Content-Type"),
				"text/event-stream"),
			UseTimeMs: time.Since(startTime).Milliseconds(),
		})
	}
}

// readAuditRequestBody snapshots at most maxBytes+1 bytes of the request body
// and rewinds it so downstream relay handlers still read the full payload.
func readAuditRequestBody(c *gin.Context, maxBytes int) (string, bool) {
	seeker, err := common.GetRequestBody(c)
	if err != nil {
		return "", false
	}
	readSeeker, ok := seeker.(io.ReadSeeker)
	if !ok {
		return "", false
	}
	raw, err := io.ReadAll(io.LimitReader(readSeeker, int64(maxBytes)+1))
	if _, seekErr := readSeeker.Seek(0, io.SeekStart); seekErr != nil {
		common.SysError("failed to rewind request body after audit snapshot: " + seekErr.Error())
	}
	if err != nil && len(raw) == 0 {
		return "", false
	}
	return model.TruncateAuditBody(string(raw), maxBytes)
}

type auditCaptureParams struct {
	UserId                int
	TokenId               int
	ChannelId             int
	ModelName             string
	RequestId             string
	RequestBody           string
	ResponseBody          string
	RequestBodyTruncated  bool
	ResponseBodyTruncated bool
	StatusCode            int
	IsStream              bool
	UseTimeMs             int64
}

// saveRequestAudit persists one capture off the request path. Username and
// token name are resolved here (cache-backed) so the hot path stays free of
// lookups.
func saveRequestAudit(params auditCaptureParams) {
	username, _ := model.GetUsernameById(params.UserId, false)
	tokenName := ""
	if params.TokenId > 0 {
		if token, err := model.GetTokenById(params.TokenId); err == nil && token != nil {
			tokenName = token.Name
		}
	}
	audit := &model.RequestAudit{
		CreatedAt:         time.Now().Unix(),
		UserId:            params.UserId,
		Username:          username,
		TokenId:           params.TokenId,
		TokenName:         tokenName,
		ChannelId:         params.ChannelId,
		ModelName:         params.ModelName,
		IsStream:          params.IsStream,
		StatusCode:        params.StatusCode,
		UseTimeMs:         params.UseTimeMs,
		RequestId:         params.RequestId,
		RequestBody:       params.RequestBody,
		ResponseBody:      params.ResponseBody,
		RequestTruncated:  params.RequestBodyTruncated,
		ResponseTruncated: params.ResponseBodyTruncated,
	}
	if err := model.InsertRequestAudit(audit); err != nil {
		common.SysError("failed to insert request audit: " + err.Error())
	}
}
