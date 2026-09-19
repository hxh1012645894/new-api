import { api } from '@/lib/api'

import type {
  ApiResponse,
  GetRequestAuditsParams,
  GetRequestAuditsResponse,
  RequestAudit,
} from './types'

// ============================================================================
// Request Content Audit (admin)
// ============================================================================

export async function getRequestAudits(
  params: GetRequestAuditsParams = {}
): Promise<GetRequestAuditsResponse> {
  const {
    p = 1,
    page_size = 10,
    keyword = '',
    start_timestamp,
    end_timestamp,
  } = params
  const queryParams = new URLSearchParams()
  queryParams.set('p', String(p))
  queryParams.set('page_size', String(page_size))
  if (keyword) queryParams.set('keyword', keyword)
  if (start_timestamp) {
    queryParams.set('start_timestamp', String(start_timestamp))
  }
  if (end_timestamp) queryParams.set('end_timestamp', String(end_timestamp))
  const res = await api.get(`/api/request_audit/?${queryParams.toString()}`)
  return res.data
}

export async function getRequestAudit(
  id: number
): Promise<ApiResponse<RequestAudit>> {
  const res = await api.get(`/api/request_audit/${id}`)
  return res.data
}
