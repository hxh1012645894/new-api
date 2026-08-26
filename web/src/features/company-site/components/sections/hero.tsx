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
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

import { HeroAuthCard } from '../hero-auth-card'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section id='top' className='relative overflow-hidden'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20'
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 15% 20%, oklch(0.72 0.18 250 / 70%) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 85% 25%, oklch(0.68 0.16 290 / 55%) 0%, transparent 70%)',
            'radial-gradient(ellipse 45% 35% at 50% 85%, oklch(0.72 0.13 285 / 40%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 md:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14'>
        <div>
          <div className='landing-animate-fade-up inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-[11px] font-medium text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/5 dark:text-blue-400'>
            <span className='relative flex size-1.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75' />
              <span className='relative inline-flex size-1.5 rounded-full bg-blue-500 dark:bg-blue-400' />
            </span>
            <span>iFAi · {t('Enterprise AI Infrastructure')}</span>
          </div>

          <h1
            className='landing-animate-fade-up mt-6 text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.08] font-bold tracking-tight'
            style={{ animationDelay: '60ms' }}
          >
            {t('Every Token')}
            <br />
            <em className='text-muted-foreground not-italic'>{t('Counts.')}</em>
          </h1>

          <p
            className='landing-animate-fade-up text-muted-foreground mt-6 max-w-[490px] text-[17px] leading-relaxed'
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
            className='landing-animate-fade-up mt-8 flex flex-wrap items-center gap-3'
            style={{ animationDelay: '200ms' }}
          >
            <Button
              className='h-11 rounded-xl px-7 text-sm font-medium shadow-md shadow-blue-500/20'
              render={<a href='#fde' />}
            >
              <span>{t('Book FDE')}</span>
              <ArrowRight className='size-4' />
            </Button>
          </div>

          <div
            className='landing-animate-fade-up border-border/60 text-muted-foreground mt-10 grid grid-cols-3 gap-3 border-t pt-6 text-xs'
            style={{ animationDelay: '240ms' }}
          >
            <div className='flex items-center gap-1.5'>
              <CheckCircle2 className='size-4 text-blue-500' />
              <span>{t('Traceable per call')}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <ShieldCheck className='size-4 text-violet-500' />
              <span>{t('Enterprise security')}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Zap className='size-4 text-yellow-500' />
              <span>{t('Unified gateway')}</span>
            </div>
          </div>
        </div>

        <div
          id='hero-auth'
          className='landing-animate-fade-up w-full scroll-mt-24'
          style={{ animationDelay: '280ms' }}
        >
          <HeroAuthCard />
        </div>
      </div>
    </section>
  )
}
