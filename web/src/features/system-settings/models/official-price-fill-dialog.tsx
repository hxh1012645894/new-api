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
along with this program. If not, see <http://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Dialog } from '@/components/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { handleServerError } from '@/lib/handle-server-error'

import { applyOfficialPrices, previewOfficialPrices } from '../api'
import type { OfficialPriceCandidate } from '../types'

type CandidateState = 'new' | 'replace' | 'current'

function samePrice(left: number, right: number): boolean {
  return Math.abs(left - right) < 1e-9
}

function stateOf(candidate: OfficialPriceCandidate): CandidateState {
  const untouched =
    candidate.configured_input === 0 && candidate.configured_output === 0
  if (untouched) return 'new'
  if (
    samePrice(candidate.configured_input, candidate.preset_input) &&
    samePrice(candidate.configured_output, candidate.preset_output)
  ) {
    return 'current'
  }
  return 'replace'
}

export function OfficialPriceFillDialog(props: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [candidates, setCandidates] = useState<OfficialPriceCandidate[]>([])
  const [unavailable, setUnavailable] = useState<string[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!props.open) return
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const response = await previewOfficialPrices()
        if (cancelled) return
        if (!response.success || !response.data) {
          toast.error(response.message || t('Failed to load official prices'))
          return
        }
        setCandidates(response.data.candidates)
        setUnavailable(response.data.unavailable)
        setSelected(
          new Set(
            response.data.candidates
              .filter((candidate) => stateOf(candidate) !== 'current')
              .map((candidate) => candidate.model_name)
          )
        )
      } catch (error) {
        if (!cancelled) {
          handleServerError(error, t('Failed to load official prices'))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  const selectable = useMemo(
    () => candidates.filter((candidate) => stateOf(candidate) !== 'current'),
    [candidates]
  )

  const toggle = (modelName: string, checked: boolean) => {
    setSelected((previous) => {
      const next = new Set(previous)
      if (checked) next.add(modelName)
      else next.delete(modelName)
      return next
    })
  }

  const handleApply = async () => {
    if (selected.size === 0 || saving) return
    setSaving(true)
    try {
      const response = await applyOfficialPrices([...selected])
      if (!response.success) {
        toast.error(response.message || t('Failed to save official prices'))
        return
      }
      toast.success(
        t('Filled {{count}} models', { count: response.data?.updated ?? 0 })
      )
      props.onOpenChange(false)
    } catch (error) {
      handleServerError(error, t('Failed to save official prices'))
    } finally {
      setSaving(false)
    }
  }

  const stateLabel: Record<CandidateState, string> = {
    new: t('Add'),
    replace: t('Replace'),
    current: t('Already current'),
  }

  let body: ReactNode
  if (loading) {
    body = <p className='text-muted-foreground text-sm'>{t('Loading...')}</p>
  } else if (candidates.length === 0) {
    body = (
      <p className='text-muted-foreground text-sm'>
        {t('The preset carries no rate for any model this instance serves.')}
      </p>
    )
  } else {
    body = (
      <div className='space-y-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-10' />
              <TableHead>{t('Model')}</TableHead>
              <TableHead className='text-right'>
                {t('Official input')}
              </TableHead>
              <TableHead className='text-right'>
                {t('Official output')}
              </TableHead>
              <TableHead className='text-right'>{t('Current')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => {
              const state = stateOf(candidate)
              const disabled = state === 'current'
              return (
                <TableRow key={candidate.model_name}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(candidate.model_name)}
                      disabled={disabled}
                      onCheckedChange={(checked) =>
                        toggle(candidate.model_name, checked === true)
                      }
                      aria-label={t('Select {{model}}', {
                        model: candidate.model_name,
                      })}
                    />
                  </TableCell>
                  <TableCell className='font-mono text-xs'>
                    {candidate.model_name}
                  </TableCell>
                  <TableCell className='text-right font-mono text-xs tabular-nums'>
                    ${candidate.preset_input}
                  </TableCell>
                  <TableCell className='text-right font-mono text-xs tabular-nums'>
                    ${candidate.preset_output}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-right font-mono text-xs tabular-nums'>
                    {candidate.configured_input > 0 ||
                    candidate.configured_output > 0
                      ? `$${candidate.configured_input} / $${candidate.configured_output}`
                      : '—'}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-xs whitespace-nowrap'>
                    {stateLabel[state]}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {selectable.length === 0 && (
          <p className='text-muted-foreground text-xs'>
            {t('Every matched model already carries this price.')}
          </p>
        )}

        {unavailable.length > 0 && (
          <div className='text-muted-foreground space-y-1 text-xs'>
            <p>
              {t(
                'The preset carries no usable rate for these models, so they still need entering by hand:'
              )}
            </p>
            <p className='font-mono break-words'>{unavailable.join(', ')}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      title={t('Fill official prices')}
      description={t(
        'Reads the published rates new-api ships, matches them against the models this instance serves, and stores the ones you pick. This only feeds the discount on the model square — the charge stays unchanged.'
      )}
      contentHeight='auto'
      footer={
        <>
          <Button
            type='button'
            variant='outline'
            onClick={() => props.onOpenChange(false)}
          >
            {t('Cancel')}
          </Button>
          <Button
            type='button'
            onClick={handleApply}
            disabled={saving || selected.size === 0}
          >
            {saving
              ? t('Saving...')
              : t('Fill {{count}} models', { count: selected.size })}
          </Button>
        </>
      }
    >
      {body}
    </Dialog>
  )
}
