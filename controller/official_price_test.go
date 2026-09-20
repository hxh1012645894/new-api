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
	"testing"

	"github.com/stretchr/testify/assert"
)

// The preset publishes expressions rather than plain rates, so the apply path
// reads the rate back out of the expression. These are the shapes the preset
// actually uses.
func TestOfficialRatesFromExpr(t *testing.T) {
	cases := []struct {
		name   string
		expr   string
		input  float64
		output float64
	}{
		{
			name:   "base lanes",
			expr:   `tier("standard", p * 2.46575 + cr * 0.246575 + c * 12.3288)`,
			input:  2.46575,
			output: 12.3288,
		},
		{
			name:   "image lanes do not leak into the token lanes",
			expr:   `tier("standard", p * 5 + cr * 1.25 + img * 8 + img_cr * 2 + c * 30)`,
			input:  5,
			output: 30,
		},
		{
			name:   "length tier reports its short-context rate",
			expr:   `len <= 272000 ? tier("standard", p * 10 + c * 50) : tier("long", p * 20 + c * 75)`,
			input:  10,
			output: 50,
		},
		{name: "empty expression", expr: "", input: 0, output: 0},
		{name: "whitespace only", expr: "   ", input: 0, output: 0},
		{name: "unparseable expression", expr: "not an expression at all", input: 0, output: 0},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			input, output := officialRatesFromExpr(tc.expr)

			assert.InDelta(t, tc.input, input, 1e-9)
			assert.InDelta(t, tc.output, output, 1e-9)
		})
	}
}

// A period-priced expression reports whichever window is current, so only the
// pair of valid rates can be asserted.
func TestOfficialRatesFromExprReportsTheCurrentPeriod(t *testing.T) {
	input, output := officialRatesFromExpr(
		`hour("Asia/Shanghai") >= 9 ? tier("peak", p * 0.232877 + c * 0.931507) : tier("off_peak", p * 0.116438 + c * 0.465753)`,
	)

	peak := input == 0.232877 && output == 0.931507
	offPeak := input == 0.116438 && output == 0.465753
	assert.Truef(t, peak || offPeak, "unexpected period rates: input=%v output=%v", input, output)
}
