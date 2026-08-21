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
import { describe, expect, test, vi } from 'vitest'

import { Footer } from '../footer'

vi.mock('@tanstack/react-router', () => ({
  Link: (props: { children: React.ReactNode; to: string }) => (
    <a href={props.to}>{props.children}</a>
  ),
}))

vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({ status: {} }),
}))

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({
    systemName: 'New API',
    logo: '/logo.png',
    footerHtml: '<p>Custom deployment footer</p>',
    demoSiteEnabled: false,
  }),
}))

describe('Footer', () => {
  test('keeps an explicitly supplied company brand when custom footer HTML is configured', () => {
    render(<Footer logo='/ifai-logo.png' name='iFAi' />)

    const companyLogo = screen.getByRole('img', { name: 'iFAi' })
    expect(companyLogo).toHaveAttribute('src', '/ifai-logo.png')
    expect(companyLogo).toHaveClass('rounded-full')
    expect(screen.getByText('Custom deployment footer')).toBeInTheDocument()
  })
})
