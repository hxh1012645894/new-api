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
  ArrowDown,
  ArrowUp,
  Boxes,
  Cpu,
  Layers,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ArchitectureModule {
  id: string
  name: string
  sub: string
}

interface ArchitectureLayer {
  id: 'L3' | 'L2' | 'L1'
  code: string
  levelTag: string
  name: string
  role: string
  tagline: string
  description: string
  color: string
  borderClass: string
  bgClass: string
  activeBorderClass: string
  activeBgClass: string
  glowClass: string
  textClass: string
  badgeClass: string
  icon: typeof Cpu
  widthClass: string
  modules: ArchitectureModule[]
  deps: { dir: 'up' | 'down'; text: string }[]
  facts: string[]
}

export function BusinessPyramidDiagram() {
  const { t } = useTranslation()
  const [selectedLayerId, setSelectedLayerId] = useState<
    'L1' | 'L2' | 'L3' | 'ALL'
  >('ALL')
  const [activeLayerId, setActiveLayerId] = useState<'L1' | 'L2' | 'L3'>('L3')

  const layers: ArchitectureLayer[] = [
    {
      id: 'L3',
      code: '03',
      levelTag: t('Top Tier'),
      name: t('FDE — Forward Deployed Engineers'),
      role: t('Customer Facing'),
      tagline: t('Bring a business problem; leave with working AI'),
      description: t(
        'The last mile facing customers, turning enterprise brain capabilities into real commercial efficiency and business results.'
      ),
      color: '#f2cf4e',
      borderClass: 'border-amber-500/30 dark:border-amber-500/30',
      bgClass: 'bg-amber-500/[0.02] hover:bg-amber-500/[0.05]',
      activeBorderClass:
        'border-amber-500 ring-2 ring-amber-500/20 dark:ring-amber-500/30',
      activeBgClass: 'bg-amber-500/[0.08]',
      glowClass: 'bg-amber-500',
      textClass: 'text-amber-600 dark:text-amber-400',
      badgeClass:
        'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: Users,
      widthClass: 'max-w-xl',
      modules: [
        {
          id: 'm-deploy',
          name: t('On-site Deployment'),
          sub: t('Landing & integration in customer environments'),
        },
        {
          id: 'm-diag',
          name: t('Scenario Diagnosis'),
          sub: t('Business bottleneck diagnosis & solution design'),
        },
        {
          id: 'm-ops',
          name: t('Delivery & Operations'),
          sub: t('Production accompanying & continuous tuning'),
        },
        {
          id: 'm-metrics',
          name: t('Outcome Measurement'),
          sub: t('Quantifying efficiency & business results'),
        },
      ],
      deps: [
        {
          dir: 'down',
          text: t(
            'Calls L2 Enterprise Brain capabilities downward for delivery'
          ),
        },
        {
          dir: 'up',
          text: t(
            'Distills frontline experience upward to feed back into brain evolution'
          ),
        },
      ],
      facts: [
        t('24-hour response'),
        t('Full FDE lifecycle tracking'),
        t('Dedicated appointment service'),
      ],
    },
    {
      id: 'L2',
      code: '02',
      levelTag: t('Middle Tier'),
      name: t('Enterprise Brain'),
      role: t('Intelligence Hub'),
      tagline: t('Turn company data into AI decision infrastructure'),
      description: t(
        'Enterprise intelligence hub understanding business logic, orchestrating digital workers, and managing complex AI workflows.'
      ),
      color: '#a37bff',
      borderClass: 'border-purple-500/30 dark:border-purple-500/30',
      bgClass: 'bg-purple-500/[0.02] hover:bg-purple-500/[0.05]',
      activeBorderClass:
        'border-purple-500 ring-2 ring-purple-500/20 dark:ring-purple-500/30',
      activeBgClass: 'bg-purple-500/[0.08]',
      glowClass: 'bg-purple-500',
      textClass: 'text-purple-600 dark:text-purple-400',
      badgeClass:
        'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      icon: Workflow,
      widthClass: 'max-w-2xl',
      modules: [
        {
          id: 'm-logic',
          name: t('Business Logic Understanding'),
          sub: t('Translates business rules into actionable intents'),
        },
        {
          id: 'm-agents',
          name: t('Digital Worker Dispatch'),
          sub: t('Orchestrates multi-agent collaboration by scenario'),
        },
        {
          id: 'm-workflow',
          name: t('Workflow Management'),
          sub: t('Builds and monitors complex AI workflows'),
        },
        {
          id: 'm-knowledge',
          name: t('Knowledge Hub'),
          sub: t('Enterprise knowledge accumulation & retrieval'),
        },
      ],
      deps: [
        {
          dir: 'down',
          text: t(
            'Relies on L1 compute base downward to dispatch models at optimal cost'
          ),
        },
        {
          dir: 'up',
          text: t(
            'Supports L3 frontline delivery upward with reusable capabilities'
          ),
        },
      ],
      facts: [
        t('Business intent understanding'),
        t('Digital workforce'),
        t('Workflow orchestration'),
        t('Enterprise data warehouse'),
      ],
    },
    {
      id: 'L1',
      code: '01',
      levelTag: t('Base Tier'),
      name: t('Token Supply & Cost Optimization'),
      role: t('Technical Foundation'),
      tagline: t('Buy tokens with governed access and transparent billing'),
      description: t(
        'Build a solid technical foundation, meter compute costs precisely, and ensure every drop of fuel burns efficiently.'
      ),
      color: '#4d8dff',
      borderClass: 'border-blue-500/30 dark:border-blue-500/30',
      bgClass: 'bg-blue-500/[0.02] hover:bg-blue-500/[0.05]',
      activeBorderClass:
        'border-blue-500 ring-2 ring-blue-500/20 dark:ring-blue-500/30',
      activeBgClass: 'bg-blue-500/[0.08]',
      glowClass: 'bg-blue-500',
      textClass: 'text-blue-600 dark:text-blue-400',
      badgeClass:
        'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      icon: Cpu,
      widthClass: 'max-w-full',
      modules: [
        {
          id: 'm-gateway',
          name: t('Unified Model Gateway'),
          sub: t('Multi-model unified access and routing'),
        },
        {
          id: 'm-audit',
          name: t('Token Audit Trail'),
          sub: t('Every call traceable and reconcilable'),
        },
        {
          id: 'm-cost',
          name: t('Cost Actuarial'),
          sub: t('Token-level billing and budget control'),
        },
        {
          id: 'm-dispatch',
          name: t('Dispatch Optimization'),
          sub: t('Request tiering and compute orchestration'),
        },
      ],
      deps: [
        {
          dir: 'up',
          text: t(
            'Supplies compute and model channels upward for L2 intelligent dispatch'
          ),
        },
        {
          dir: 'down',
          text: t('Receives frontline usage and cost demands downward from L3'),
        },
      ],
      facts: [
        t('Calling user'),
        t('API Key'),
        t('Model'),
        t('Tokens'),
        t('Cost'),
        t('Latency'),
        t('IP Address'),
      ],
    },
  ]

  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[0]

  const handleSelectLayer = (id: 'L1' | 'L2' | 'L3' | 'ALL') => {
    setSelectedLayerId(id)
    if (id !== 'ALL') {
      setActiveLayerId(id)
    }
  }

  return (
    <div className='border-border/60 bg-card/60 relative overflow-hidden rounded-2xl border p-5 shadow-xs backdrop-blur-md sm:p-7'>
      {/* Top Controls Header */}
      <div className='border-border/50 flex flex-wrap items-center justify-between gap-3 border-b pb-4'>
        <div className='flex items-center gap-2'>
          <span className='size-2 animate-pulse rounded-full bg-blue-500' />
          <span className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
            {t('Three-tier Precision Stack Architecture')}
          </span>
        </div>

        {/* Filter Navigation Tabs */}
        <div className='bg-muted/60 flex flex-wrap items-center gap-1.5 rounded-lg p-1'>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => handleSelectLayer('ALL')}
            className={cn(
              'h-7 px-2.5 text-xs font-medium rounded-md transition-all',
              selectedLayerId === 'ALL'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t('Overview')}
          </Button>
          {layers.map((layer) => {
            const isSelected = selectedLayerId === layer.id
            return (
              <Button
                key={layer.id}
                size='sm'
                variant='ghost'
                onClick={() => handleSelectLayer(layer.id)}
                className={cn(
                  'h-7 px-2.5 text-xs font-medium rounded-md transition-all gap-1.5',
                  isSelected
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span
                  className={cn('size-1.5 rounded-full', layer.glowClass)}
                />
                <span>{layer.levelTag}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className='mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12'>
        {/* Left Column: Visual 3D Pyramid Stack Structure (7 cols) */}
        <div className='relative space-y-3.5 lg:col-span-7'>
          {layers.map((layer, index) => {
            const isHighlighted =
              selectedLayerId === 'ALL' || selectedLayerId === layer.id
            const isActive = activeLayerId === layer.id
            const LayerIcon = layer.icon

            return (
              <div key={layer.id} className='relative'>
                {/* Upward/Downward flow indicators between layers */}
                {index > 0 && (
                  <div className='text-muted-foreground/70 my-1.5 flex items-center justify-center gap-2 text-[10px]'>
                    <ArrowUp className='size-3 text-purple-500/70' />
                    <span>
                      {index === 1
                        ? t(
                            'Upward capability delivery ↑ / Downward experience feedback ↓'
                          )
                        : t(
                            'Upward compute supply ↑ / Downward demand routing ↓'
                          )}
                    </span>
                    <ArrowDown className='size-3 text-amber-500/70' />
                  </div>
                )}

                <div
                  role='button'
                  tabIndex={0}
                  onClick={() => {
                    setActiveLayerId(layer.id)
                    setSelectedLayerId(layer.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveLayerId(layer.id)
                      setSelectedLayerId(layer.id)
                    }
                  }}
                  className={cn(
                    'relative rounded-xl border p-4 sm:p-5 transition-all duration-300 mx-auto w-full cursor-pointer text-left',
                    layer.widthClass,
                    isHighlighted ? 'opacity-100' : 'opacity-35',
                    isActive
                      ? `${layer.activeBorderClass} ${layer.activeBgClass} shadow-md`
                      : `${layer.borderClass} ${layer.bgClass}`
                  )}
                >
                  {/* Layer Header */}
                  <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center gap-2.5'>
                      <div
                        className={cn(
                          'size-7 rounded-lg flex items-center justify-center border',
                          layer.badgeClass
                        )}
                      >
                        <LayerIcon className='size-3.5' />
                      </div>
                      <div>
                        <div className='flex items-center gap-2'>
                          <h4 className='text-foreground text-sm font-bold sm:text-base'>
                            {layer.name}
                          </h4>
                          <span
                            className={cn(
                              'text-xs font-semibold px-2 py-0.5 rounded-md border',
                              layer.badgeClass
                            )}
                          >
                            {layer.levelTag}
                          </span>
                        </div>
                        <p
                          className={cn(
                            'text-xs font-medium mt-0.5',
                            layer.textClass
                          )}
                        >
                          {layer.tagline}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <span className='text-muted-foreground/70 text-xs font-semibold'>
                        {layer.role}
                      </span>
                    </div>
                  </div>

                  {/* 4 Precision Module Nodes Grid */}
                  <div className='border-border/40 mt-3.5 grid grid-cols-2 gap-2 border-t pt-3'>
                    {layer.modules.map((mod) => (
                      <div
                        key={mod.id}
                        className='border-border/50 bg-background/60 hover:bg-background flex items-start gap-2 rounded-lg border p-2 text-xs transition-colors'
                      >
                        <span
                          className={cn(
                            'size-1.5 rounded-full mt-1.5 shrink-0',
                            layer.glowClass
                          )}
                        />
                        <div className='min-w-0'>
                          <div className='text-foreground truncate font-semibold'>
                            {mod.name}
                          </div>
                          <div className='text-muted-foreground truncate text-[11px]'>
                            {mod.sub}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column: Layer Inspector & Detailed Diagnostics (5 cols) */}
        <div className='lg:col-span-5'>
          <div
            className={cn(
              'rounded-xl border p-5 sm:p-6 transition-all duration-300 space-y-4 sticky top-24',
              activeLayer.activeBorderClass,
              activeLayer.activeBgClass
            )}
          >
            {/* Inspector Top Status */}
            <div className='border-border/50 flex items-center justify-between border-b pb-3'>
              <div className='flex items-center gap-2'>
                <span
                  className={cn('size-2.5 rounded-full', activeLayer.glowClass)}
                />
                <span className='text-muted-foreground text-xs font-semibold'>
                  {activeLayer.levelTag} · {activeLayer.role}
                </span>
              </div>
              <Badge variant='outline' className='text-[10px]'>
                {t('Current Layer Details')}
              </Badge>
            </div>

            <div>
              <h3 className='text-foreground text-lg font-bold tracking-tight'>
                {activeLayer.name}
              </h3>
              <p className='text-muted-foreground mt-1.5 text-xs leading-relaxed'>
                {activeLayer.description}
              </p>
            </div>

            {/* Modules List */}
            <div className='space-y-2 pt-1'>
              <div className='text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase'>
                <Boxes className='text-primary size-3.5' />
                <span>{t('Module Breakdown')}</span>
              </div>
              <div className='grid grid-cols-1 gap-2'>
                {activeLayer.modules.map((mod) => (
                  <div
                    key={mod.id}
                    className='border-border/60 bg-background/80 rounded-lg border p-2.5 text-xs'
                  >
                    <div className='text-foreground flex items-center gap-2 font-semibold'>
                      <span
                        className={cn(
                          'size-1.5 rounded-full',
                          activeLayer.glowClass
                        )}
                      />
                      <span>{mod.name}</span>
                    </div>
                    <p className='text-muted-foreground mt-1 pl-3.5 text-[11px]'>
                      {mod.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies & Flow */}
            <div className='border-border/40 space-y-2 border-t pt-3'>
              <div className='text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase'>
                <Layers className='text-primary size-3.5' />
                <span>{t('Value & Capability Flow')}</span>
              </div>
              <div className='space-y-1.5'>
                {activeLayer.deps.map((dep, idx) => (
                  <div
                    key={idx}
                    className='text-muted-foreground flex items-start gap-2 text-xs leading-relaxed'
                  >
                    <span
                      className={cn('font-bold mt-0.5', activeLayer.textClass)}
                    >
                      {dep.dir === 'up' ? '↑' : '↓'}
                    </span>
                    <span>{dep.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verifiable Facts */}
            <div className='border-border/40 space-y-2 border-t pt-3'>
              <div className='text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase'>
                <Sparkles className='text-primary size-3.5' />
                <span>{t('Verifiable Facts & Attributes')}</span>
              </div>
              <div className='flex flex-wrap gap-1.5'>
                {activeLayer.facts.map((fact) => (
                  <span
                    key={fact}
                    className='border-border/60 bg-background/90 text-muted-foreground rounded-md border px-2 py-0.5 text-[11px] font-medium'
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
