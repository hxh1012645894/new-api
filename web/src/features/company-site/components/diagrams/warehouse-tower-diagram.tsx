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
  ArrowUp,
  CheckCircle2,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WarehouseTier {
  code: 'ADS' | 'DWS' | 'DWD' | 'ODS'
  name: string
  shortLabel: string
  tag: string
  desc: string
  aiValue: string
  features: string[]
  borderClass: string
  bgClass: string
  activeBorderClass: string
  activeBgClass: string
  badgeClass: string
  dotClass: string
  textClass: string
}

export function WarehouseTowerDiagram() {
  const { t } = useTranslation()
  const [selectedTier, setSelectedTier] = useState<
    'ALL' | 'ADS' | 'DWS' | 'DWD' | 'ODS'
  >('ALL')
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  const tiers: WarehouseTier[] = [
    {
      code: 'ADS',
      name: t('Application Data Service'),
      shortLabel: t('ADS Layer'),
      tag: t('BI Dashboards · Decision Support · Alerts'),
      desc: t(
        'Serving direct decision scenarios: flow deviations >15% trigger alerts, budget >90% warnings delivered straight to executives.'
      ),
      aiValue: t('AI Decision & Alert Direct Delivery'),
      features: [
        t('Decision Dashboards'),
        t('Anomaly Alerts'),
        t('Budget Control'),
        t('Executive Overview'),
      ],
      borderClass: 'border-orange-500/30 dark:border-orange-500/30',
      bgClass: 'bg-orange-500/[0.02] hover:bg-orange-500/[0.05]',
      activeBorderClass:
        'border-orange-500 ring-2 ring-orange-500/20 dark:ring-orange-500/30',
      activeBgClass: 'bg-orange-500/[0.08]',
      badgeClass:
        'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
      dotClass: 'bg-orange-500',
      textClass: 'text-orange-600 dark:text-orange-400',
    },
    {
      code: 'DWS',
      name: t('Data Warehouse Service'),
      shortLabel: t('DWS Layer'),
      tag: t('Wide Tables · Metric Pre-aggregation'),
      desc: t(
        'Domain-level wide tables and metric pre-aggregations ready for AI direct query without rescanning raw rows.'
      ),
      aiValue: t('Millisecond Metric Pre-aggregation'),
      features: [
        t('Wide Topic Tables'),
        t('Metric Aggregation'),
        t('Sub-second Response'),
        t('AI Query Acceleration'),
      ],
      borderClass: 'border-teal-500/30 dark:border-teal-500/30',
      bgClass: 'bg-teal-500/[0.02] hover:bg-teal-500/[0.05]',
      activeBorderClass:
        'border-teal-500 ring-2 ring-teal-500/20 dark:ring-teal-500/30',
      activeBgClass: 'bg-teal-500/[0.08]',
      badgeClass:
        'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
      dotClass: 'bg-teal-500',
      textClass: 'text-teal-600 dark:text-teal-400',
    },
    {
      code: 'DWD',
      name: t('Data Warehouse Detail'),
      shortLabel: t('DWD Layer'),
      tag: t('8 Business Domains · Dimension Unified'),
      desc: t(
        'Partitioned by business entity rather than system: unifying customer dimensions, product codes and org hierarchies across CRM and ERP.'
      ),
      aiValue: t('Unified Cross-system Entity Dimensions'),
      features: [
        t('Entity Modeling'),
        t('Primary Key Unification'),
        t('Multi-source Alignment'),
        t('Standard Dimensions'),
      ],
      borderClass: 'border-purple-500/30 dark:border-purple-500/30',
      bgClass: 'bg-purple-500/[0.02] hover:bg-purple-500/[0.05]',
      activeBorderClass:
        'border-purple-500 ring-2 ring-purple-500/20 dark:ring-purple-500/30',
      activeBgClass: 'bg-purple-500/[0.08]',
      badgeClass:
        'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      dotClass: 'bg-purple-500',
      textClass: 'text-purple-600 dark:text-purple-400',
    },
    {
      code: 'ODS',
      name: t('Operational Data Store'),
      shortLabel: t('ODS Layer'),
      tag: t('Raw Ingestion · Exact Landing'),
      desc: t(
        'CRM, ERP, DDI, MES and business systems are ingested into raw storage with fidelity preserved.'
      ),
      aiValue: t('High-fidelity Raw Ingestion'),
      features: [
        t('Real-time Ingestion'),
        t('Fidelity Preservation'),
        t('Source Table Mirroring'),
        t('Full Audit Trail'),
      ],
      borderClass: 'border-blue-500/30 dark:border-blue-500/30',
      bgClass: 'bg-blue-500/[0.02] hover:bg-blue-500/[0.05]',
      activeBorderClass:
        'border-blue-500 ring-2 ring-blue-500/20 dark:ring-blue-500/30',
      activeBgClass: 'bg-blue-500/[0.08]',
      badgeClass:
        'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      dotClass: 'bg-blue-500',
      textClass: 'text-blue-600 dark:text-blue-400',
    },
  ]

  const activeCode =
    hoveredTier || (selectedTier !== 'ALL' ? selectedTier : null)

  return (
    <div className='border-border/70 bg-card space-y-6 rounded-2xl border p-5 shadow-xs sm:p-7'>
      {/* Top Header & Filter Guidance Tabs */}
      <div className='border-border/50 flex flex-wrap items-center justify-between gap-3 border-b pb-4'>
        <div className='flex items-center gap-2'>
          <Database className='text-primary size-4' />
          <span className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
            {t('Data Warehouse Four-tier Precision Stack')}
          </span>
        </div>

        {/* Quick Tier Focus Tabs */}
        <div className='bg-muted/60 flex flex-wrap items-center gap-1 rounded-lg p-1'>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => setSelectedTier('ALL')}
            className={cn(
              'h-7 px-2.5 text-xs font-medium rounded-md transition-all',
              selectedTier === 'ALL'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t('All Tiers')}
          </Button>
          {tiers.map((tItem) => {
            const isSelected = selectedTier === tItem.code
            return (
              <Button
                key={tItem.code}
                size='sm'
                variant='ghost'
                onClick={() => setSelectedTier(isSelected ? 'ALL' : tItem.code)}
                className={cn(
                  'h-7 px-2.5 text-xs font-medium rounded-md transition-all gap-1.5',
                  isSelected
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className={cn('size-1.5 rounded-full', tItem.dotClass)} />
                <span>{tItem.code}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* 4 Interactive Tier Cards Stack */}
      <div className='space-y-3.5'>
        {tiers.map((tItem, index) => {
          const isFocused = activeCode === tItem.code
          const isDimmed = activeCode !== null && !isFocused

          return (
            <div key={tItem.code} className='relative'>
              {/* Upward flow indicator between tiers */}
              {index > 0 && (
                <div className='text-muted-foreground/60 my-1 flex items-center justify-center gap-1.5 text-[10px]'>
                  <ArrowUp
                    className={cn(
                      'size-3 transition-colors',
                      isFocused ? tItem.textClass : 'text-muted-foreground/40'
                    )}
                  />
                  <span className='font-mono text-[10px]'>
                    {index === 1 && 'DWS → ADS (BI & Alerts)'}
                    {index === 2 && 'DWD → DWS (Topic Aggregation)'}
                    {index === 3 && 'ODS → DWD (Entity Modeling)'}
                  </span>
                </div>
              )}

              <div
                role='button'
                tabIndex={0}
                onMouseEnter={() => setHoveredTier(tItem.code)}
                onMouseLeave={() => setHoveredTier(null)}
                onClick={() =>
                  setSelectedTier((curr) =>
                    curr === tItem.code ? 'ALL' : tItem.code
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedTier((curr) =>
                      curr === tItem.code ? 'ALL' : tItem.code
                    )
                  }
                }}
                className={cn(
                  'rounded-xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer text-left',
                  isDimmed
                    ? 'opacity-40 scale-[0.99]'
                    : 'opacity-100 scale-100',
                  isFocused
                    ? `${tItem.activeBorderClass} ${tItem.activeBgClass} shadow-md`
                    : `${tItem.borderClass} ${tItem.bgClass}`
                )}
              >
                {/* Tier Top Line */}
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <div className='flex items-center gap-2.5'>
                    <span
                      className={cn('size-2 rounded-full', tItem.dotClass)}
                    />
                    <span
                      className={cn(
                        'font-mono text-xs font-bold rounded-md px-2 py-0.5 border transition-colors',
                        tItem.badgeClass
                      )}
                    >
                      {tItem.code}
                    </span>
                    <h4 className='text-foreground text-sm font-semibold'>
                      {tItem.name}
                    </h4>
                  </div>
                  <span className='text-muted-foreground font-mono text-xs'>
                    {tItem.tag}
                  </span>
                </div>

                {/* Description */}
                <p className='text-muted-foreground mt-2 text-xs leading-relaxed'>
                  {tItem.desc}
                </p>

                {/* Interactive Highlight Guidance Drawer (Expanded / Highlighted State) */}
                <div
                  className={cn(
                    'mt-3 pt-3 border-t border-border/40 grid gap-2 sm:grid-cols-2 items-center text-xs transition-all',
                    isFocused ? 'opacity-100' : 'opacity-70'
                  )}
                >
                  <div className='flex items-center gap-1.5 font-medium'>
                    <Sparkles
                      className={cn('size-3.5 shrink-0', tItem.textClass)}
                    />
                    <span className='text-muted-foreground text-[11px]'>
                      {t('Core AI Value')}:
                    </span>
                    <span
                      className={cn('font-semibold text-xs', tItem.textClass)}
                    >
                      {tItem.aiValue}
                    </span>
                  </div>

                  <div className='flex flex-wrap items-center gap-1.5 sm:justify-end'>
                    {tItem.features.map((feat) => (
                      <span
                        key={feat}
                        className='bg-background/80 text-muted-foreground border-border/50 inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium'
                      >
                        <CheckCircle2 className='size-2.5 text-teal-500' />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Clean Security Baseline Footer */}
      <div className='border-border/60 text-muted-foreground flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs'>
        <div className='flex items-center gap-2 font-medium text-teal-600 dark:text-teal-400'>
          <ShieldCheck className='size-4' />
          <span>{t('Security crosses every layer')}</span>
        </div>
        <div className='text-muted-foreground/80 text-[11px]'>
          {t(
            'Table grants · Column masking · Row-level RLS · AD identity · Audit trail'
          )}
        </div>
      </div>
    </div>
  )
}
