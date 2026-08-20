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
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

import { SectionHead } from '../section-head'

interface ChainItemProps {
  num: string
  dotClass: string
  highlighted?: boolean
  title: string
  badge?: string
  tagline?: string
  description: string
}

function ChainItem(props: ChainItemProps) {
  return (
    <article
      className={cn(
        'grid grid-cols-[48px_1fr] gap-6 py-8',
        props.highlighted
          ? 'border-violet-500/30 bg-violet-500/[0.05] rounded-xl border px-4 sm:px-6'
          : 'border-border/40 border-b'
      )}
    >
      <span className='text-muted-foreground pt-1.5 font-mono text-xs'>
        {props.num}
      </span>
      <div>
        <div className='flex flex-wrap items-center gap-3'>
          <span
            className={cn('size-2.5 rounded-full', props.dotClass)}
            aria-hidden='true'
          />
          <h3 className='text-[22px] font-semibold tracking-[-0.02em]'>
            {props.title}
          </h3>
          {props.badge ? (
            <span className='rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-violet-600 dark:text-violet-400'>
              {props.badge}
            </span>
          ) : null}
        </div>
        {props.tagline ? (
          <p className='mt-1 text-[13px] font-medium text-violet-600 dark:text-violet-400'>
            {props.tagline}
          </p>
        ) : null}
        <p className='text-muted-foreground mt-2 max-w-xl text-[15px] leading-relaxed'>
          {props.description}
        </p>
      </div>
    </article>
  )
}

interface ValueCardProps {
  dotClass: string
  title: string
  description: string
}

function ValueCard(props: ValueCardProps) {
  return (
    <div className='border-border/70 bg-card rounded-xl border p-5'>
      <div className='flex items-center gap-2.5'>
        <span
          className={cn('size-2 rounded-full', props.dotClass)}
          aria-hidden='true'
        />
        <h4 className='text-sm font-semibold'>{props.title}</h4>
      </div>
      <p className='text-muted-foreground mt-2 text-[13px] leading-relaxed'>
        {props.description}
      </p>
    </div>
  )
}

export function CapabilityChain() {
  const { t } = useTranslation()

  return (
    <section
      id='capabilities'
      className='border-border/60 scroll-mt-20 border-t'
    >
      <div className='mx-auto max-w-6xl px-6 py-20 md:py-28'>
        <SectionHead
          eyebrow={t('02 / Capability chain')}
          title={t('From one integration to an explainable business chain.')}
          description={t(
            'Not just another dashboard. iFAi folds requests, costs, organizational knowledge and field engineering into a loop that keeps running.'
          )}
        />
        <div>
          <ChainItem
            num='01'
            dotClass='bg-blue-500'
            title={t('Token Access & Cost Optimization')}
            description={t(
              'Plugs into your existing call path and uniformly records token, model, latency and cost attribution — surfacing optimizable models and routing decisions without changing team workflows.'
            )}
          />
          <ChainItem
            num='02'
            dotClass='bg-violet-500'
            highlighted
            badge='EB'
            title={t('Enterprise Brain')}
            tagline={t('EB assists enterprise decisions')}
            description={t(
              'Brings enterprise knowledge within permission boundaries into a searchable, governable reasoning layer. Every citation and every answer carries a traceable context.'
            )}
          />
          <ChainItem
            num='03'
            dotClass='bg-yellow-500'
            title={t('FDE — Frontline Deployment Engineers')}
            description={t(
              'Defines metrics, integrates systems and verifies improvements together with your team, turning AI infrastructure from a procurement item into an operable capability.'
            )}
          />
        </div>

        <div className='mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          <ValueCard
            dotClass='bg-blue-500'
            title={t('Explainable bills')}
            description={t('Every line of a bill maps back to a real call.')}
          />
          <ValueCard
            dotClass='bg-violet-500'
            title={t('Traceable calls')}
            description={t('Every call maps back to its business context.')}
          />
          <ValueCard
            dotClass='bg-yellow-500'
            title={t('Better human efficiency')}
            description={t(
              'Frontline engineering turns infrastructure into an operated capability.'
            )}
          />
          <ValueCard
            dotClass='bg-red-500'
            title={t('Predictable growth')}
            description={t(
              'Governed knowledge compounds into predictable outcomes.'
            )}
          />
        </div>

        <p className='text-muted-foreground mt-10 text-center text-[11px] font-bold tracking-[0.2em] uppercase'>
          {t('Token · Data · Business — connected end to end')}
        </p>
      </div>
    </section>
  )
}
