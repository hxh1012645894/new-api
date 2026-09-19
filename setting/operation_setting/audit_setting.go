package operation_setting

import (
	"strconv"
	"strings"
	"sync"

	"github.com/QuantumNous/new-api/setting/config"
)

// AuditSetting controls the optional request/response content audit for
// text-generation relay calls. Captured bodies are admin-only.
type AuditSetting struct {
	// Enabled turns on capture globally; per-channel narrowing is done via
	// ChannelIds (empty means every channel).
	Enabled bool `json:"enabled"`
	// SampleRate is the capture percentage, 0-100.
	SampleRate int `json:"sample_rate"`
	// MaxRequestBytes / MaxResponseBytes cap stored bodies; bytes beyond the
	// cap are discarded and flagged as truncated.
	MaxRequestBytes  int `json:"max_request_bytes"`
	MaxResponseBytes int `json:"max_response_bytes"`
	// RetentionDays deletes captured rows older than N days; 0 keeps forever.
	RetentionDays int `json:"retention_days"`
	// ChannelIds is a comma-separated channel id allowlist; empty = all.
	ChannelIds string `json:"channel_ids"`
}

var auditSetting = AuditSetting{
	Enabled:          false,
	SampleRate:       100,
	MaxRequestBytes:  32768,
	MaxResponseBytes: 65536,
	RetentionDays:    7,
	ChannelIds:       "",
}

func init() {
	config.GlobalConfig.Register("audit_setting", &auditSetting)
}

func GetAuditSetting() *AuditSetting {
	return &auditSetting
}

// auditChannelFilter caches the parsed ChannelIds allowlist. nil means "all
// channels allowed"; an empty non-nil set means "none".
var (
	auditChannelFilterMu sync.RWMutex
	auditChannelFilter   map[int]struct{}
)

// RefreshAuditChannelFilter re-parses the allowlist after a config update.
func RefreshAuditChannelFilter() {
	auditChannelFilterMu.Lock()
	defer auditChannelFilterMu.Unlock()
	auditChannelFilter = nil
	raw := strings.TrimSpace(auditSetting.ChannelIds)
	if raw == "" {
		return
	}
	filter := make(map[int]struct{})
	for _, part := range strings.Split(raw, ",") {
		id, err := strconv.Atoi(strings.TrimSpace(part))
		if err != nil || id <= 0 {
			continue
		}
		filter[id] = struct{}{}
	}
	auditChannelFilter = filter
}

// AuditChannelAllowed reports whether capture applies to the channel.
func AuditChannelAllowed(channelId int) bool {
	auditChannelFilterMu.RLock()
	defer auditChannelFilterMu.RUnlock()
	if auditChannelFilter == nil {
		return true
	}
	_, ok := auditChannelFilter[channelId]
	return ok
}
