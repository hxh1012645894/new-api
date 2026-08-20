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
import { api } from '@/lib/api'

import type { FdeAppointmentValues } from './schema'

/**
 * Submits an FDE appointment.
 *
 * Configure `VITE_FDE_FORM_ENDPOINT` (an absolute URL, e.g. a form backend or
 * webhook) to deliver appointments in production. When it is unset the form
 * runs in demo mode and only simulates the round trip so the loading/success
 * states remain exercisable, matching the reference demo behavior.
 */
export async function submitFdeAppointment(
  values: FdeAppointmentValues
): Promise<void> {
  const endpoint = (
    import.meta.env.VITE_FDE_FORM_ENDPOINT as string | undefined
  )?.trim()
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return
  }
  await api.post(endpoint, values)
}
