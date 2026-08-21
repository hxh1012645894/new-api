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
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { PublicHeader } from '../public-header'

vi.mock('@tanstack/react-router', () => ({
  Link: (props: {
    children: React.ReactNode
    className?: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    tabIndex?: number
    to: string
  }) => (
    <a
      href={props.to}
      className={props.className}
      onClick={props.onClick}
      tabIndex={props.tabIndex}
    >
      {props.children}
    </a>
  ),
  useNavigate: () => vi.fn(),
  useRouterState: () => ({ location: { pathname: '/' } }),
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

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({
    systemName: 'New API',
    logo: '/logo.png',
    loading: false,
    logoLoaded: true,
  }),
}))

vi.mock('@/hooks/use-top-nav-links', () => ({
  useTopNavLinks: () => [],
}))

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: () => ({ auth: { user: null } }),
}))

describe('PublicHeader mobile navigation', () => {
  test('exposes expanded state and makes the closed overlay inert', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <PublicHeader
        navLinks={[
          { title: 'Home', href: '/' },
          { title: 'Console', href: '/dashboard' },
        ]}
        showAuthButtons={false}
        showLanguageSwitcher={false}
        showNotifications={false}
        showThemeSwitch={false}
      />
    )

    const toggle = screen.getByRole('button', {
      name: 'Toggle navigation menu',
    })
    const overlay = container.querySelector('#public-mobile-navigation')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'public-mobile-navigation')
    expect(overlay).toHaveAttribute('aria-hidden', 'true')
    expect(overlay).toHaveAttribute('inert')

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(overlay).toHaveAttribute('aria-hidden', 'false')
    expect(overlay).not.toHaveAttribute('inert')
    const mobileNavigation = within(overlay as HTMLElement)
    const homeLink = mobileNavigation.getByRole('link', { name: 'Home' })
    const consoleLink = mobileNavigation.getByRole('link', { name: 'Console' })

    expect(homeLink).toHaveFocus()

    await user.tab({ shift: true })
    expect(consoleLink).toHaveFocus()

    await user.tab()
    expect(homeLink).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(overlay).toHaveAttribute('inert')
    expect(toggle).toHaveFocus()
  })
})
