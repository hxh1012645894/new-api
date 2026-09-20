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
package model

import (
	"testing"

	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/relaykit/dto"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func pricingByModelName(pricings []Pricing) map[string]Pricing {
	byModel := make(map[string]Pricing, len(pricings))
	for _, pricing := range pricings {
		byModel[pricing.ModelName] = pricing
	}
	return byModel
}

// The pricing square draws the published list price and the discount from
// these fields, so the catalog has to carry them and must not invent one for a
// model that has no metadata row.
func TestPricingCarriesOfficialListPrice(t *testing.T) {
	resetPricingEndpointTestTables(t)

	insertPricingEndpointChannel(t, 101, constant.ChannelTypeOpenAI, dto.ChannelOtherSettings{})
	insertPricingEndpointAbility(t, 101, "list-priced")
	insertPricingEndpointAbility(t, 101, "metadata-only")
	insertPricingEndpointAbility(t, 101, "no-metadata")

	require.NoError(t, DB.Create(&Model{
		ModelName:           "list-priced",
		Status:              1,
		OfficialInputPrice:  0.2,
		OfficialOutputPrice: 1.2,
	}).Error)
	require.NoError(t, DB.Create(&Model{
		ModelName: "metadata-only",
		Status:    1,
	}).Error)

	byModel := pricingByModelName(GetPricing())

	assert.InDelta(t, 0.2, byModel["list-priced"].OfficialInputPrice, 1e-9)
	assert.InDelta(t, 1.2, byModel["list-priced"].OfficialOutputPrice, 1e-9)
	assert.Zero(t, byModel["metadata-only"].OfficialInputPrice)
	assert.Zero(t, byModel["metadata-only"].OfficialOutputPrice)
	assert.Zero(t, byModel["no-metadata"].OfficialInputPrice)
	assert.Zero(t, byModel["no-metadata"].OfficialOutputPrice)
}
