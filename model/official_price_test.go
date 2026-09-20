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

	"github.com/glebarez/sqlite"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
)

func setupOfficialPriceTest(t *testing.T) {
	t.Helper()
	originalDB := DB
	t.Cleanup(func() { DB = originalDB })
	var err error
	DB, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	// Options carries the metadata mutation lock; the rest is what the pricing
	// refresh reads once the write commits.
	require.NoError(t, DB.AutoMigrate(&Model{}, &Option{}, &Channel{}, &Ability{}, &Vendor{}))
}

func TestApplyOfficialPricesCreatesAndUpdatesMetadataRows(t *testing.T) {
	setupOfficialPriceTest(t)

	written, err := ApplyOfficialPrices(map[string]OfficialPrice{
		"kimi-k3": {Input: 3, Output: 15},
		"glm-5.3": {Input: 1.4, Output: 4.4},
	})
	require.NoError(t, err)
	assert.Equal(t, 2, written)

	var created Model
	require.NoError(t, DB.Where("model_name = ?", "kimi-k3").First(&created).Error)
	assert.InDelta(t, 3, created.OfficialInputPrice, 1e-9)
	assert.InDelta(t, 15, created.OfficialOutputPrice, 1e-9)
	assert.Equal(t, 1, created.Status, "a model created by the fill must stay on the square")

	// Re-applying updates in place rather than adding a second row.
	written, err = ApplyOfficialPrices(map[string]OfficialPrice{
		"kimi-k3": {Input: 2.5, Output: 12},
	})
	require.NoError(t, err)
	assert.Equal(t, 1, written)

	var count int64
	require.NoError(t, DB.Model(&Model{}).Where("model_name = ?", "kimi-k3").Count(&count).Error)
	assert.EqualValues(t, 1, count)

	var updated Model
	require.NoError(t, DB.Where("model_name = ?", "kimi-k3").First(&updated).Error)
	assert.InDelta(t, 2.5, updated.OfficialInputPrice, 1e-9)
	assert.InDelta(t, 12, updated.OfficialOutputPrice, 1e-9)
	assert.Equal(t, created.Id, updated.Id)
}

func TestApplyOfficialPricesKeepsExistingMetadata(t *testing.T) {
	setupOfficialPriceTest(t)

	existing := Model{
		ModelName:   "claude-opus-5",
		Description: "kept description",
		Tags:        "kept-tag",
		Status:      1,
	}
	require.NoError(t, DB.Create(&existing).Error)

	_, err := ApplyOfficialPrices(map[string]OfficialPrice{
		"claude-opus-5": {Input: 5, Output: 25},
	})
	require.NoError(t, err)

	var stored Model
	require.NoError(t, DB.Where("model_name = ?", "claude-opus-5").First(&stored).Error)
	assert.Equal(t, "kept description", stored.Description)
	assert.Equal(t, "kept-tag", stored.Tags)
	assert.InDelta(t, 5, stored.OfficialInputPrice, 1e-9)
	assert.InDelta(t, 25, stored.OfficialOutputPrice, 1e-9)
}
