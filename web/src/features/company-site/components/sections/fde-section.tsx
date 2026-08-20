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

import { FdeForm } from '../fde-form'

export function FdeSection() {
  const { t } = useTranslation()

  return (
    <section id='fde' className='border-border/60 scroll-mt-20 border-t'>
      <div className='mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20'>
        <div>
          <span className='text-muted-foreground text-[11px] font-bold tracking-[0.14em] uppercase'>
            {t('05 / Work with iFAi')}
          </span>
          <h2 className='mt-3 text-3xl leading-[1.1] font-semibold tracking-[-0.03em] md:text-[40px]'>
            {t('Bring a real scenario. Land it with FDE.')}
          </h2>
          <p className='text-muted-foreground mt-5 max-w-[340px] text-[15px] leading-relaxed'>
            {t(
              'Tell us about the AI business you are running. We will reply within 24 hours to confirm whether we should work on it together.'
            )}
          </p>
          <p className='text-muted-foreground/70 mt-8 max-w-[300px] text-xs leading-relaxed'>
            {t(
              'Your information is only used to evaluate and follow up on the FDE engagement.'
            )}
          </p>
        </div>
        <FdeForm />
      </div>
    </section>
  )
}
