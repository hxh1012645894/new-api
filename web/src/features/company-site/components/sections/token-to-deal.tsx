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

import { TokenToDealDiagram } from '../diagrams/token-to-deal-diagram'
import { SectionHead } from '../section-head'

export function TokenToDeal() {
  const { t } = useTranslation()

  return (
    <section
      id='token-to-deal'
      className='border-border/60 scroll-mt-20 border-t'
    >
      <div className='mx-auto grid max-w-6xl items-center gap-10 px-6 py-18 md:py-28 lg:grid-cols-[1.28fr_0.72fr] lg:gap-16'>
        <SectionHead
          number='02'
          label={t('Token Economy')}
          title={t('From tokens to deals.')}
          description={t('See cost. Trace impact.')}
          tone='violet'
          className='lg:order-2'
        />
        <div className='lg:order-1'>
          <TokenToDealDiagram />
        </div>
      </div>
    </section>
  )
}
