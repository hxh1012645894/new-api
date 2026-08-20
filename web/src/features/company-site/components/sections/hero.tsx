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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'

interface TraceNodeProps {
  className: string
  dotClass: string
  labelClass: string
  label: string
  ping?: boolean
}

function TraceNode(props: TraceNodeProps) {
  return (
    <>
      <span className={cn('absolute z-20', props.className)}>
        {props.ping ? (
          <span className='relative flex size-2.5'>
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-50',
                props.dotClass
              )}
            />
            <span
              className={cn(
                'relative inline-flex size-2.5 rounded-full',
                props.dotClass
              )}
            />
          </span>
        ) : (
          <span className={cn('block size-2.5 rounded-full', props.dotClass)} />
        )}
      </span>
      <span
        className={cn(
          'text-muted-foreground absolute z-20 text-[11px] tracking-[0.04em]',
          props.labelClass
        )}
      >
        {props.label}
      </span>
    </>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user

  return (
    <section id='top' className='relative overflow-hidden'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-15'
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 18% 18%, oklch(0.72 0.18 250 / 70%) 0%, transparent 70%)',
            'radial-gradient(ellipse 45% 38% at 82% 20%, oklch(0.68 0.16 200 / 50%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 35% at 45% 85%, oklch(0.72 0.13 285 / 40%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-32 pb-20 md:pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16'>
        <div>
          <div className='landing-animate-fade-up inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-[11px] font-medium text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/5 dark:text-blue-400'>
            <span className='relative flex size-1.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75' />
              <span className='relative inline-flex size-1.5 rounded-full bg-blue-500 dark:bg-blue-400' />
            </span>
            <span>iFAi / {t('Enterprise AI Infrastructure')}</span>
          </div>
          <h1
            className='landing-animate-fade-up mt-6 text-[clamp(3rem,6vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.06em]'
            style={{ animationDelay: '60ms' }}
          >
            Every Token
            <br />
            <em className='text-muted-foreground not-italic'>Counts.</em>
          </h1>
          <p
            className='landing-animate-fade-up text-muted-foreground mt-6 max-w-[470px] text-[17px] leading-relaxed'
            style={{ animationDelay: '130ms' }}
          >
            {t('Make every token call explainable. Make every bill auditable.')}
          </p>
          <p
            className='landing-animate-fade-up text-muted-foreground/80 mt-3 max-w-md text-sm leading-relaxed'
            style={{ animationDelay: '160ms' }}
          >
            {t(
              'Controllable, auditable, optimizable AI infrastructure for technical teams of 10–100 people.'
            )}
          </p>
          <div
            className='landing-animate-fade-up mt-9 flex flex-wrap items-center gap-3'
            style={{ animationDelay: '210ms' }}
          >
            <Button
              className='h-11 rounded-lg px-6 text-sm font-medium'
              render={<a href='#fde' />}
            >
              {t('Book FDE')}
            </Button>
            <Button
              variant='outline'
              className='border-border/60 h-11 rounded-lg px-6 text-sm font-medium'
              render={<Link to={isAuthenticated ? '/dashboard' : '/sign-in'} />}
            >
              {t('Open Console')}
            </Button>
          </div>
        </div>

        <div
          className='landing-animate-fade-up mx-auto w-full max-w-[440px]'
          style={{ animationDelay: '260ms' }}
        >
          <div
            className='border-border/70 bg-card relative aspect-square w-full rounded-2xl border'
            role='img'
            aria-label={t('Token audit loop illustration')}
          >
            <div
              aria-hidden='true'
              className='border-border/60 absolute inset-[14%] rounded-full border'
            />
            <div
              aria-hidden='true'
              className='border-border/60 absolute inset-[28%] rounded-full border'
            />
            <div className='border-foreground/70 bg-card absolute inset-[40%] z-10 grid place-items-center rounded-full border'>
              <span className='text-muted-foreground text-center font-mono text-[10px] leading-[1.6] tracking-[0.08em]'>
                TOKEN
                <br />
                TRACE
              </span>
            </div>
            <TraceNode
              className='top-[8%] left-1/2 -translate-x-1/2'
              dotClass='bg-blue-500'
              labelClass='top-[15%] left-[54%]'
              label={t('Call')}
              ping
            />
            <TraceNode
              className='top-1/2 right-[7%] -translate-y-1/2'
              dotClass='bg-violet-500'
              labelClass='top-[58%] right-[3%]'
              label={t('Attribution')}
            />
            <TraceNode
              className='bottom-[8%] left-1/2 -translate-x-1/2'
              dotClass='bg-yellow-500'
              labelClass='bottom-[15%] left-[54%]'
              label={t('Bill')}
            />
            <TraceNode
              className='top-1/2 left-[7%] -translate-y-1/2'
              dotClass='bg-red-500'
              labelClass='top-[58%] left-[3%]'
              label={t('Optimize')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
