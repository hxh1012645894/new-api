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
import { Pain } from '../components/sections/pain'
import { Warehouse } from '../components/sections/warehouse'

describe('company site sections', () => {
  test('pain section shows the consolidated bill that cannot be explained per call', () => {
    render(<Pain />)
    expect(
      screen.getByText(
        'One consolidated bill cannot answer a single specific call.'
      )
    ).toBeInTheDocument()
    expect(screen.getAllByText('Not explainable per call')).toHaveLength(3)
  })

  test('capability chain renders the three layers with the EB badge highlighted', () => {
    render(<CapabilityChain />)
    expect(
      screen.getByText('From one integration to an explainable business chain.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Token Access & Cost Optimization')
    ).toBeInTheDocument()
    expect(screen.getByText('Enterprise Brain')).toBeInTheDocument()
    expect(screen.getByText('EB')).toBeInTheDocument()
    expect(
      screen.getByText('FDE — Forward Deployed Engineers')
    ).toBeInTheDocument()
    expect(screen.getByText('Model routing')).toBeInTheDocument()
    expect(screen.getByText('Workflow reinvention')).toBeInTheDocument()
    expect(
      screen.getByText('Unified access to mainstream models')
    ).toBeInTheDocument()
    expect(screen.getByText('Claude')).toBeInTheDocument()
    expect(screen.getByText('Seedance')).toBeInTheDocument()
  })

  test('warehouse section maps the three pain points to a layered warehouse', () => {
    render(<Warehouse />)
    expect(screen.getByText('System silos')).toBeInTheDocument()
    expect(screen.getByText('Broken links')).toBeInTheDocument()
    expect(screen.getByText('Manual development')).toBeInTheDocument()

    expect(screen.getByText('Layered warehouse')).toBeInTheDocument()
    expect(screen.getByText('ODS')).toBeInTheDocument()
    expect(screen.getByText('DWD')).toBeInTheDocument()
    expect(screen.getByText('DWS')).toBeInTheDocument()
    expect(screen.getByText('ADS')).toBeInTheDocument()
  })
})
