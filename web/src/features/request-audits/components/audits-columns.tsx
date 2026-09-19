import { type ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
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

import type { RequestAudit } from '../types'
import { useRequestAudits } from './audits-provider'

function AuditRowActions({ audit }: { audit: RequestAudit }) {
  const { t } = useTranslation()
  const { setDetailRow } = useRequestAudits()

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant='ghost'
            size='icon-sm'
            onClick={() => setDetailRow(audit)}
            aria-label={t('View Details')}
          />
        }
      >
        <Eye />
      </TooltipTrigger>
      <TooltipContent>{t('View Details')}</TooltipContent>
    </Tooltip>
  )
}

export function useRequestAuditsColumns(): ColumnDef<RequestAudit>[] {
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
      accessorKey: 'created_at',
      header: t('Time'),
      meta: { mobileTitle: true },
      cell: ({ row }) => (
        <span className='text-muted-foreground text-xs'>
          {formatTimestampToDate(row.getValue('created_at'))}
        </span>
      ),
      size: 150,
    },
    {
      accessorKey: 'username',
      header: t('User'),
      cell: ({ row }) => {
        const audit = row.original
        return (
          <div>
            <div className='font-medium'>{audit.username || '-'}</div>
            <div className='text-muted-foreground text-xs'>
              {audit.token_name || `#${audit.token_id}`}
            </div>
          </div>
        )
      },
      size: 140,
    },
    {
      accessorKey: 'model_name',
      header: t('Model'),
      meta: { mobileHidden: true },
      cell: ({ row }) => (
        <span className='font-mono text-xs'>{row.getValue('model_name')}</span>
      ),
      size: 170,
    },
    {
      accessorKey: 'channel_id',
      header: t('Channel'),
      meta: { mobileHidden: true },
      cell: ({ row }) => (
        <span className='text-sm'>#{row.getValue('channel_id')}</span>
      ),
      size: 80,
    },
    {
      accessorKey: 'is_stream',
      header: t('Stream'),
      meta: { mobileHidden: true },
      cell: ({ row }) => (
        <StatusBadge
          label={row.getValue('is_stream') ? t('Stream') : t('Non-Stream')}
          variant='info'
          copyable={false}
          className='-ml-1.5'
        />
      ),
      size: 90,
    },
    {
      accessorKey: 'status_code',
      header: t('HTTP'),
      meta: { mobileHidden: true },
      cell: ({ row }) => {
        const code = row.getValue('status_code') as number
        let variant: 'success' | 'danger' | 'neutral' = 'neutral'
        if (code >= 200 && code < 300) {
          variant = 'success'
        } else if (code >= 400) {
          variant = 'danger'
        }
        return (
          <StatusBadge
            label={String(code)}
            variant={variant}
            copyable={false}
            className='-ml-1.5'
          />
        )
      },
      size: 80,
    },
    {
      accessorKey: 'use_time_ms',
      header: t('Timing'),
      meta: { mobileHidden: true },
      cell: ({ row }) => {
        const ms = row.getValue('use_time_ms') as number
        return (
          <span className='text-muted-foreground text-xs'>
            {ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`}
          </span>
        )
      },
      size: 80,
    },
    {
      accessorKey: 'response_truncated',
      header: t('Captured'),
      meta: { mobileHidden: true },
      cell: ({ row }) => {
        const responseTruncated = row.getValue('response_truncated') as boolean
        const requestTruncated = row.original.request_truncated as boolean
        const truncated = responseTruncated || requestTruncated
        return (
          <StatusBadge
            label={truncated ? t('Truncated') : t('Full')}
            variant={truncated ? 'warning' : 'success'}
            copyable={false}
            className='-ml-1.5'
          />
        )
      },
      size: 90,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <AuditRowActions audit={row.original} />,
      size: 70,
    },
  ]
}
