/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
package controller

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/pkg/billingexpr"

	"github.com/gin-gonic/gin"
)

// The published-rate preset new-api ships, shared with the upstream price sync.
// It mirrors OFFICIAL_CHANNEL_ENDPOINT in the frontend settings constants.
const officialPricePresetURL = "https://basellm.github.io/llm-metadata/api/newapi/ratio_config-v1-base.json"

const officialPricePresetTimeout = 30 * time.Second

// OfficialPriceCandidate is one of our models next to the rate the preset
// publishes for it.
type OfficialPriceCandidate struct {
	ModelName        string  `json:"model_name"`
	PresetInput      float64 `json:"preset_input"`
	PresetOutput     float64 `json:"preset_output"`
	ConfiguredInput  float64 `json:"configured_input"`
	ConfiguredOutput float64 `json:"configured_output"`
}

// OfficialPricePreview separates the models the preset covers from the ones it
// does not, so the administrator knows what still needs entering by hand.
type OfficialPricePreview struct {
	Candidates  []OfficialPriceCandidate `json:"candidates"`
	Unavailable []string                 `json:"unavailable"`
}

func fetchOfficialPricePreset(ctx context.Context) (map[string]string, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, officialPricePresetURL, nil)
	if err != nil {
		return nil, err
	}
	resp, err := (&http.Client{Timeout: officialPricePresetTimeout}).Do(req)
	if err != nil {
		return nil, err
	}
	defer func() { _ = resp.Body.Close() }()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("preset returned HTTP %d", resp.StatusCode)
	}

	var payload struct {
		Data struct {
			BillingExpr map[string]string `json:"billing_expr"`
		} `json:"data"`
	}
	if err := common.DecodeJson(resp.Body, &payload); err != nil {
		return nil, err
	}
	return payload.Data.BillingExpr, nil
}

// The preset publishes a billing expression whose coefficients are the vendor's
// $/1M token rates. Evaluating it with a single unit of one lane and nothing
// else isolates that lane's coefficient, which holds for any expression shape —
// tiers, time windows and request rules included. A failed evaluation reads as
// "no published price" rather than a plausible-looking number.
func officialRatesFromExpr(expr string) (float64, float64) {
	if strings.TrimSpace(expr) == "" {
		return 0, 0
	}
	input, _, err := billingexpr.RunExpr(expr, billingexpr.TokenParams{P: 1, Len: 1})
	if err != nil {
		return 0, 0
	}
	output, _, err := billingexpr.RunExpr(expr, billingexpr.TokenParams{C: 1, Len: 1})
	if err != nil {
		return 0, 0
	}
	if input < 0 {
		input = 0
	}
	if output < 0 {
		output = 0
	}
	return input, output
}

// PreviewOfficialPrices lists what the published-rate preset would fill in for
// the models this instance serves.
func PreviewOfficialPrices(c *gin.Context) {
	expressions, err := fetchOfficialPricePreset(c.Request.Context())
	if err != nil {
		common.ApiErrorMsg(c, "无法获取官方价格预设："+err.Error())
		return
	}

	preview := OfficialPricePreview{
		Candidates:  make([]OfficialPriceCandidate, 0),
		Unavailable: make([]string, 0),
	}
	for _, pricing := range model.GetPricing() {
		expression, ok := expressions[pricing.ModelName]
		if !ok {
			preview.Unavailable = append(preview.Unavailable, pricing.ModelName)
			continue
		}
		input, output := officialRatesFromExpr(expression)
		if input <= 0 && output <= 0 {
			preview.Unavailable = append(preview.Unavailable, pricing.ModelName)
			continue
		}
		preview.Candidates = append(preview.Candidates, OfficialPriceCandidate{
			ModelName:        pricing.ModelName,
			PresetInput:      input,
			PresetOutput:     output,
			ConfiguredInput:  pricing.OfficialInputPrice,
			ConfiguredOutput: pricing.OfficialOutputPrice,
		})
	}

	common.ApiSuccess(c, preview)
}

// ApplyOfficialPrices writes the published list prices for the selected models.
// The rates are read from the preset again rather than taken from the request,
// so a client cannot decide what the square advertises.
func ApplyOfficialPrices(c *gin.Context) {
	var req struct {
		Models []string `json:"models"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || len(req.Models) == 0 {
		common.ApiErrorMsg(c, "请选择要填充的模型")
		return
	}

	expressions, err := fetchOfficialPricePreset(c.Request.Context())
	if err != nil {
		common.ApiErrorMsg(c, "无法获取官方价格预设："+err.Error())
		return
	}

	prices := make(map[string]model.OfficialPrice, len(req.Models))
	for _, name := range req.Models {
		expression, ok := expressions[name]
		if !ok {
			continue
		}
		input, output := officialRatesFromExpr(expression)
		if input <= 0 && output <= 0 {
			continue
		}
		prices[name] = model.OfficialPrice{Input: input, Output: output}
	}
	if len(prices) == 0 {
		common.ApiErrorMsg(c, "所选模型都没有可用的官方价格")
		return
	}

	written, err := model.ApplyOfficialPrices(prices)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, gin.H{"updated": written})
}
