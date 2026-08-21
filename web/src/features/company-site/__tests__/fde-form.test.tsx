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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { api } from '@/lib/api'

import { FdeForm } from '../components/fde-form'

vi.mock('@/lib/api', () => ({
  api: {
    post: vi.fn(),
  },
}))

const postMock = vi.mocked(api.post)

function fillValidAppointment(user: ReturnType<typeof userEvent.setup>) {
  return user
    .type(screen.getByLabelText('Name'), '张三')
    .then(() => user.type(screen.getByLabelText('Company'), '皋如信息科技'))
    .then(() => user.type(screen.getByLabelText('Title'), '技术负责人'))
    .then(() =>
      user.type(screen.getByLabelText('Contact'), 'zhangsan@example.com')
    )
    .then(() =>
      user.type(
        screen.getByLabelText('Business scenario'),
        '面向客户的智能客服，每天约十万次调用。'
      )
    )
    .then(() =>
      user.selectOptions(
        screen.getByLabelText('Cooperation request'),
        'Call audit & cost governance'
      )
    )
}

function renderFdeForm() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <FdeForm />
    </QueryClientProvider>
  )
}

describe('FDE appointment form', () => {
  beforeEach(() => {
    postMock.mockResolvedValue({ data: { success: true, data: { id: 1 } } })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows field errors and keeps the form when required fields are invalid', async () => {
    const user = userEvent.setup()
    renderFdeForm()

    await user.click(screen.getByRole('button', { name: 'Book FDE' }))

    expect(
      await screen.findByText('Please enter your name')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Enter a valid email or phone number')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Describe your scenario in at least 10 characters')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Please select a cooperation request')
    ).toBeInTheDocument()
  })

  test('rejects a contact that is neither email nor phone', async () => {
    const user = userEvent.setup()
    renderFdeForm()

    await user.type(screen.getByLabelText('Contact'), 'not-a-contact')
    await user.click(screen.getByRole('button', { name: 'Book FDE' }))

    expect(
      await screen.findByText('Enter a valid email or phone number')
    ).toBeInTheDocument()
  })

  test('shows the success state after a valid submission completes', async () => {
    const user = userEvent.setup()
    renderFdeForm()

    await fillValidAppointment(user)
    await user.click(screen.getByRole('button', { name: 'Book FDE' }))

    expect(postMock).toHaveBeenCalledWith('/api/fde/appointments', {
      name: '张三',
      company: '皋如信息科技',
      title: '技术负责人',
      contact: 'zhangsan@example.com',
      scenario: '面向客户的智能客服，每天约十万次调用。',
      request: 'Call audit & cost governance',
    })

    expect(
      await screen.findByText(
        'Appointment received. The iFAi team will reply within 24 hours.',
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument()
  })

  test('disables submission and shows pending feedback while the API is running', async () => {
    postMock.mockImplementationOnce(() => new Promise(() => {}))
    const user = userEvent.setup()
    renderFdeForm()

    await fillValidAppointment(user)
    await user.click(screen.getByRole('button', { name: 'Book FDE' }))

    const pendingLabel = await screen.findByText('Submitting…')
    expect(pendingLabel.closest('button')).toBeDisabled()
  })

  test('keeps the entered appointment and shows an error when the API fails', async () => {
    postMock.mockRejectedValueOnce(new Error('network unavailable'))
    const user = userEvent.setup()
    renderFdeForm()

    await fillValidAppointment(user)
    await user.click(screen.getByRole('button', { name: 'Book FDE' }))

    expect(
      await screen.findByText('Failed to submit. Please try again.')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('张三')
    expect(screen.getByLabelText('Contact')).toHaveValue('zhangsan@example.com')
  })
})
