import { api } from '@/lib/api'

import type {
  ApiResponse,
  FdeAppointment,
  GetFdeAppointmentsParams,
  GetFdeAppointmentsResponse,
  UpdateFdeAppointmentParams,
} from './types'

// ============================================================================
// FDE Appointment Management
// ============================================================================

export async function getFdeAppointments(
  params: GetFdeAppointmentsParams = {}
): Promise<GetFdeAppointmentsResponse> {
  const { p = 1, page_size = 10, status = '', keyword = '' } = params
  const queryParams = new URLSearchParams()
  queryParams.set('p', String(p))
  queryParams.set('page_size', String(page_size))
  if (status) queryParams.set('status', status)
  if (keyword) queryParams.set('keyword', keyword)
  const res = await api.get(`/api/fde/appointments/?${queryParams.toString()}`)
  return res.data
}

export async function updateFdeAppointment(
  params: UpdateFdeAppointmentParams
): Promise<ApiResponse> {
  const { id, ...body } = params
  const res = await api.put(`/api/fde/appointments/${id}`, body)
  return res.data
}

export async function getFdeAppointmentsCsv(
  params: { status?: string; keyword?: string } = {}
): Promise<{ blob: Blob; filename: string }> {
  const { status = '', keyword = '' } = params
  const queryParams = new URLSearchParams()
  if (status) queryParams.set('status', status)
  if (keyword) queryParams.set('keyword', keyword)
  const query = queryParams.toString()
  const res = await api.get(
    `/api/fde/appointments/export${query ? `?${query}` : ''}`,
    { responseType: 'blob' }
  )
  const header = res.headers?.['content-disposition'] as string | undefined
  const match = header?.match(/filename=([^;\s]+)/)
  return {
    blob: res.data as Blob,
    filename: match?.[1] ?? 'fde_appointments.csv',
  }
}

export type { FdeAppointment }
