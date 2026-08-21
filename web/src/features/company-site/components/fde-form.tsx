/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { handleServerError } from '@/lib/handle-server-error'

import {
  FDE_REQUEST_OPTIONS,
  fdeAppointmentSchema,
  type FdeAppointmentValues,
} from '../lib/schema'
import { submitFdeAppointment } from '../lib/submit-fde'

function TranslatedFieldError(props: { message: string | undefined }) {
  const { t } = useTranslation()
  if (!props.message) return null
  return <FieldError>{t(props.message)}</FieldError>
}

export function FdeForm() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const form = useForm<FdeAppointmentValues>({
    resolver: zodResolver(fdeAppointmentSchema),
    defaultValues: {
      name: '',
      company: '',
      title: '',
      contact: '',
      scenario: '',
      request: undefined,
    },
  })

  const appointmentMutation = useMutation({
    mutationFn: submitFdeAppointment,
    onSuccess: () => {
      form.reset()
      setSubmitted(true)
    },
    onError: (error) => {
      handleServerError(error)
      setSubmitError(t('Failed to submit. Please try again.'))
    },
  })

  const onSubmit = (values: FdeAppointmentValues) => {
    setSubmitError('')
    appointmentMutation.mutate(values)
  }

  if (submitted) {
    return (
      <div
        role='status'
        aria-live='polite'
        className='border-border/70 bg-card flex h-full flex-col items-center justify-center rounded-2xl border p-10 text-center'
      >
        <span className='bg-success/10 text-success flex size-10 items-center justify-center rounded-full'>
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            strokeWidth={2}
            className='size-5'
            aria-hidden='true'
          />
        </span>
        <h3 className='mt-4 text-lg font-semibold'>
          {t('Appointment received. The iFAi team will reply within 24 hours.')}
        </h3>
        <p className='text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed'>
          {t(
            'Your information is only used to evaluate and follow up on the FDE engagement.'
          )}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className='border-border/70 bg-card rounded-2xl border p-6 shadow-sm sm:p-8'
    >
      <FieldGroup className='grid gap-5 sm:grid-cols-2'>
        <Field data-invalid={Boolean(form.formState.errors.name)}>
          <FieldLabel htmlFor='fde-name'>{t('Name')}</FieldLabel>
          <Input
            id='fde-name'
            type='text'
            autoComplete='name'
            placeholder={t('Your name')}
            aria-invalid={Boolean(form.formState.errors.name)}
            {...form.register('name')}
          />
          <TranslatedFieldError message={form.formState.errors.name?.message} />
        </Field>

        <Field data-invalid={Boolean(form.formState.errors.company)}>
          <FieldLabel htmlFor='fde-company'>{t('Company')}</FieldLabel>
          <Input
            id='fde-company'
            type='text'
            autoComplete='organization'
            placeholder={t('Company name')}
            aria-invalid={Boolean(form.formState.errors.company)}
            {...form.register('company')}
          />
          <TranslatedFieldError
            message={form.formState.errors.company?.message}
          />
        </Field>

        <Field data-invalid={Boolean(form.formState.errors.title)}>
          <FieldLabel htmlFor='fde-title'>{t('Title')}</FieldLabel>
          <Input
            id='fde-title'
            type='text'
            placeholder={t('Your title')}
            aria-invalid={Boolean(form.formState.errors.title)}
            {...form.register('title')}
          />
          <TranslatedFieldError
            message={form.formState.errors.title?.message}
          />
        </Field>

        <Field data-invalid={Boolean(form.formState.errors.contact)}>
          <FieldLabel htmlFor='fde-contact'>{t('Contact')}</FieldLabel>
          <Input
            id='fde-contact'
            type='text'
            placeholder={t('Email or phone number')}
            aria-invalid={Boolean(form.formState.errors.contact)}
            {...form.register('contact')}
          />
          <TranslatedFieldError
            message={form.formState.errors.contact?.message}
          />
        </Field>

        <Field
          data-invalid={Boolean(form.formState.errors.scenario)}
          className='sm:col-span-2'
        >
          <FieldLabel htmlFor='fde-scenario'>
            {t('Business scenario')}
          </FieldLabel>
          <Textarea
            id='fde-scenario'
            rows={4}
            placeholder={t(
              'e.g. customer-facing AI support, internal knowledge assistant, agent workflows…'
            )}
            aria-invalid={Boolean(form.formState.errors.scenario)}
            className='min-h-24 resize-y'
            {...form.register('scenario')}
          />
          <TranslatedFieldError
            message={form.formState.errors.scenario?.message}
          />
        </Field>

        <Field
          data-invalid={Boolean(form.formState.errors.request)}
          className='sm:col-span-2'
        >
          <FieldLabel htmlFor='fde-request'>
            {t('Cooperation request')}
          </FieldLabel>
          <NativeSelect
            id='fde-request'
            defaultValue=''
            aria-invalid={Boolean(form.formState.errors.request)}
            className='w-full'
            {...form.register('request')}
          >
            <NativeSelectOption value='' disabled>
              {t('Please select')}
            </NativeSelectOption>
            {FDE_REQUEST_OPTIONS.map((option) => (
              <NativeSelectOption key={option} value={option}>
                {t(option)}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <TranslatedFieldError
            message={form.formState.errors.request?.message}
          />
        </Field>
      </FieldGroup>

      <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <FieldDescription>
          {t(
            'By submitting, you agree that iFAi will contact you within 24 hours.'
          )}
        </FieldDescription>
        <Button type='submit' disabled={appointmentMutation.isPending}>
          {appointmentMutation.isPending ? (
            <>
              <Spinner data-icon='inline-start' />
              {t('Submitting…')}
            </>
          ) : (
            t('Book FDE')
          )}
        </Button>
      </div>

      {submitError ? (
        <p
          role='alert'
          className='border-destructive/40 text-destructive mt-4 rounded-lg border px-3 py-2 text-xs'
        >
          {submitError}
        </p>
      ) : null}
    </form>
  )
}
