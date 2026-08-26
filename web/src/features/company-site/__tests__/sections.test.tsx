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
  test('capability chain renders the 3-tier business pyramid architecture diagram', () => {
    render(<CapabilityChain />)
    expect(
      screen.getByText('Three businesses, one path from tokens to outcomes.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Three-tier Precision Stack Architecture')
    ).toBeInTheDocument()
    expect(
      screen.getAllByText('Token Supply & Cost Optimization')[0]
    ).toBeInTheDocument()
    expect(screen.getAllByText('Enterprise Brain')[0]).toBeInTheDocument()
    expect(
      screen.getAllByText('FDE — Forward Deployed Engineers')[0]
    ).toBeInTheDocument()
    expect(screen.getAllByText('Base Tier')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Middle Tier')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Top Tier')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Unified Model Gateway')[0]).toBeInTheDocument()
    expect(
      screen.getAllByText('Business Logic Understanding')[0]
    ).toBeInTheDocument()
    expect(screen.getAllByText('On-site Deployment')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Module Breakdown')[0]).toBeInTheDocument()
    expect(
      screen.getAllByText('Value & Capability Flow')[0]
    ).toBeInTheDocument()
  })

  test('token to deal section renders streamlined decision pipeline', () => {
    render(<TokenToDeal />)
    expect(
      screen.getByText('Paving every token call toward the next closed deal.')
    ).toBeInTheDocument()
    expect(screen.getByText('Commercial Deal')).toBeInTheDocument()
    expect(
      screen.getByText('Closed Loop: Next Commercial Deal')
    ).toBeInTheDocument()
    expect(screen.getByText('Flow Deviation Analysis')).toBeInTheDocument()
    expect(screen.getByText('Cost Budget Alert')).toBeInTheDocument()
    expect(screen.getByText('Milestone Progress')).toBeInTheDocument()
    expect(screen.getByText('Competitor Impact')).toBeInTheDocument()
  })

  test('warehouse section renders clean four-tier architecture stack', () => {
    render(<Warehouse />)
    expect(
      screen.getByText('Your company data, ready for AI decisions.')
    ).toBeInTheDocument()
    expect(screen.getAllByText('ODS')[0]).toBeInTheDocument()
    expect(screen.getAllByText('DWD')[0]).toBeInTheDocument()
    expect(screen.getAllByText('DWS')[0]).toBeInTheDocument()
    expect(screen.getAllByText('ADS')[0]).toBeInTheDocument()
    expect(screen.getByText('Operational Data Store')).toBeInTheDocument()
    expect(screen.getByText('Data Warehouse Detail')).toBeInTheDocument()
    expect(screen.getByText('Data Warehouse Service')).toBeInTheDocument()
    expect(screen.getByText('Application Data Service')).toBeInTheDocument()
  })
})
