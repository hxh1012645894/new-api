package model

import (
	"strings"
	"testing"
	"unicode/utf8"

	"github.com/stretchr/testify/assert"
)

func TestTruncateAuditBody(t *testing.T) {
	tests := []struct {
		name          string
		body          string
		maxBytes      int
		want          string
		wantTruncated bool
	}{
		{name: "within cap", body: "hello", maxBytes: 10, want: "hello", wantTruncated: false},
		{name: "exact cap", body: "hello", maxBytes: 5, want: "hello", wantTruncated: false},
		{name: "over cap", body: "hello world", maxBytes: 5, want: "hello", wantTruncated: true},
		{name: "zero cap keeps body", body: "hello", maxBytes: 0, want: "hello", wantTruncated: false},
		{
			name:          "cut does not split multi-byte rune",
			body:          "你好",
			maxBytes:      4,
			want:          "你",
			wantTruncated: true,
		},
		{
			name:          "cap smaller than one rune",
			body:          "你",
			maxBytes:      2,
			want:          "",
			wantTruncated: true,
		},
		{
			name:          "ascii mixed with multibyte",
			body:          "ab中cd",
			maxBytes:      4,
			want:          "ab",
			wantTruncated: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, truncated := TruncateAuditBody(tt.body, tt.maxBytes)
			assert.Equal(t, tt.wantTruncated, truncated)
			assert.Equal(t, tt.want, got)
			assert.True(t, utf8.ValidString(got))
			if tt.maxBytes > 0 && truncated {
				assert.LessOrEqual(t, len(got), tt.maxBytes)
			}
		})
	}
}

func TestTruncateAuditBodyLargePayload(t *testing.T) {
	body := strings.Repeat("a", 100000)
	got, truncated := TruncateAuditBody(body, 65536)
	assert.True(t, truncated)
	assert.Len(t, got, 65536)
}
