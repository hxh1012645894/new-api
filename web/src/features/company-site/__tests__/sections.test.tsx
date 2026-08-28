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
import { describe, expect, test } from 'vitest'

import { CapabilityChain } from '../components/sections/capability-chain'
import { TokenToDeal } from '../components/sections/token-to-deal'
import { Warehouse } from '../components/sections/warehouse'

describe('company site sections', () => {
  test('capability section pairs concise copy with a three-layer visual', () => {
    render(<CapabilityChain />)

    expect(screen.getByText('01')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Tokens. Intelligence. Outcomes.',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Three layers. One business loop.')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Tokens. Intelligence. Outcomes.' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('token section pairs concise copy with a deal-flow visual', () => {
    render(<TokenToDeal />)

    expect(screen.getByText('02')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'From tokens to deals.' })
    ).toBeInTheDocument()
    expect(screen.getByText('See cost. Trace impact.')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'From tokens to deals.' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('warehouse section pairs concise copy with a four-tier visual', () => {
    render(<Warehouse />)

    expect(screen.getByText('03')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Data, ready for AI.' })
    ).toBeInTheDocument()
    expect(screen.getByText('ODS → DWD → DWS → ADS')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Data, ready for AI.' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
