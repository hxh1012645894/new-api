package model

import (
	"context"
	"unicode/utf8"

	"gorm.io/gorm"
)

// RequestAudit stores an admin-only snapshot of a relayed text-generation call:
// the raw client request body and the raw response bytes (SSE events for
// streaming calls, so tool-call deltas are preserved verbatim). Bodies are
// truncated to the configured caps before insert.
type RequestAudit struct {
	Id                int64  `json:"id" gorm:"primaryKey"`
	CreatedAt         int64  `json:"created_at" gorm:"bigint;index"`
	UserId            int    `json:"user_id" gorm:"index"`
	Username          string `json:"username" gorm:"index;default:''"`
	TokenId           int    `json:"token_id" gorm:"default:0"`
	TokenName         string `json:"token_name" gorm:"default:''"`
	ChannelId         int    `json:"channel_id" gorm:"index;default:0"`
	ModelName         string `json:"model_name" gorm:"default:''"`
	IsStream          bool   `json:"is_stream"`
	StatusCode        int    `json:"status_code" gorm:"default:0"`
	UseTimeMs         int64  `json:"use_time_ms" gorm:"default:0"`
	RequestId         string `json:"request_id" gorm:"type:varchar(64);index;default:''"`
	RequestBody       string `json:"request_body"`
	ResponseBody      string `json:"response_body"`
	RequestTruncated  bool   `json:"request_truncated"`
	ResponseTruncated bool   `json:"response_truncated"`
}

func InsertRequestAudit(audit *RequestAudit) error {
	return DB.Create(audit).Error
}

type RequestAuditQueryParams struct {
	Username  string
	ModelName string
	RequestId string
	Keyword   string
	StartAt   int64
	EndAt     int64
}

func GetAllRequestAudits(startIdx int, num int, params RequestAuditQueryParams) ([]*RequestAudit, int64, error) {
	var audits []*RequestAudit
	var total int64
	tx := applyRequestAuditFilters(DB.Model(&RequestAudit{}), params)
	err := tx.Count(&total).Error
	if err != nil {
		return nil, 0, err
	}
	// Bodies can be large; the list view carries metadata only.
	err = tx.Omit("request_body", "response_body").Order("id desc").Limit(num).Offset(startIdx).Find(&audits).Error
	return audits, total, err
}

func GetRequestAuditById(id int64) (*RequestAudit, error) {
	if id <= 0 {
		return nil, nil
	}
	var audit *RequestAudit
	err := DB.First(&audit, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return audit, nil
}

func applyRequestAuditFilters(tx *gorm.DB, params RequestAuditQueryParams) *gorm.DB {
	if params.Username != "" {
		tx = tx.Where("username = ?", params.Username)
	}
	if params.ModelName != "" {
		tx = tx.Where("model_name = ?", params.ModelName)
	}
	if params.RequestId != "" {
		tx = tx.Where("request_id = ?", params.RequestId)
	}
	if params.StartAt != 0 {
		tx = tx.Where("created_at >= ?", params.StartAt)
	}
	if params.EndAt != 0 {
		tx = tx.Where("created_at <= ?", params.EndAt)
	}
	if params.Keyword != "" {
		like := "%" + params.Keyword + "%"
		tx = tx.Where(
			"username LIKE ? OR model_name LIKE ? OR request_id LIKE ? OR token_name LIKE ?",
			like, like, like, like,
		)
	}
	return tx
}

func CountOldRequestAudit(ctx context.Context, targetTimestamp int64) (int64, error) {
	var total int64
	err := DB.WithContext(ctx).Model(&RequestAudit{}).Where("created_at < ?", targetTimestamp).Count(&total).Error
	return total, err
}

// DeleteOldRequestAuditBatch removes expired audit rows in batches so one
// retention pass cannot hold a long transaction on a large table.
func DeleteOldRequestAuditBatch(ctx context.Context, targetTimestamp int64, limit int) (int64, error) {
	if limit <= 0 {
		limit = 100
	}
	result := DB.WithContext(ctx).Where("created_at < ?", targetTimestamp).Limit(limit).Delete(&RequestAudit{})
	if result.Error != nil {
		return 0, result.Error
	}
	return result.RowsAffected, nil
}

// TruncateAuditBody caps a captured body and reports whether content was cut.
// The cut point is walked back off a possibly-split trailing UTF-8 rune.
func TruncateAuditBody(body string, maxBytes int) (string, bool) {
	if maxBytes <= 0 || len(body) <= maxBytes {
		return body, false
	}
	cut := body[:maxBytes]
	for len(cut) > 0 {
		if r, size := utf8.DecodeLastRuneInString(cut); r != utf8.RuneError || size != 1 {
			break
		}
		cut = cut[:len(cut)-1]
	}
	return cut, true
}
