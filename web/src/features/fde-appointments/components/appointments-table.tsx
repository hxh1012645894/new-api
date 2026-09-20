import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { DataTablePage, useDataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { useTableUrlState } from '@/hooks/use-table-url-state'

import { getFdeAppointments, getFdeAppointmentsCsv } from '../api'
import {
  FDE_ERROR_MESSAGES,
  getFdeAppointmentStatusOptions,
} from '../constants'
import { useFdeAppointmentsColumns } from './appointments-columns'
import { useFdeAppointments } from './appointments-provider'

const route = getRouteApi('/_authenticated/fde-appointments/')

export function FdeAppointmentsTable() {
  const { t } = useTranslation()
  const columns = useFdeAppointmentsColumns()
  const { refreshTrigger, triggerRefresh } = useFdeAppointments()

  const {
    globalFilter,
    onGlobalFilterChange,
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 20 },
    globalFilter: { enabled: true, key: 'filter' },
    columnFilters: [{ columnId: 'status', searchKey: 'status', type: 'array' }],
  })
  const statusFilter =
    (columnFilters.find((filter) => filter.id === 'status')?.value as
      | string[]
      | undefined) ?? []
  const statusFilterValue = statusFilter[0] ?? ''

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'fde-appointments',
      pagination.pageIndex + 1,
      pagination.pageSize,
      globalFilter,
      statusFilterValue,
      refreshTrigger,
    ],
    queryFn: async () => {
      const result = await getFdeAppointments({
        p: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        keyword: globalFilter || '',
        status: statusFilterValue,
      })
      if (!result.success) {
        toast.error(result.message || t(FDE_ERROR_MESSAGES.LOAD_FAILED))
        return { items: [], total: 0 }
      }
      return {
        items: result.data?.items || [],
        total: result.data?.total || 0,
      }
    },
    placeholderData: (previousData) => previousData,
  })

  const appointments = data?.items || []

  const { table } = useDataTable({
    data: appointments,
    columns,
    columnFilters,
    globalFilter,
    pagination,
    onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
    manualPagination: true,
    manualFiltering: true,
    totalCount: data?.total || 0,
    ensurePageInRange,
  })

  const statusOptions = useMemo(() => getFdeAppointmentStatusOptions(t), [t])

  const handleExport = async () => {
    try {
      const { blob, filename } = await getFdeAppointmentsCsv({
        status: statusFilterValue,
        keyword: globalFilter || '',
      })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = filename
      anchor.click()
      URL.revokeObjectURL(url)
      triggerRefresh()
    } catch {
      toast.error(t('Failed to export appointments'))
    }
  }

  return (
    <DataTablePage
      table={table}
      columns={columns}
      isLoading={isLoading}
      isFetching={isFetching}
      emptyTitle={t('No Appointments Found')}
      emptyDescription={t(
        'No FDE appointment submissions yet. New submissions will appear here.'
      )}
      skeletonKeyPrefix='fde-appointments-skeleton'
      applyHeaderSize
      toolbarProps={{
        searchPlaceholder: t('Filter by name, company or contact...'),
        searchDebounceMs: 500,
        filters: [
          {
            columnId: 'status',
            title: t('Status'),
            options: statusOptions,
            singleSelect: true,
          },
        ],
        preActions: (
          <Button variant='outline' size='sm' onClick={handleExport}>
            <Download className='size-4' />
            {t('Export CSV')}
          </Button>
        ),
      }}
    />
  )
}
