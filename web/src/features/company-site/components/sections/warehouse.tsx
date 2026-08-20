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
import { ArrowDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

import { SectionHead } from '../section-head'

interface LayerProps {
  dotClass: string
  title: string
  sub?: string
  children?: ReactNode
}

function Layer(props: LayerProps) {
  return (
    <div className='border-border/60 bg-background/60 rounded-lg border px-5 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5'>
        <div className='flex items-center gap-2.5'>
          <span
            className={cn('size-2 rounded-full', props.dotClass)}
            aria-hidden='true'
          />
          <span className='text-sm font-semibold'>{props.title}</span>
        </div>
        {props.sub ? (
          <span className='text-muted-foreground text-xs'>{props.sub}</span>
        ) : null}
      </div>
      {props.children ? <div className='mt-3'>{props.children}</div> : null}
    </div>
  )
}

function LayerArrow() {
  return (
    <div
      aria-hidden='true'
      className='text-muted-foreground flex justify-center py-1'
    >
      <ArrowDown className='size-4' />
    </div>
  )
}

function Chip(props: { children: ReactNode }) {
  return (
    <span className='border-border/60 bg-card text-muted-foreground inline-flex items-center rounded-md border px-2.5 py-1 text-xs'>
      {props.children}
    </span>
  )
}

interface PainCardProps {
  dotClass: string
  title: string
  description: string
}

function PainCard(props: PainCardProps) {
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

export function Warehouse() {
  const { t } = useTranslation()

  return (
    <section id='warehouse' className='border-border/60 scroll-mt-20 border-t'>
      <div className='mx-auto max-w-6xl px-6 py-20 md:py-28'>
        <SectionHead
          eyebrow={t('04 / Data warehouse')}
          title={t('Beyond tokens: a warehouse for business decisions.')}
          description={t(
            'Disconnected systems, broken links and hand-written SQL keep business data from becoming decision power. iFAi lands a layered warehouse, an AI development chain and a decision engine on an open ecosystem.'
          )}
        />

        <div className='grid gap-3 md:grid-cols-3'>
          <PainCard
            dotClass='bg-red-500'
            title={t('System silos')}
            description={t(
              'ERP, MES and CRM each keep their own numbers; metrics never align.'
            )}
          />
          <PainCard
            dotClass='bg-yellow-500'
            title={t('Broken links')}
            description={t('Raw data never reaches management decisions.')}
          />
          <PainCard
            dotClass='bg-blue-500'
            title={t('Manual development')}
            description={t(
              'Warehouse development depends on hand-written SQL; slow and hard to maintain.'
            )}
          />
        </div>

        <div className='border-border/70 bg-card mt-8 rounded-xl border p-5 sm:p-6'>
          <Layer
            dotClass='bg-violet-500'
            title={t('Decision engine')}
            sub={t('Agent + data retrieval + industry logic')}
          >
            <div className='flex flex-wrap gap-2'>
              <Chip>Agent</Chip>
              <Chip>{t('Data retrieval')}</Chip>
              <Chip>{t('Decision logic')}</Chip>
            </div>
          </Layer>
          <LayerArrow />
          <Layer
            dotClass='bg-blue-500'
            title={t('AI development chain')}
            sub={t(
              'Natural language → layered SQL · scheduling DAG · quality checks'
            )}
          >
            <div className='flex flex-wrap gap-2'>
              <Chip>{t('Layered SQL')}</Chip>
              <Chip>{t('Scheduling DAG')}</Chip>
              <Chip>{t('Quality checks')}</Chip>
            </div>
          </Layer>
          <LayerArrow />
          <Layer
            dotClass='bg-teal-500'
            title={t('Layered warehouse')}
            sub='ODS → DWD → DWS → ADS'
          >
            <div className='flex flex-wrap items-center gap-2'>
              {[
                { code: 'ODS', label: t('Raw') },
                { code: 'DWD', label: t('Detail') },
                { code: 'DWS', label: t('Summary') },
                { code: 'ADS', label: t('Application') },
              ].map((stage, index) => (
                <span key={stage.code} className='flex items-center gap-2'>
                  <span className='border-border/60 bg-background rounded-md border px-3 py-1.5 text-xs'>
                    <span className='font-mono font-semibold'>
                      {stage.code}
                    </span>
                    <span className='text-muted-foreground ml-1.5'>
                      {stage.label}
                    </span>
                  </span>
                  {index < 3 ? (
                    <span aria-hidden='true' className='text-muted-foreground'>
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </Layer>
          <LayerArrow />
          <Layer
            dotClass='bg-muted-foreground/60'
            title={t('Business data sources')}
            sub={t('ERP · MES · CRM · DDI · distribution · invoicing')}
          >
            <div className='flex flex-wrap gap-2'>
              {['ERP', 'MES', 'CRM', 'DDI'].map((source) => (
                <Chip key={source}>{source}</Chip>
              ))}
              <Chip>{t('Distribution')}</Chip>
              <Chip>{t('Invoicing')}</Chip>
            </div>
          </Layer>
        </div>

        <div className='mt-5 rounded-xl border border-teal-500/30 bg-teal-500/[0.05] px-5 py-4'>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px]'>
            <span className='font-semibold text-teal-600 dark:text-teal-400'>
              {t('Security crosses every layer')}
            </span>
            <span className='text-muted-foreground'>
              —{' '}
              {t(
                'Table grants · column masking · row-level RLS · AD identity · audit trail'
              )}
            </span>
          </div>
        </div>

        <div className='mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          <ValueCard
            dotClass='bg-blue-500'
            title={t('Searchable data')}
            description={t('Ask in natural language and query across domains.')}
          />
          <ValueCard
            dotClass='bg-violet-500'
            title={t('Automated development')}
            description={t('Warehouse specs become AI-executable workflows.')}
          />
          <ValueCard
            dotClass='bg-teal-500'
            title={t('Controlled quality')}
            description={t('Spoken-language rules keep data quality in check.')}
          />
          <ValueCard
            dotClass='bg-yellow-500'
            title={t('Intelligent decisions')}
            description={t('From data queries to decision recommendations.')}
          />
          <ValueCard
            dotClass='bg-red-500'
            title={t('Extensible ecosystem')}
            description={t('Built on open ecosystems; skills stay reusable.')}
          />
          <ValueCard
            dotClass='bg-emerald-500'
            title={t('Defense-in-depth security')}
            description={t('Database-enforced table, column and row controls.')}
          />
        </div>
      </div>
    </section>
  )
}
