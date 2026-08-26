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

import { BusinessPyramidDiagram } from '../diagrams/business-pyramid-diagram'
import { SectionHead } from '../section-head'

export function CapabilityChain() {
  const { t } = useTranslation()

  return (
    <section
      id='capabilities'
      className='border-border/60 scroll-mt-20 border-t'
    >
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <SectionHead
          eyebrow={t('01 / Three Core Businesses')}
          title={t('Three businesses, one path from tokens to outcomes.')}
          description={t(
            'iFAi supplies governed tokens, builds the enterprise decision brain, and deploys engineers on the frontline to turn business problems into working AI.'
          )}
        />

        <div className='mt-8'>
          <BusinessPyramidDiagram />
        </div>
      </div>
    </section>
  )
}
