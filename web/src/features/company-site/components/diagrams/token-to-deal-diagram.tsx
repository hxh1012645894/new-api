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
import {
  ArrowRight,
  Cpu,
  Database,
  Flame,
  Layers,
  LineChart,
  ShieldAlert,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'

export function TokenToDealDiagram() {
  const { t } = useTranslation()

  const pipelines = [
    {
      title: t('Flow Deviation Analysis'),
      desc: t('Deviation >15% trigger'),
      icon: LineChart,
      color:
        'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/30',
    },
    {
      title: t('Cost Budget Alert'),
      desc: t('Over 90% budget warning'),
      icon: ShieldAlert,
      color:
        'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      title: t('Milestone Progress'),
      desc: t('Key stage achievement rate'),
      icon: Layers,
      color:
        'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      title: t('Competitor Impact'),
      desc: t('Market share drop alert'),
      icon: Flame,
      color:
        'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
  ]

  return (
    <div className='border-border/70 bg-card rounded-2xl border p-6 shadow-xs sm:p-8'>
      {/* 3-Step Horizontal Process */}
      <div className='grid items-center gap-4 lg:grid-cols-[1fr_auto_1.6fr_auto_1fr]'>
        {/* Step 1: Token Sources */}
        <div className='border-border/60 bg-muted/30 space-y-3 rounded-xl border p-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Database className='size-4 text-blue-500' />
              <span className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
                {t('Token Sources')}
              </span>
            </div>
            <Badge variant='outline' className='text-[10px]'>
              01
            </Badge>
          </div>
          <div className='text-muted-foreground space-y-1.5 text-xs'>
            <div className='bg-card/80 border-border/50 flex items-center justify-between rounded-lg border px-2.5 py-1.5'>
              <span>DDI · CRM · ERP</span>
              <span className='text-[10px] font-medium text-blue-500'>
                {t('Query')}
              </span>
            </div>
            <div className='bg-card/80 border-border/50 flex items-center justify-between rounded-lg border px-2.5 py-1.5'>
              <span>LLM · Agent Chains</span>
              <span className='text-[10px] font-medium text-purple-500'>
                {t('Reasoning')}
              </span>
            </div>
            <div className='bg-card/80 border-border/50 flex items-center justify-between rounded-lg border px-2.5 py-1.5'>
              <span>Rule Engine · Thresholds</span>
              <span className='text-[10px] font-medium text-teal-500'>
                {t('Verification')}
              </span>
            </div>
          </div>
        </div>

        <ArrowRight className='text-muted-foreground/40 hidden size-4 shrink-0 lg:block' />

        {/* Step 2: 4 Decision Pipelines */}
        <div className='border-border/60 bg-muted/30 space-y-3 rounded-xl border p-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Cpu className='size-4 text-teal-500' />
              <span className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
                {t('Decision Pipelines')}
              </span>
            </div>
            <Badge variant='outline' className='text-[10px]'>
              02
            </Badge>
          </div>
          <div className='grid gap-2 sm:grid-cols-2'>
            {pipelines.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.title}
                  className={`rounded-lg border p-2.5 transition-all ${p.color}`}
                >
                  <div className='flex items-center gap-2'>
                    <Icon className='size-3.5 shrink-0' />
                    <span className='truncate text-xs font-semibold'>
                      {p.title}
                    </span>
                  </div>
                  <div className='mt-1 truncate pl-5.5 text-[10px] opacity-80'>
                    {p.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <ArrowRight className='text-muted-foreground/40 hidden size-4 shrink-0 lg:block' />

        {/* Step 3: Deal Outcome */}
        <div className='flex flex-col items-center justify-center space-y-2.5 rounded-xl border border-amber-500/40 bg-amber-500/[0.06] p-5 text-center shadow-xs'>
          <Badge
            variant='outline'
            className='border-amber-500/50 text-[10px] text-amber-600 dark:text-amber-400'
          >
            {t('03 · Closed Loop')}
          </Badge>
          <div className='text-xl font-bold tracking-tight text-amber-600 sm:text-2xl dark:text-amber-400'>
            {t('Commercial Deal')}
          </div>
          <p className='text-foreground text-xs font-semibold'>
            {t('Closed Loop: Next Commercial Deal')}
          </p>
          <p className='text-muted-foreground text-[11px] leading-snug'>
            {t(
              'Every token spent triggers anomaly detection, precision cost controls and customer milestone tracking, closing the loop directly into commercial revenue.'
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
