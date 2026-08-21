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

import { AppHeader } from '../app-header'

vi.mock('@tanstack/react-router', () => ({
  Link: (props: {
    'aria-label'?: string
    children: React.ReactNode
    className?: string
    to: string
  }) => (
    <a
      href={props.to}
      aria-label={props['aria-label']}
      className={props.className}
    >
      {props.children}
    </a>
  ),
}))

vi.mock('@/hooks/use-notifications', () => ({
  useNotifications: () => ({
    popoverOpen: false,
    setPopoverOpen: vi.fn(),
    unreadCount: 0,
    activeTab: 'notice',
    setActiveTab: vi.fn(),
    notice: '',
    announcements: [],
    loading: false,
  }),
}))

vi.mock('@/hooks/use-top-nav-links', () => ({
  useTopNavLinks: () => [],
}))

vi.mock('../header', () => ({
  Header: (props: { children: React.ReactNode }) => (
    <header>{props.children}</header>
  ),
}))

vi.mock('../system-brand', () => ({
  SystemBrand: () => <span>System brand</span>,
}))

describe('AppHeader brand', () => {
  test('shows only the system brand, with no operator brand beside it', () => {
    render(<AppHeader rightContent={<span>Right content</span>} />)

    expect(screen.getByText('System brand')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'iFAi · 皋如信息科技有限公司' })
    ).not.toBeInTheDocument()
  })
})
