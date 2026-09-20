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
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import {
  DEFAULT_CURRENCY_CONFIG,
  useSystemConfigStore,
} from '@/stores/system-config-store'

import { ModelPriceCell } from '../components/model-price-cell'
import {
  DiscountBadge,
  OfficialPriceStrike,
} from '../components/official-price'
import { officialPriceFor, type OfficialPrice } from '../lib/price'
import type { PricingModel } from '../types'

function pricingModel(overrides: Partial<PricingModel> = {}): PricingModel {
  return {
    id: 1,
    model_name: 'test-model',
    quota_type: 0,
    model_ratio: 0.04,
    completion_ratio: 2,
    enable_groups: ['default'],
    ...overrides,
  }
}

describe('published list price', () => {
  test('reports the discount when the charge sits below the published price', () => {
    // 0.04 ratio → $0.08 / 1M against a published $0.20 / 1M.
    const official = officialPriceFor(
      pricingModel({ official_input_price: 0.2 }),
      'input',
      'M'
    )

    expect(official?.discount).toBeCloseTo(0.6, 10)
    expect(official?.formatted).not.toBe('')
  })

  test('reads the lane the caller asked for', () => {
    const model = pricingModel({
      official_input_price: 0.2,
      official_output_price: 1.6,
    })

    // output = 0.04 * 2 * completion 2 = $0.16 against a published $1.60.
    expect(officialPriceFor(model, 'output', 'M')?.discount).toBeCloseTo(
      0.9,
      10
    )
    expect(officialPriceFor(model, 'input', 'M')?.discount).toBeCloseTo(0.6, 10)
  })

  test('reports nothing when the lane publishes no price', () => {
    const model = pricingModel({ official_output_price: 1.6 })

    expect(officialPriceFor(model, 'input', 'M')).toBeNull()
  })

  test('reports nothing when the charge is not below the published price', () => {
    const model = pricingModel({ model_ratio: 0.2, official_input_price: 0.2 })

    expect(officialPriceFor(model, 'input', 'M')).toBeNull()
  })

  test('reports nothing for expression-priced models', () => {
    // The ratio table is not what these models charge, so any discount derived
    // from it would be fiction.
    const model = pricingModel({
      billing_mode: 'tiered_expr',
      official_input_price: 0.2,
    })

    expect(officialPriceFor(model, 'input', 'M')).toBeNull()
  })

  test('reports nothing for per-request priced models', () => {
    const model = pricingModel({
      quota_type: 1,
      official_input_price: 0.2,
    })

    expect(officialPriceFor(model, 'input', 'M')).toBeNull()
  })

  test('keeps the percentage when the recharge rate rescales both prices', () => {
    const model = pricingModel({ official_input_price: 0.2 })

    const plain = officialPriceFor(model, 'input', 'M')
    const recharged = officialPriceFor(model, 'input', 'M', true, 4, 6)

    expect(recharged?.discount).toBeCloseTo(plain?.discount ?? 0, 10)
  })

  test('scales the published price with the token unit', () => {
    const model = pricingModel({ official_input_price: 200 })

    // A per-1K quote is a thousandth of the per-1M one, on both sides.
    expect(officialPriceFor(model, 'input', 'M')?.discount).toBeCloseTo(
      officialPriceFor(model, 'input', 'K')?.discount ?? 0,
      10
    )
  })
})

function officialQuote(discount: number): OfficialPrice {
  return { formatted: '$1', discount }
}

describe('published list price display', () => {
  test('reports one percentage when both lanes agree', () => {
    render(
      <DiscountBadge official={[officialQuote(0.6), officialQuote(0.6)]} />
    )

    expect(screen.getByText('60% off')).toBeVisible()
  })

  test('reports the range when the lanes diverge', () => {
    render(
      <DiscountBadge official={[officialQuote(0.6), officialQuote(0.25)]} />
    )

    expect(screen.getByText('25–60% off')).toBeVisible()
  })

  test('renders nothing without a published price', () => {
    const { container } = render(<DiscountBadge official={[null, null]} />)

    expect(container).toBeEmptyDOMElement()
  })

  test('strikes the list price through', () => {
    render(<OfficialPriceStrike official={officialQuote(0.6)} />)

    expect(screen.getByText('$1')).toHaveClass('line-through')
  })
})

describe('pricing square cell', () => {
  beforeEach(() => {
    useSystemConfigStore.getState().setConfig({
      currency: { ...DEFAULT_CURRENCY_CONFIG, quotaDisplayType: 'USD' },
    })
  })

  afterEach(() => {
    useSystemConfigStore.getState().setConfig({
      currency: { ...DEFAULT_CURRENCY_CONFIG },
    })
  })

  test('strikes both lanes and advertises the discount', () => {
    render(
      <ModelPriceCell
        model={pricingModel({
          official_input_price: 0.2,
          official_output_price: 0.4,
        })}
      />
    )

    // Charges are $0.08 and $0.16 per 1M against published $0.20 and $0.40.
    expect(screen.getByText('0.2')).toHaveClass('line-through')
    expect(screen.getByText('0.4')).toHaveClass('line-through')
    expect(screen.getByText('60% off')).toBeVisible()
    expect(screen.getByText('USD / 1M tokens')).toBeVisible()
  })

  test('keeps the plain price when nothing is published', () => {
    render(<ModelPriceCell model={pricingModel()} />)

    expect(screen.queryByText(/% off$/)).not.toBeInTheDocument()
  })
})

describe('expression-priced square cell', () => {
  beforeEach(() => {
    useSystemConfigStore.getState().setConfig({
      currency: { ...DEFAULT_CURRENCY_CONFIG, quotaDisplayType: 'USD' },
    })
  })

  afterEach(() => {
    useSystemConfigStore.getState().setConfig({
      currency: { ...DEFAULT_CURRENCY_CONFIG },
    })
  })

  // Expression prices come from the parsed tier coefficients, not the ratio
  // table, so this is the path every model in the catalog actually takes.
  function expressionModel(overrides: Partial<PricingModel> = {}) {
    return pricingModel({
      billing_mode: 'tiered_expr',
      billing_expr: 'tier("standard", p * 0.2 + c * 0.8)',
      official_input_price: 0.5,
      official_output_price: 2,
      ...overrides,
    })
  }

  test('measures the discount against the parsed expression prices', () => {
    render(<ModelPriceCell model={expressionModel()} />)

    // Charges are $0.20 and $0.80 per 1M against published $0.50 and $2.00.
    expect(screen.getByText('0.5')).toHaveClass('line-through')
    expect(screen.getByText('2')).toHaveClass('line-through')
    expect(screen.getByText('60% off')).toBeVisible()
  })

  test('shows no discount when the model publishes no list price', () => {
    render(
      <ModelPriceCell
        model={expressionModel({
          official_input_price: undefined,
          official_output_price: undefined,
        })}
      />
    )

    expect(screen.queryByText(/% off$/)).not.toBeInTheDocument()
  })
})
