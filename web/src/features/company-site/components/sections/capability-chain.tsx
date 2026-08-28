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
      <div className='mx-auto grid max-w-6xl items-center gap-10 px-6 py-18 md:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
        <SectionHead
          number='01'
          label={t('Business Stack')}
          title={t('Tokens. Intelligence. Outcomes.')}
          description={t('Three layers. One business loop.')}
          tone='blue'
        />
        <BusinessPyramidDiagram />
      </div>
    </section>
  )
}
