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

interface StageProps {
  dotClass: string
  title: string
  description: string
}

function Stage(props: StageProps) {
  return (
    <div className='relative'>
      <span
        className={cn(
          'absolute top-0 left-0 size-2.5 rounded-full',
          props.dotClass
        )}
        aria-hidden='true'
      />
      <h4 className='mt-7 text-xl font-semibold tracking-[-0.01em]'>
        {props.title}
      </h4>
      <p className='text-muted-foreground mt-1.5 text-sm leading-relaxed'>
        {props.description}
      </p>
    </div>
  )
}

const MASKED_ROWS = [
  {
    id: 'member-production',
    user: 'member-•••',
    key: 'sk-•••••••',
    tag: 'Summary masked',
  },
  {
    id: 'service-support',
    user: 'service-•••',
    key: 'sk-•••••••',
    tag: 'IP masked',
  },
  {
    id: 'member-search',
    user: 'member-•••',
    key: 'ak-•••••••',
    tag: 'Summary masked',
  },
]

export function AuditTrail() {
  const { t } = useTranslation()
  const headers = [
    t('Calling user'),
    t('API Key'),
    t('Model'),
    t('Tokens'),
    t('Cost'),
    t('Latency'),
    t('Request / response summary or IP'),
  ]
  const tags = [
    t('Sensitive content masked by default'),
    t('Summaries retained for 90 days'),
    t('Traceable within permissions'),
  ]

  return (
    <section id='audit' className='border-border/60 scroll-mt-20 border-t'>
      <div className='mx-auto max-w-6xl px-6 py-20 md:py-28'>
        <SectionHead
          eyebrow={t('03 / Audit trail')}
          title={t('Every call has a path back to the business scene.')}
          description={t(
            'Masked by default. Summaries retained for 90 days. You keep enough context for audit and optimization, without turning sensitive content into a new risk surface.'
          )}
        />

        <div className='md:before:bg-border relative grid gap-10 md:grid-cols-4 md:gap-6 md:before:absolute md:before:top-[5px] md:before:right-[12%] md:before:left-[12%] md:before:h-px'>
          <Stage
            dotClass='bg-blue-500'
            title={t('Call')}
            description={t('Every token call is fully recorded.')}
          />
          <Stage
            dotClass='bg-violet-500'
            title={t('Attribution')}
            description={t(
              'Calling user, API key, model and cost attributed item by item.'
            )}
          />
          <Stage
            dotClass='bg-violet-500'
            title={t('Explainable record')}
            description={t(
              'Request / response summaries and call IP stay traceable.'
            )}
          />
          <Stage
            dotClass='bg-red-500'
            title={t('Auditable bill')}
            description={t(
              'Every token expense carries a clear, auditable basis.'
            )}
          />
        </div>

        <div className='border-foreground/80 mt-14 overflow-hidden rounded-xl border bg-[#15161a] text-[#f5f5f3]'>
          <div className='flex h-11 items-center justify-between border-b border-white/10 px-4 text-xs text-[#b7b8bd]'>
            <span>iFAi / {t('Call audit')}</span>
            <span>{t('Product illustration · masked by default')}</span>
          </div>
          <div className='p-5'>
            <div className='mb-4 font-mono text-xs text-[#a8aab2]'>
              scope=<b className='text-[#f0eee8]'>production</b> &nbsp;trace=
              <b className='text-[#f0eee8]'>enabled</b> &nbsp;retention=
              <b className='text-[#f0eee8]'>90d</b>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[720px] border-collapse text-xs'>
                <thead>
                  <tr className='border-b border-white/10 text-left text-[#92959e]'>
                    {headers.map((header) => (
                      <th key={header} className='pb-3 font-normal'>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MASKED_ROWS.map((row) => (
                    <tr
                      key={row.id}
                      className='border-b border-white/5 last:border-0'
                    >
                      <td className='py-3.5 pr-2'>{row.user}</td>
                      <td className='px-2 py-3.5 text-[#888b93]'>{row.key}</td>
                      <td className='px-2 py-3.5'>{t('Model identifier')}</td>
                      <td className='px-2 py-3.5 tabular-nums'>—</td>
                      <td className='px-2 py-3.5 tabular-nums'>—</td>
                      <td className='px-2 py-3.5 tabular-nums'>—</td>
                      <td className='py-3.5 pl-2'>
                        <span className='rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-[#b7b8bd]'>
                          {t(row.tag)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='mt-5 flex flex-wrap items-center gap-x-3 gap-y-2'>
          {tags.map((tag) => (
            <span
              key={tag}
              className='border-border/70 bg-card text-muted-foreground rounded-lg border px-3 py-1.5 text-xs'
            >
              {tag}
            </span>
          ))}
          <p className='text-muted-foreground/70 ml-auto text-xs'>
            {t('Balancing optimization, audit and data security.')}
          </p>
        </div>
      </div>
    </section>
  )
}
