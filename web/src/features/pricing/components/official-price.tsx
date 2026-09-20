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

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import type { OfficialPrice } from '../lib/price'

/**
 * The published list price a discounted price is measured against, struck
 * through and de-emphasised so the charged price next to it stays the one the
 * eye lands on.
 */
export function OfficialPriceStrike(props: {
  official: OfficialPrice
  className?: string
}) {
  return (
    <span
      className={cn(
        'text-muted-foreground/70 font-mono text-xs line-through tabular-nums',
        props.className
      )}
      title={props.official.formatted}
    >
      {props.official.formatted}
    </span>
  )
}

/**
 * The discount a model carries against its published list price.
 *
 * The lanes normally move together, so one badge is honest; when input and
 * output diverge, the badge reports the range rather than picking one lane and
 * overstating the other.
 */
export function DiscountBadge(props: {
  official: Array<OfficialPrice | null>
  className?: string
}) {
  const { t } = useTranslation()
  const discounts = props.official
    .filter((entry): entry is OfficialPrice => entry !== null)
    .map((entry) => entry.discount)
  if (discounts.length === 0) return null

  const lowest = Math.round(Math.min(...discounts) * 100)
  const highest = Math.round(Math.max(...discounts) * 100)
  const label =
    lowest === highest
      ? t('{{percent}}% off', { percent: highest })
      : t('{{low}}–{{high}}% off', { low: lowest, high: highest })

  return (
    <Badge
      variant='secondary'
      className={cn(
        'border-success/30 bg-success/10 text-success h-5 rounded-full border px-2 font-sans text-[11px] font-semibold',
        props.className
      )}
    >
      {label}
    </Badge>
  )
}
