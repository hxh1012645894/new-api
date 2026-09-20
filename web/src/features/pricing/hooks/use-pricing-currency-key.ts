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
import { useTranslation } from 'react-i18next'

import { useSystemConfigStore } from '@/stores/system-config-store'

/**
 * Identity of the currency the pricing square is quoting in right now.
 *
 * `formatPricingCurrencyFromUSD` resolves its currency from the site config
 * *and* the interface language, and it runs inside `useMemo` blocks that cache
 * the formatted strings. Those memos have to rebuild when either input moves,
 * so they list this key instead of the raw currency config — which keeps the
 * language half from being forgotten, since a language change re-renders the
 * component but does not touch the config.
 */
export function usePricingCurrencyKey(): string {
  const { i18n } = useTranslation()
  const currency = useSystemConfigStore((state) => state.config.currency)

  return [
    i18n.resolvedLanguage ?? i18n.language,
    currency.quotaDisplayType,
    currency.usdExchangeRate,
    currency.customCurrencySymbol,
    currency.customCurrencyExchangeRate,
    currency.quotaPerUnit,
  ].join('|')
}
