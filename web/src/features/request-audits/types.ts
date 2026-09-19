import { z } from 'zod'

// ============================================================================
// Request Audit Schema & Types
// ============================================================================

// List rows carry metadata only; bodies are fetched per record.
export const requestAuditSchema = z.object({
  id: z.number(),
  created_at: z.number(),
  user_id: z.number(),
  username: z.string(),
  token_id: z.number(),
  token_name: z.string(),
  channel_id: z.number(),
  model_name: z.string(),
  is_stream: z.boolean(),
  status_code: z.number(),
  use_time_ms: z.number(),
  request_id: z.string(),
  request_body: z.string().optional(),
  response_body: z.string().optional(),
  request_truncated: z.boolean().optional(),
  response_truncated: z.boolean().optional(),
})

export type RequestAudit = z.infer<typeof requestAuditSchema>

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

export interface GetRequestAuditsParams {
  p?: number
  page_size?: number
  keyword?: string
  start_timestamp?: number
  end_timestamp?: number
}

export interface GetRequestAuditsResponse {
  success: boolean
  message?: string
  data?: {
    items: RequestAudit[]
    total: number
    page: number
    page_size: number
  }
}
