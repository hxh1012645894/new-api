import type { FdeAppointmentStatus } from './types'

export const FDE_APPOINTMENT_STATUSES: Record<
  string,
  { labelKey: string; variant: 'info' | 'success' | 'warning' | 'neutral' }
> = {
  pending: { labelKey: 'Pending', variant: 'warning' },
  contacted: { labelKey: 'Contacted', variant: 'info' },
  won: { labelKey: 'Won', variant: 'success' },
  closed: { labelKey: 'Closed', variant: 'neutral' },
}

export const FDE_APPOINTMENT_STATUS_VALUES = [
  'pending',
  'contacted',
  'won',
  'closed',
] as const satisfies readonly FdeAppointmentStatus[]

export function getFdeAppointmentStatusOptions(t: (key: string) => string) {
  return FDE_APPOINTMENT_STATUS_VALUES.map((value) => ({
    label: t(FDE_APPOINTMENT_STATUSES[value].labelKey),
    value,
  }))
}

export const FDE_ERROR_MESSAGES = {
  LOAD_FAILED: 'Failed to load appointments',
  SEARCH_FAILED: 'Failed to search appointments',
  UPDATE_FAILED: 'Failed to update appointment',
} as const
