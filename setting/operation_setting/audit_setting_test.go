package operation_setting

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRefreshAuditChannelFilter(t *testing.T) {
	t.Run("empty allows all channels", func(t *testing.T) {
		auditSetting.ChannelIds = ""
		RefreshAuditChannelFilter()
		assert.True(t, AuditChannelAllowed(1))
		assert.True(t, AuditChannelAllowed(999))
	})

	t.Run("allowlist narrows capture", func(t *testing.T) {
		auditSetting.ChannelIds = "1, 3,x,0,-2"
		RefreshAuditChannelFilter()
		assert.True(t, AuditChannelAllowed(1))
		assert.True(t, AuditChannelAllowed(3))
		assert.False(t, AuditChannelAllowed(2))
		assert.False(t, AuditChannelAllowed(999))
	})

	t.Run("garbage only allows nothing", func(t *testing.T) {
		auditSetting.ChannelIds = "x,y,z"
		RefreshAuditChannelFilter()
		assert.False(t, AuditChannelAllowed(1))
	})

	t.Cleanup(func() {
		auditSetting.ChannelIds = ""
		RefreshAuditChannelFilter()
	})
}
