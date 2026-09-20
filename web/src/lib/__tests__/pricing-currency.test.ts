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
import i18next from 'i18next'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import {
  formatBillingCurrencyFromUSD,
  formatPricingCurrencyFromUSD,
  getPricingCurrencyLabel,
} from '@/lib/currency'
import { useSystemConfigStore } from '@/stores/system-config-store'

let originalLanguage: string

beforeEach(async () => {
  originalLanguage = i18next.language
  useSystemConfigStore.setState((state) => ({
    config: {
      ...state.config,
      currency: {
        ...state.config.currency,
        quotaDisplayType: 'CNY',
        usdExchangeRate: 7.3,
      },
    },
  }))
})

afterEach(async () => {
  useSystemConfigStore.setState(useSystemConfigStore.getInitialState(), true)
  await i18next.changeLanguage(originalLanguage)
})

describe('pricing square currency', () => {
  test('quotes USD to English readers even when the site bills in CNY', async () => {
    await i18next.changeLanguage('en')

    expect(formatPricingCurrencyFromUSD(1)).toBe('$1')
    expect(getPricingCurrencyLabel()).toBe('USD')
  })

  test('keeps the site currency for other languages', async () => {
    await i18next.changeLanguage('zhCN')

    expect(formatPricingCurrencyFromUSD(1)).toBe('¥7.3')
    expect(getPricingCurrencyLabel()).toBe('CNY')
  })

  test('leaves balances and usage logs on the site currency', async () => {
    await i18next.changeLanguage('en')

    // The negative half of the contract: only the model square switches, so a
    // charge reported elsewhere still matches what was actually billed.
    expect(formatBillingCurrencyFromUSD(1)).toBe('¥7.3')
  })
})
