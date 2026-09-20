import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import * as z from 'zod'

import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { formatTimestampToDate } from '@/lib/format'

import { updateFdeAppointment } from '../api'
import {
  FDE_APPOINTMENT_STATUSES,
  FDE_ERROR_MESSAGES,
  getFdeAppointmentStatusOptions,
} from '../constants'
import type { FdeAppointment } from '../types'
import { useFdeAppointments } from './appointments-provider'

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='grid grid-cols-[100px_1fr] gap-3 text-sm'>
      <div className='text-muted-foreground'>{label}</div>
      <div className='break-all whitespace-pre-wrap'>{value || '-'}</div>
    </div>
  )
}

function AppointmentDetailDialog({
  appointment,
}: {
  appointment: FdeAppointment
}) {
  const { t } = useTranslation()
  const { open, setOpen } = useFdeAppointments()
  const statusConfig = FDE_APPOINTMENT_STATUSES[appointment.status]

  return (
    <Dialog
      open={open === 'detail'}
      onOpenChange={(isOpen) => setOpen(isOpen ? 'detail' : null)}
    >
      <DialogContent className='max-h-[85vh] overflow-y-auto sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {t('Appointment')} #{appointment.id}
          </DialogTitle>
          <DialogDescription>
            {formatTimestampToDate(appointment.created_time)}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-3'>
          <DetailRow label={t('Name')} value={appointment.name} />
          <DetailRow label={t('Company')} value={appointment.company} />
          <DetailRow label={t('Title')} value={appointment.title} />
          <DetailRow label={t('Contact')} value={appointment.contact} />
          <DetailRow
            label={t('Cooperation Request')}
            value={appointment.request}
          />
          <DetailRow
            label={t('Business scenario')}
            value={appointment.scenario}
          />
          <Separator />
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-muted-foreground'>{t('Status')}</span>
            {statusConfig && (
              <StatusBadge
                label={t(statusConfig.labelKey)}
                variant={statusConfig.variant}
                copyable={false}
              />
            )}
          </div>
          <DetailRow label={t('Note')} value={appointment.admin_note} />
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-muted-foreground'>{t('Feishu')}</span>
            <StatusBadge
              label={appointment.feishu_synced ? t('Synced') : t('Not Synced')}
              variant={appointment.feishu_synced ? 'success' : 'neutral'}
              copyable={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const updateSchema = z.object({
  status: z.string(),
  admin_note: z.string().max(500),
})

type UpdateFormValues = z.infer<typeof updateSchema>

function AppointmentUpdateDialog({
  appointment,
}: {
  appointment: FdeAppointment
}) {
  const { t } = useTranslation()
  const { open, setOpen } = useFdeAppointments()
  const queryClient = useQueryClient()
  const statusOptions = getFdeAppointmentStatusOptions(t)

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      status: appointment.status,
      admin_note: appointment.admin_note,
    },
  })

  useEffect(() => {
    form.reset({
      status: appointment.status,
      admin_note: appointment.admin_note,
    })
  }, [appointment, form])

  const updateMutation = useMutation({
    mutationFn: updateFdeAppointment,
    onSuccess: (result) => {
      if (result.success) {
        toast.success(t('Appointment updated'))
        setOpen(null)
        queryClient.invalidateQueries({ queryKey: ['fde-appointments'] })
      } else {
        toast.error(result.message || t(FDE_ERROR_MESSAGES.UPDATE_FAILED))
      }
    },
    onError: () => {
      toast.error(t(FDE_ERROR_MESSAGES.UPDATE_FAILED))
    },
  })

  const onSubmit = (values: UpdateFormValues) => {
    updateMutation.mutate({
      id: appointment.id,
      status: values.status,
      admin_note: values.admin_note,
    })
  }

  return (
    <Dialog
      open={open === 'update'}
      onOpenChange={(isOpen) => setOpen(isOpen ? 'update' : null)}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {t('Edit Appointment')} #{appointment.id}
          </DialogTitle>
          <DialogDescription>
            {appointment.company} · {appointment.name}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
            autoComplete='off'
          >
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Status')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder={t('Please select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='admin_note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Note')}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder={t('Follow-up notes for this appointment')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(null)}
              >
                {t('Cancel')}
              </Button>
              <Button type='submit' disabled={updateMutation.isPending}>
                {updateMutation.isPending ? t('Saving...') : t('Save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export function FdeAppointmentsDialogs() {
  const { currentRow } = useFdeAppointments()
  if (!currentRow) return null
  return (
    <>
      <AppointmentDetailDialog appointment={currentRow} />
      <AppointmentUpdateDialog appointment={currentRow} />
    </>
  )
}
