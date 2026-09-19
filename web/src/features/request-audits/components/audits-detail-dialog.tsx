import { useQuery } from '@tanstack/react-query'
import { Copy } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { formatTimestampToDate } from '@/lib/format'

import { getRequestAudit } from '../api'
import { useRequestAudits } from './audits-provider'

function prettyBody(body: string | undefined, isStream: boolean): string {
  if (!body) return ''
  if (isStream) return body
  try {
    return JSON.stringify(JSON.parse(body), null, 2)
  } catch {
    return body
  }
}

function BodySection({
  title,
  body,
  truncated,
}: {
  title: string
  body: string
  truncated: boolean
}) {
  const { t } = useTranslation()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body)
      toast.success(t('Copied'))
    } catch {
      toast.error(t('Copy failed'))
    }
  }
  return (
    <div className='space-y-1.5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm font-medium'>
          {title}
          {truncated && (
            <StatusBadge
              label={t('Truncated')}
              variant='warning'
              copyable={false}
            />
          )}
        </div>
        {body && (
          <Button
            variant='ghost'
            size='icon'
            className='size-7'
            onClick={handleCopy}
          >
            <Copy className='size-3.5' />
          </Button>
        )}
      </div>
      {body ? (
        <pre className='bg-muted max-h-[320px] overflow-auto rounded-md p-3 font-mono text-xs break-all whitespace-pre-wrap'>
          {body}
        </pre>
      ) : (
        <div className='text-muted-foreground text-sm'>-</div>
      )}
    </div>
  )
}

export function AuditDetailDialog() {
  const { t } = useTranslation()
  const { detailRow, setDetailRow } = useRequestAudits()

  const { data, isLoading } = useQuery({
    queryKey: ['request-audit', detailRow?.id],
    queryFn: async () => {
      if (!detailRow) return null
      const result = await getRequestAudit(detailRow.id)
      if (!result.success || !result.data) {
        toast.error(result.message || t('Failed to load audit detail'))
        return null
      }
      return result.data
    },
    enabled: !!detailRow,
  })

  const requestText = useMemo(
    () => prettyBody(data?.request_body, false),
    [data?.request_body]
  )
  const responseText = useMemo(
    () => prettyBody(data?.response_body, !!data?.is_stream),
    [data?.response_body, data?.is_stream]
  )

  return (
    <Dialog
      open={!!detailRow}
      onOpenChange={(isOpen) => {
        if (!isOpen) setDetailRow(null)
      }}
    >
      <DialogContent className='max-h-[85vh] overflow-y-auto sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>
            {t('Request Audit')} #{detailRow?.id}
          </DialogTitle>
          <DialogDescription>
            {data
              ? `${formatTimestampToDate(data.created_at)} · ${data.model_name} · ${data.is_stream ? t('Stream') : t('Non-Stream')}`
              : ''}
          </DialogDescription>
        </DialogHeader>
        {isLoading && (
          <div className='space-y-3'>
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-40 w-full' />
          </div>
        )}
        {!isLoading && data && (
          <div className='space-y-5'>
            <BodySection
              title={t('Request Body')}
              body={requestText}
              truncated={!!data.request_truncated}
            />
            <BodySection
              title={data.is_stream ? t('Response (SSE)') : t('Response Body')}
              body={responseText}
              truncated={!!data.response_truncated}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
