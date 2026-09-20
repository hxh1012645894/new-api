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
	"errors"

	"github.com/QuantumNous/new-api/common"

	"gorm.io/gorm"
)

// OfficialPrice is a model's published list price for one lane, in USD per
// million tokens.
type OfficialPrice struct {
	Input  float64
	Output float64
}

// ApplyOfficialPrices stores published list prices, creating the metadata row
// for models that do not have one yet.
//
// These prices never take part in billing: the charge still comes from the
// model's ratio or billing expression, and this only gives the pricing square
// something to strike through. Returns the number of models written.
func ApplyOfficialPrices(prices map[string]OfficialPrice) (int, error) {
	if len(prices) == 0 {
		return 0, nil
	}

	written := 0
	err := metadataTransaction(func(tx *gorm.DB) error {
		written = 0
		for name, price := range prices {
			var existing Model
			err := tx.Where("model_name = ?", name).First(&existing).Error
			switch {
			case errors.Is(err, gorm.ErrRecordNotFound):
				now := common.GetTimestamp()
				if err := tx.Create(&Model{
					ModelName:           name,
					Status:              1,
					SyncOfficial:        1,
					OfficialInputPrice:  price.Input,
					OfficialOutputPrice: price.Output,
					CreatedTime:         now,
					UpdatedTime:         now,
				}).Error; err != nil {
					return err
				}
			case err != nil:
				return err
			default:
				if err := tx.Model(&Model{}).Where("id = ?", existing.Id).
					Updates(map[string]any{
						"official_input_price":  price.Input,
						"official_output_price": price.Output,
						"updated_time":          common.GetTimestamp(),
					}).Error; err != nil {
					return err
				}
			}
			written++
		}
		return nil
	})
	if err != nil {
		return 0, err
	}

	RefreshPricing()
	return written, nil
}
