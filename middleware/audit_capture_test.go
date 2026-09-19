package middleware

import (
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func newTestAuditContext(t *testing.T) *gin.Context {
	t.Helper()
	gin.SetMode(gin.TestMode)
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	require.NotNil(t, c.Writer)
	return c
}

func TestAuditResponseRecorderCapsBodyAndCountsTotal(t *testing.T) {
	c := newTestAuditContext(t)
	recorder := newAuditResponseRecorder(c.Writer, 8)

	n, err := recorder.Write([]byte("1234567890"))
	require.NoError(t, err)
	assert.Equal(t, 10, n)
	assert.Equal(t, "12345678", string(recorder.body))
	assert.Equal(t, int64(10), recorder.total)
	assert.True(t, recorder.total > int64(recorder.maxSize))
}

func TestAuditResponseRecorderWriteString(t *testing.T) {
	c := newTestAuditContext(t)
	recorder := newAuditResponseRecorder(c.Writer, 4)

	n, err := recorder.WriteString("abcdefgh")
	require.NoError(t, err)
	assert.Equal(t, 8, n)
	assert.Equal(t, "abcd", string(recorder.body))
	assert.Equal(t, int64(8), recorder.total)
}

func TestAuditResponseRecorderPassesThroughStatus(t *testing.T) {
	c := newTestAuditContext(t)
	recorder := newAuditResponseRecorder(c.Writer, 16)

	recorder.WriteHeader(200)
	_, err := recorder.WriteString("ok")
	require.NoError(t, err)
	assert.Equal(t, 200, recorder.Status())
	assert.Equal(t, "ok", string(recorder.body))
}

func TestAuditResponseRecorderSmallPayloadNotTruncated(t *testing.T) {
	c := newTestAuditContext(t)
	recorder := newAuditResponseRecorder(c.Writer, 1024)

	payload := strings.Repeat("x", 100)
	_, err := recorder.Write([]byte(payload))
	require.NoError(t, err)
	assert.Equal(t, payload, string(recorder.body))
	assert.False(t, recorder.total > int64(recorder.maxSize))
}
