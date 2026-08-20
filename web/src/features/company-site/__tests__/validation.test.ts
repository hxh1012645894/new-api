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
import { describe, expect, test } from 'vitest'

import { fdeAppointmentSchema } from '../lib/schema'

function validAppointment(overrides: Record<string, unknown> = {}) {
  return {
    name: '张三',
    company: '皋如信息科技',
    title: '技术负责人',
    contact: 'zhangsan@example.com',
    scenario: '面向客户的智能客服，每天约十万次调用。',
    request: 'Call audit & cost governance',
    ...overrides,
  }
}

describe('FDE appointment schema', () => {
  test('accepts a complete appointment with an email contact', () => {
    const result = fdeAppointmentSchema.safeParse(validAppointment())
    expect(result.success).toBe(true)
  })

  test('accepts a mainland China mobile number as contact', () => {
    const result = fdeAppointmentSchema.safeParse(
      validAppointment({ contact: '13800138000' })
    )
    expect(result.success).toBe(true)
  })

  test('rejects a contact that is neither email nor phone', () => {
    const result = fdeAppointmentSchema.safeParse(
      validAppointment({ contact: 'not-a-contact' })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Enter a valid email or phone number'
      )
    }
  })

  test('rejects a scenario shorter than 10 characters', () => {
    const result = fdeAppointmentSchema.safeParse(
      validAppointment({ scenario: '太短' })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Describe your scenario in at least 10 characters'
      )
    }
  })

  test('rejects a name longer than 50 characters', () => {
    const result = fdeAppointmentSchema.safeParse(
      validAppointment({ name: '张'.repeat(51) })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Name must be within 50 characters'
      )
    }
  })

  test('rejects an empty cooperation request', () => {
    const result = fdeAppointmentSchema.safeParse(
      validAppointment({ request: '' })
    )
    expect(result.success).toBe(false)
  })
})
