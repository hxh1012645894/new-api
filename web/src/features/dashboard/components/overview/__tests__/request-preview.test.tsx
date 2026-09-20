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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import { useSystemConfigStore } from '@/stores/system-config-store'

import { OverviewDashboard } from '../overview-dashboard'

let client: QueryClient
let apiInfo: Array<{ url: string }> | null

const originalGetAnimations = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'getAnimations'
)

beforeEach(() => {
  window.localStorage.clear()
  // jsdom lacks Element.getAnimations, which Base UI scroll areas call.
  Object.defineProperty(HTMLElement.prototype, 'getAnimations', {
    configurable: true,
    value: () => [],
  })
  useSystemConfigStore.setState(useSystemConfigStore.getInitialState(), true)
  useAuthStore.getState().auth.setUser({
    id: 1,
    username: 'dashboard-user',
    role: 1,
    quota: 1000000,
  })
  client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  apiInfo = null
  vi.spyOn(api, 'get').mockImplementation(async (url) => {
    switch (url) {
      case '/api/token/?p=1&size=10':
        return {
          data: {
            success: true,
            data: {
              items: [{ id: 1, name: 'App key', key: 'masked', status: 1 }],
            },
          },
        }
      case '/api/status':
        return {
          data: {
            data: {
              api_info_enabled: apiInfo !== null,
              api_info: apiInfo ?? [],
              announcements_enabled: false,
              faq_enabled: false,
              uptime_kuma_enabled: false,
            },
          },
        }
      case '/api/user/models':
        return { data: { success: true, data: ['claude-sonnet-5'] } }
      case '/api/data/self':
        return { data: { success: true, data: [] } }
      default:
        throw new Error(`Unexpected dashboard request: ${url}`)
    }
  })
})

afterEach(() => {
  cleanup()
  client.clear()
  if (originalGetAnimations) {
    Object.defineProperty(
      HTMLElement.prototype,
      'getAnimations',
      originalGetAnimations
    )
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, 'getAnimations')
  }
  useAuthStore.setState(useAuthStore.getInitialState(), true)
  useSystemConfigStore.setState(useSystemConfigStore.getInitialState(), true)
  window.localStorage.clear()
})

async function renderOverview() {
  const router = createRouter({
    routeTree: createRootRoute({ component: OverviewDashboard }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  return render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

async function readRequestPreview() {
  await screen.findByRole('button', { name: 'Anthropic' })
  return [...document.querySelectorAll('code')]
    .map((element) => element.textContent ?? '')
    .join('\n')
}

describe('overview request preview', () => {
  it('defaults to the OpenAI chat completions request', async () => {
    await renderOverview()

    const preview = await readRequestPreview()
    expect(preview).toContain('/v1/chat/completions')
    expect(preview).toContain('Authorization: Bearer')
    expect(preview).not.toContain('/v1/messages')
  })

  it('switches to the Anthropic messages request and keeps the selected model', async () => {
    const user = userEvent.setup()
    await renderOverview()

    await user.click(await screen.findByRole('button', { name: 'Anthropic' }))

    const preview = await readRequestPreview()
    expect(preview).toContain('/v1/messages')
    expect(preview).toContain('x-api-key:')
    expect(preview).toContain('anthropic-version: 2023-06-01')
    expect(preview).toContain('"model":"claude-sonnet-5"')
    expect(preview).not.toContain('Authorization: Bearer')

    await user.click(screen.getByRole('button', { name: 'OpenAI' }))
    expect(await readRequestPreview()).toContain('/v1/chat/completions')
  })

  it('derives the base URL from the configured API info entry', async () => {
    apiInfo = [{ url: 'https://gateway.example.com/v1' }]
    await renderOverview()

    expect(await readRequestPreview()).toContain(
      'curl https://gateway.example.com/v1/chat/completions'
    )
  })
})
