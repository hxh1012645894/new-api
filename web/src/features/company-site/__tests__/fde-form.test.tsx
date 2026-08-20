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
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { FdeForm } from '../components/fde-form'

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

describe('FDE appointment form', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  test('shows field errors and keeps the form when required fields are invalid', async () => {
    const user = userEvent.setup()
    render(<FdeForm />)

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
    render(<FdeForm />)

    await user.type(screen.getByLabelText('Contact'), 'not-a-contact')
    await user.click(screen.getByRole('button', { name: 'Book FDE' }))

    expect(
      await screen.findByText('Enter a valid email or phone number')
    ).toBeInTheDocument()
  })

  test('shows the success state after a valid submission completes', async () => {
    const user = userEvent.setup()
    render(<FdeForm />)

    await fillValidAppointment(user)
    await user.click(screen.getByRole('button', { name: 'Book FDE' }))

    expect(
      await screen.findByText(
        'Appointment received. The iFAi team will reply within 24 hours.',
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument()
  })
})
