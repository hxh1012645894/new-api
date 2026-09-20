import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { DataTablePage, useDataTable } from '@/components/data-table'
import { useTableUrlState } from '@/hooks/use-table-url-state'

import { getRequestAudits } from '../api'
import { useRequestAuditsColumns } from './audits-columns'

const route = getRouteApi('/_authenticated/request-audits/')

export function RequestAuditsTable() {
  const { t } = useTranslation()
  const columns = useRequestAuditsColumns()

  const {
    globalFilter,
    onGlobalFilterChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 20 },
    globalFilter: { enabled: true, key: 'filter' },
  })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'request-audits',
      pagination.pageIndex + 1,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: async () => {
      const result = await getRequestAudits({
        p: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        keyword: globalFilter || '',
      })
      if (!result.success) {
        toast.error(result.message || t('Failed to load audit records'))
        return { items: [], total: 0 }
      }
      return {
        items: result.data?.items || [],
        total: result.data?.total || 0,
      }
    },
    placeholderData: (previousData) => previousData,
  })

  const audits = data?.items || []

  const { table } = useDataTable({
    data: audits,
    columns,
    globalFilter,
    pagination,
    onPaginationChange,
    onGlobalFilterChange,
    manualPagination: true,
    manualFiltering: true,
    totalCount: data?.total || 0,
    ensurePageInRange,
  })

  return (
    <DataTablePage
      table={table}
      columns={columns}
      isLoading={isLoading}
      isFetching={isFetching}
      emptyTitle={t('No Audit Records Found')}
      emptyDescription={t(
        'Captured request and response content will appear here once the audit feature is enabled and requests are relayed.'
      )}
      skeletonKeyPrefix='request-audits-skeleton'
      applyHeaderSize
      toolbarProps={{
        searchPlaceholder: t('Filter by user, model or request ID...'),
        searchDebounceMs: 500,
      }}
    />
  )
}
