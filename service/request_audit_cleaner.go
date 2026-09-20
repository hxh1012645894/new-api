package service

import (
	"context"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting/operation_setting"
)

// StartRequestAuditCleaner periodically deletes captured request audits older
// than the retention window. It runs on every node; deletes are idempotent.
// RetentionDays <= 0 disables expiry (records are kept until cleaned manually).
func StartRequestAuditCleaner() {
	for {
		time.Sleep(time.Hour)
		retentionDays := operation_setting.GetAuditSetting().RetentionDays
		if retentionDays <= 0 {
			continue
		}
		target := time.Now().Unix() - int64(retentionDays)*86400
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
		for {
			deleted, err := model.DeleteOldRequestAuditBatch(ctx, target, 500)
			if err != nil {
				common.SysError("failed to clean old request audits: " + err.Error())
				break
			}
			if deleted < 500 {
				break
			}
		}
		cancel()
	}
}
