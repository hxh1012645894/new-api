import { type ColumnDef } from '@tanstack/react-table'
import { Eye, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { StatusBadge } from '@/components/status-badge'
import { TableId } from '@/components/table-id'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatTimestampToDate } from '@/lib/format'

import { FDE_APPOINTMENT_STATUSES } from '../constants'
import { type FdeAppointment } from '../types'
import { useFdeAppointments } from './appointments-provider'

function AppointmentRowActions({
  appointment,
}: {
  appointment: FdeAppointment
}) {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useFdeAppointments()

  return (
    <div className='-ml-1.5 flex items-center gap-1'>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant='ghost'
              size='icon-sm'
              onClick={() => {
                setCurrentRow(appointment)
                setOpen('detail')
              }}
              aria-label={t('View Details')}
            />
          }
        >
          <Eye />
        </TooltipTrigger>
        <TooltipContent>{t('View Details')}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant='ghost'
              size='icon-sm'
              onClick={() => {
                setCurrentRow(appointment)
                setOpen('update')
              }}
              aria-label={t('Edit')}
            />
          }
        >
          <Pencil />
        </TooltipTrigger>
        <TooltipContent>{t('Edit')}</TooltipContent>
      </Tooltip>
    </div>
  )
}

export function useFdeAppointmentsColumns(): ColumnDef<FdeAppointment>[] {
  const { t } = useTranslation()
  return [
    {
      accessorKey: 'id',
      header: t('ID'),
      meta: { mobileHidden: true },
      cell: ({ row }) => (
        <TableId value={row.getValue('id') as number} className='w-[60px]' />
      ),
      size: 80,
    },
    {
      accessorKey: 'created_time',
      header: t('Time'),
      meta: { mobileHidden: true },
      cell: ({ row }) => (
        <span className='text-muted-foreground text-xs'>
          {formatTimestampToDate(row.getValue('created_time'))}
        </span>
      ),
      size: 150,
    },
    {
      accessorKey: 'name',
      header: t('Name'),
      meta: { mobileTitle: true },
      cell: ({ row }) => (
        <div>
          <div className='font-medium'>{row.original.name}</div>
          <div className='text-muted-foreground text-xs'>
            {row.original.company} · {row.original.title}
          </div>
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: 'contact',
      header: t('Contact'),
      meta: { mobileHidden: true },
      cell: ({ row }) => (
        <span className='text-sm break-all'>{row.getValue('contact')}</span>
      ),
      size: 160,
    },
    {
      accessorKey: 'request',
      header: t('Cooperation Request'),
      meta: { mobileHidden: true },
      size: 140,
    },
    {
      accessorKey: 'status',
      header: t('Status'),
      meta: { mobileBadge: true },
      cell: ({ row }) => {
        const statusValue = row.getValue('status') as string
        const statusConfig = FDE_APPOINTMENT_STATUSES[statusValue]
        if (!statusConfig) return null
        return (
          <StatusBadge
            label={t(statusConfig.labelKey)}
            variant={statusConfig.variant}
            copyable={false}
            className='-ml-1.5'
          />
        )
      },
      filterFn: (row, id, value) => {
        return (value as string[]).includes(row.getValue(id) as string)
      },
      size: 100,
    },
    {
      accessorKey: 'feishu_synced',
      header: t('Feishu'),
      meta: { mobileHidden: true },
      cell: ({ row }) => {
        const synced = row.getValue('feishu_synced') as boolean
        return (
          <StatusBadge
            label={synced ? t('Synced') : t('Not Synced')}
            variant={synced ? 'success' : 'neutral'}
            copyable={false}
            className='-ml-1.5'
          />
        )
      },
      size: 100,
    },
    {
      accessorKey: 'admin_note',
      header: t('Note'),
      meta: { mobileHidden: true },
      cell: ({ row }) => {
        const note = row.getValue('admin_note') as string
        if (!note) return <span className='text-muted-foreground'>-</span>
        return (
          <Tooltip>
            <TooltipTrigger
              render={
                <span className='line-clamp-1 max-w-[180px] cursor-help text-sm'>
                  {note}
                </span>
              }
            ></TooltipTrigger>
            <TooltipContent className='max-w-[300px]'>{note}</TooltipContent>
          </Tooltip>
        )
      },
      size: 160,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <AppointmentRowActions appointment={row.original} />,
      size: 80,
    },
  ]
}
