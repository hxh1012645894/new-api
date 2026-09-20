package service

import (
	"bytes"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting/system_setting"
)

const (
	feishuTokenURL       = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
	feishuBitableURLTmpl = "https://open.feishu.cn/open-apis/bitable/v1/apps/%s/tables/%s/records"
	feishuTokenLifetime  = 45 * time.Minute
)

type feishuTokenCache struct {
	mu        sync.Mutex
	token     string
	expiresAt time.Time
}

var feishuToken = &feishuTokenCache{}

// getFeishuTenantAccessToken returns a cached tenant_access_token, refreshing
// it shortly before expiry so concurrent pushes do not stampede the auth API.
func getFeishuTenantAccessToken(appId string, appSecret string) (string, error) {
	feishuToken.mu.Lock()
	defer feishuToken.mu.Unlock()
	if feishuToken.token != "" && time.Now().Before(feishuToken.expiresAt) {
		return feishuToken.token, nil
	}

	payload, err := common.Marshal(map[string]string{
		"app_id":     appId,
		"app_secret": appSecret,
	})
	if err != nil {
		return "", err
	}
	resp, err := GetHttpClient().Post(feishuTokenURL, "application/json", bytes.NewReader(payload))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	var result struct {
		Code              int    `json:"code"`
		Msg               string `json:"msg"`
		TenantAccessToken string `json:"tenant_access_token"`
		Expire            int    `json:"expire"`
	}
	if err = common.DecodeJson(resp.Body, &result); err != nil {
		return "", fmt.Errorf("failed to decode feishu token response: %w", err)
	}
	if result.Code != 0 || result.TenantAccessToken == "" {
		return "", fmt.Errorf("feishu token api error: code=%d msg=%s", result.Code, result.Msg)
	}
	feishuToken.token = result.TenantAccessToken
	lifetime := feishuTokenLifetime
	if result.Expire > 0 {
		if seconds := result.Expire - 60; seconds > 0 {
			if refreshed := time.Duration(seconds) * time.Second; refreshed < lifetime {
				lifetime = refreshed
			}
		}
	}
	feishuToken.expiresAt = time.Now().Add(lifetime)
	return feishuToken.token, nil
}

// PushFdeAppointmentToFeishu writes an FDE appointment into the configured
// Feishu Bitable. It is a no-op when the integration is disabled or incomplete.
func PushFdeAppointmentToFeishu(appointment *model.FdeAppointment) error {
	settings := system_setting.GetFeishuSettings()
	if !settings.Enabled {
		return nil
	}
	if settings.AppId == "" || settings.AppSecret == "" || settings.AppToken == "" || settings.TableId == "" {
		return fmt.Errorf("feishu bitable settings are incomplete")
	}

	token, err := getFeishuTenantAccessToken(settings.AppId, settings.AppSecret)
	if err != nil {
		return err
	}

	payload, err := common.Marshal(map[string]any{
		"fields": map[string]any{
			"姓名":   appointment.Name,
			"公司":   appointment.Company,
			"职务":   appointment.Title,
			"联系方式": appointment.Contact,
			"业务场景": appointment.Scenario,
			"合作诉求": appointment.CooperationRequest,
			"提交时间": time.Unix(appointment.CreatedTime, 0).Format("2006-01-02 15:04:05"),
		},
	})
	if err != nil {
		return err
	}

	url := fmt.Sprintf(feishuBitableURLTmpl, settings.AppToken, settings.TableId)
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(payload))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	req.Header.Set("Authorization", "Bearer "+strings.TrimSpace(token))
	resp, err := GetHttpClient().Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	var result struct {
		Code int    `json:"code"`
		Msg  string `json:"msg"`
	}
	if err = common.DecodeJson(resp.Body, &result); err != nil {
		return fmt.Errorf("failed to decode feishu bitable response: %w", err)
	}
	if result.Code != 0 {
		return fmt.Errorf("feishu bitable api error: code=%d msg=%s", result.Code, result.Msg)
	}
	return nil
}

// SyncFdeAppointmentToFeishu pushes the appointment and records the sync flag
// on success. Called from a goroutine after creation; failures are logged only.
func SyncFdeAppointmentToFeishu(appointment *model.FdeAppointment) {
	settings := system_setting.GetFeishuSettings()
	if !settings.Enabled {
		return
	}
	if err := PushFdeAppointmentToFeishu(appointment); err != nil {
		common.SysError(fmt.Sprintf("failed to push FDE appointment %d to feishu: %s", appointment.Id, err.Error()))
		return
	}
	if err := model.MarkFdeAppointmentFeishuSynced(appointment.Id); err != nil {
		common.SysError(fmt.Sprintf("failed to mark FDE appointment %d feishu_synced: %s", appointment.Id, err.Error()))
	}
}
