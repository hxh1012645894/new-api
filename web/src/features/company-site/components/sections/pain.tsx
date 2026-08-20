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

import { SectionHead } from '../section-head'

export function Pain() {
  const { t } = useTranslation()
  const models = [
    t('Main model / Production'),
    t('Reasoning model / Support'),
    t('Vector search / Search'),
  ]

  return (
    <section className='border-border/60 border-t'>
      <div className='mx-auto max-w-6xl px-6 py-20 md:py-28'>
        <SectionHead
          eyebrow={t('01 / The blind spot')}
          title={t(
            'One consolidated bill cannot answer a single specific call.'
          )}
          description={t(
            'When costs are only aggregated by model or project, you cannot explain which user, request and response quality produced a cost. Optimization starts with guessing, and audits have nowhere to begin.'
          )}
        />
        <div className='border-border/70 bg-card overflow-x-auto rounded-xl border'>
          <div className='border-border/60 text-muted-foreground flex min-w-[560px] items-center justify-between border-b px-5 py-3.5 text-xs'>
            <span>{t('Model bill / this month')}</span>
            <span>{t('Aggregated dimensions only')}</span>
          </div>
          {models.map((model) => (
            <div
              key={model}
              className='border-border/40 grid min-w-[560px] grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr] items-center gap-4 border-b px-5 py-4 text-[13px] last:border-0'
            >
              <span className='font-semibold'>{model}</span>
              <span className='text-muted-foreground'>{t('Total tokens')}</span>
              <span className='text-muted-foreground'>{t('Total cost')}</span>
              <span className='text-right text-xs font-medium text-red-500'>
                {t('Not explainable per call')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
