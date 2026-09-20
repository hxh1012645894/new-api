package system_setting

import "github.com/QuantumNous/new-api/setting/config"

// FeishuSettings holds credentials for pushing records to a Feishu (Lark)
// Bitable (多维表格). The Bitable table is expected to contain text fields
// named 姓名 / 公司 / 职务 / 联系方式 / 业务场景 / 合作诉求 plus a datetime
// or text field 提交时间.
type FeishuSettings struct {
	Enabled   bool   `json:"enabled"`
	AppId     string `json:"app_id"`
	AppSecret string `json:"app_secret"`
	AppToken  string `json:"app_token"`
	TableId   string `json:"table_id"`
}

var defaultFeishuSettings = FeishuSettings{
	Enabled:   false,
	AppId:     "",
	AppSecret: "",
	AppToken:  "",
	TableId:   "",
}

func init() {
	config.GlobalConfig.Register("feishu_setting", &defaultFeishuSettings)
}

func GetFeishuSettings() *FeishuSettings {
	return &defaultFeishuSettings
}
