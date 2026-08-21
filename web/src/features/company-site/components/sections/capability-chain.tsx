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

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { SectionHead } from '../section-head'

interface ChainItemProps {
  num: string
  dotClass: string
  title: string
  badge?: string
  tagline?: string
  description: string
  chips?: string[]
}

function ChainItem(props: ChainItemProps) {
  return (
    <article className='border-border/70 bg-card flex h-full flex-col rounded-xl border p-5 sm:p-6'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-wrap items-center gap-3'>
          <span
            className={cn('size-2.5 rounded-full', props.dotClass)}
            aria-hidden='true'
          />
          <h3 className='text-[22px] font-semibold tracking-[-0.02em]'>
            {props.title}
          </h3>
          {props.badge ? (
            <Badge variant='secondary'>{props.badge}</Badge>
          ) : null}
        </div>
        <span className='text-muted-foreground pt-1 font-mono text-xs'>
          {props.num}
        </span>
      </div>
      {props.tagline ? (
        <p className='text-primary mt-2 text-[13px] font-medium'>
          {props.tagline}
        </p>
      ) : null}
      <p className='text-muted-foreground mt-3 flex-1 text-[15px] leading-relaxed'>
        {props.description}
      </p>
      {props.chips ? (
        <div className='mt-5 flex flex-wrap gap-2'>
          {props.chips.map((chip) => (
            <Badge key={chip} variant='outline'>
              {chip}
            </Badge>
          ))}
        </div>
      ) : null}
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
          title={t('Three businesses, one path from tokens to outcomes.')}
          description={t(
            'iFAi supplies the tokens, builds the enterprise decision brain, and sends engineers into the field to turn real business problems into working AI.'
          )}
        />
        <div className='grid gap-4 lg:grid-cols-3'>
          <ChainItem
            num='01'
            dotClass='bg-blue-500'
            title={t('Token Supply')}
            tagline={t(
              'Buy tokens with governed access and transparent billing'
            )}
            description={t(
              'Buy and govern tokens for mainstream models through one gateway. Official-list input, output and cache-hit prices stay visible while actual discounts and every deduction remain traceable.'
            )}
            chips={[
              t('Usage-based token purchase'),
              t('Unified model access'),
              t('Model routing'),
              t('Cost optimization'),
            ]}
          />
          <ChainItem
            num='02'
            dotClass='bg-violet-500'
            badge='EB'
            title={t('Enterprise Brain')}
            tagline={t('Turn company data into AI decision infrastructure')}
            description={t(
              'Rapidly turn scattered ERP, MES, CRM and operational data into a layered, permission-aware warehouse that AI can retrieve and use for evidence-backed decisions.'
            )}
            chips={[
              t('AI-ready data warehouse'),
              'ODS · DWD · DWS · ADS',
              t('Evidence-backed decisions'),
            ]}
          />
          <ChainItem
            num='03'
            dotClass='bg-yellow-500'
            title={t('FDE — Forward Deployed Engineers')}
            tagline={t('Bring a business problem; leave with working AI')}
            description={t(
              'Forward Deployed Engineers work beside your team to frame the bottleneck, design the AI solution, ship it into the real workflow and verify the business result quickly.'
            )}
            chips={[
              t('Onboarding & training'),
              t('Agent customization & delivery'),
              t('Workflow reinvention'),
            ]}
          />
        </div>

        <div className='border-border/70 bg-card mt-10 rounded-xl border px-5 py-4'>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
            <span className='text-muted-foreground text-xs font-medium'>
              {t('Unified access to mainstream models')}
            </span>
            <span className='bg-border/40 h-4 w-px' aria-hidden='true' />
            {['Claude', 'GPT', 'Gemini', 'Qwen', 'GLM', 'KIMI', 'Seedance'].map(
              (model) => (
                <span
                  key={model}
                  className='border-border/60 bg-background rounded-md border px-2.5 py-1 text-xs font-medium'
                >
                  {model}
                </span>
              )
            )}
            <span className='text-muted-foreground/70 text-xs'>
              {t('More models joining')}
            </span>
          </div>
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
