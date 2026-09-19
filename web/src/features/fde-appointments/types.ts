import { z } from 'zod'

// ============================================================================
// FDE Appointment Schema & Types
// ============================================================================

export const fdeAppointmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  company: z.string(),
  title: z.string(),
  contact: z.string(),
  scenario: z.string(),
  request: z.string(),
  status: z.string(),
  created_time: z.number(),
  updated_time: z.number(),
  admin_note: z.string(),
  feishu_synced: z.boolean(),
})

export type FdeAppointment = z.infer<typeof fdeAppointmentSchema>

export type FdeAppointmentStatus = 'pending' | 'contacted' | 'won' | 'closed'

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

export interface GetFdeAppointmentsParams {
  p?: number
  page_size?: number
  status?: string
  keyword?: string
}

export interface GetFdeAppointmentsResponse {
  success: boolean
  message?: string
  data?: {
    items: FdeAppointment[]
    total: number
    page: number
    page_size: number
  }
}

export interface UpdateFdeAppointmentParams {
  id: number
  status?: string
  admin_note?: string
}

export type FdeAppointmentsDialogType = 'update' | 'detail'
