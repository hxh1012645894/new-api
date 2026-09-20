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
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'

import { applyOfficialPrices, previewOfficialPrices } from '../../api'
import type { OfficialPriceCandidate } from '../../types'
import { OfficialPriceFillDialog } from '../official-price-fill-dialog'

vi.mock('../../api', () => ({
  previewOfficialPrices: vi.fn(),
  applyOfficialPrices: vi.fn(),
}))

const preview = vi.mocked(previewOfficialPrices)
const apply = vi.mocked(applyOfficialPrices)

function candidate(
  overrides: Partial<OfficialPriceCandidate>
): OfficialPriceCandidate {
  return {
    model_name: 'example-model',
    preset_input: 3,
    preset_output: 15,
    configured_input: 0,
    configured_output: 0,
    ...overrides,
  }
}

function respondPreview(
  candidates: OfficialPriceCandidate[],
  unavailable: string[] = []
) {
  preview.mockResolvedValue({
    success: true,
    message: '',
    data: { candidates, unavailable },
  })
}

async function open() {
  render(<OfficialPriceFillDialog open onOpenChange={() => {}} />)
  await screen.findByRole('table')
}

afterEach(() => {
  vi.clearAllMocks()
})

test('pre-selects the models still missing a published price', async () => {
  respondPreview([
    candidate({ model_name: 'untouched' }),
    candidate({
      model_name: 'already-current',
      configured_input: 3,
      configured_output: 15,
    }),
  ])
  await open()

  expect(screen.getByLabelText('Select untouched')).toBeChecked()
  const alreadyCurrent = screen.getByLabelText('Select already-current')
  expect(alreadyCurrent).not.toBeChecked()
  expect(alreadyCurrent).toHaveAttribute('aria-disabled', 'true')
  expect(screen.getByText('Already current')).toBeVisible()
})

test('sends only the selected models', async () => {
  respondPreview([
    candidate({ model_name: 'first' }),
    candidate({ model_name: 'second' }),
  ])
  apply.mockResolvedValue({ success: true, message: '', data: { updated: 1 } })
  await open()

  await userEvent.click(screen.getByLabelText('Select second'))
  await userEvent.click(screen.getByRole('button', { name: 'Fill 1 models' }))

  await waitFor(() => expect(apply).toHaveBeenCalledWith(['first']))
})

test('lists the models the preset cannot price', async () => {
  respondPreview(
    [candidate({ model_name: 'matched' })],
    ['deepseek-v4.1-flash', 'no-preset-entry']
  )
  await open()

  expect(screen.getByText('deepseek-v4.1-flash, no-preset-entry')).toBeVisible()
})

test('reports when the preset matches nothing', async () => {
  respondPreview([], ['only-model'])
  render(<OfficialPriceFillDialog open onOpenChange={() => {}} />)

  expect(
    await screen.findByText(
      'The preset carries no rate for any model this instance serves.'
    )
  ).toBeVisible()
})
