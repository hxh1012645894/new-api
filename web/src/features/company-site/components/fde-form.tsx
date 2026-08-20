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
import { Check } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import {
  FDE_REQUEST_OPTIONS,
  fdeAppointmentSchema,
  type FdeAppointmentValues,
} from '../lib/schema'
import { submitFdeAppointment } from '../lib/submit-fde'

const inputClass = (invalid: boolean) =>
  cn(
    'h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/30',
    invalid ? 'border-destructive' : 'border-input'
  )

function FieldError(props: { message: string | undefined }) {
  const { t } = useTranslation()
  if (!props.message) return null
  return <p className='text-destructive text-xs'>{t(props.message)}</p>
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: FdeAppointmentValues) => {
    setSubmitError('')
    try {
      await submitFdeAppointment(values)
      reset()
      setSubmitted(true)
    } catch {
      setSubmitError(t('Failed to submit. Please try again.'))
    }
  }

  if (submitted) {
    return (
      <div
        role='status'
        aria-live='polite'
        className='border-border/70 bg-card flex h-full flex-col items-center justify-center rounded-2xl border p-10 text-center'
      >
        <span className='flex size-10 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400'>
          <Check className='size-5' aria-hidden='true' />
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
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='border-border/70 bg-card rounded-2xl border p-6 shadow-sm sm:p-8'
    >
      <div className='grid gap-5 sm:grid-cols-2'>
        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='fde-name'
            className='text-muted-foreground text-xs font-medium'
          >
            {t('Name')}
          </label>
          <input
            id='fde-name'
            type='text'
            autoComplete='name'
            placeholder={t('Your name')}
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
            {...register('name')}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='fde-company'
            className='text-muted-foreground text-xs font-medium'
          >
            {t('Company')}
          </label>
          <input
            id='fde-company'
            type='text'
            autoComplete='organization'
            placeholder={t('Company name')}
            aria-invalid={!!errors.company}
            className={inputClass(!!errors.company)}
            {...register('company')}
          />
          <FieldError message={errors.company?.message} />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='fde-title'
            className='text-muted-foreground text-xs font-medium'
          >
            {t('Title')}
          </label>
          <input
            id='fde-title'
            type='text'
            placeholder={t('Your title')}
            aria-invalid={!!errors.title}
            className={inputClass(!!errors.title)}
            {...register('title')}
          />
          <FieldError message={errors.title?.message} />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='fde-contact'
            className='text-muted-foreground text-xs font-medium'
          >
            {t('Contact')}
          </label>
          <input
            id='fde-contact'
            type='text'
            placeholder={t('Email or phone number')}
            aria-invalid={!!errors.contact}
            className={inputClass(!!errors.contact)}
            {...register('contact')}
          />
          <FieldError message={errors.contact?.message} />
        </div>

        <div className='flex flex-col gap-1.5 sm:col-span-2'>
          <label
            htmlFor='fde-scenario'
            className='text-muted-foreground text-xs font-medium'
          >
            {t('Business scenario')}
          </label>
          <textarea
            id='fde-scenario'
            rows={4}
            placeholder={t(
              'e.g. customer-facing AI support, internal knowledge assistant, agent workflows…'
            )}
            aria-invalid={!!errors.scenario}
            className={cn(
              inputClass(!!errors.scenario),
              'h-auto min-h-24 resize-y py-2.5'
            )}
            {...register('scenario')}
          />
          <FieldError message={errors.scenario?.message} />
        </div>

        <div className='flex flex-col gap-1.5 sm:col-span-2'>
          <label
            htmlFor='fde-request'
            className='text-muted-foreground text-xs font-medium'
          >
            {t('Cooperation request')}
          </label>
          <select
            id='fde-request'
            defaultValue=''
            aria-invalid={!!errors.request}
            className={inputClass(!!errors.request)}
            {...register('request')}
          >
            <option value='' disabled>
              {t('Please select')}
            </option>
            {FDE_REQUEST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
          {errors.request ? (
            <p className='text-destructive text-xs'>
              {t('Please select a cooperation request')}
            </p>
          ) : null}
        </div>
      </div>

      <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <span className='text-muted-foreground text-xs'>
          {t(
            'By submitting, you agree that iFAi will contact you within 24 hours.'
          )}
        </span>
        <Button
          type='submit'
          className='h-11 px-6 text-sm font-medium'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('Submitting…') : t('Book FDE')}
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
