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
import { z } from 'zod'

/**
 * Cooperation request choices for the FDE appointment form. Values are i18n
 * keys (registered in `src/i18n/static-keys.ts`); components render them via
 * `t(option)`.
 */
export const FDE_REQUEST_OPTIONS = [
  'Call audit & cost governance',
  'Enterprise Brain setup',
  'Joint FDE landing',
  'Data warehouse & decision engine',
  'Other',
] as const

export const fdeAppointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name')
    .max(50, 'Name must be within 50 characters'),
  company: z
    .string()
    .trim()
    .min(1, 'Please enter your company')
    .max(100, 'Company must be within 100 characters'),
  title: z
    .string()
    .trim()
    .min(1, 'Please enter your title')
    .max(50, 'Title must be within 50 characters'),
  contact: z
    .string()
    .trim()
    .max(200, 'Contact must be within 200 characters')
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^1[3-9]\d{9}$/.test(value),
      'Enter a valid email or phone number'
    ),
  scenario: z
    .string()
    .trim()
    .min(10, 'Describe your scenario in at least 10 characters')
    .max(1000, 'Scenario must be within 1000 characters'),
  request: z.enum(FDE_REQUEST_OPTIONS, {
    error: 'Please select a cooperation request',
  }),
})

export type FdeAppointmentValues = z.infer<typeof fdeAppointmentSchema>
