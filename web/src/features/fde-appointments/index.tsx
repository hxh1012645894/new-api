import { useTranslation } from 'react-i18next'

import { SectionPageLayout } from '@/components/layout'

import { FdeAppointmentsDialogs } from './components/appointments-dialogs'
import { FdeAppointmentsProvider } from './components/appointments-provider'
import { FdeAppointmentsTable } from './components/appointments-table'

export function FdeAppointments() {
  const { t } = useTranslation()
  return (
    <FdeAppointmentsProvider>
      <SectionPageLayout fixedContent>
        <SectionPageLayout.Title>
          {t('FDE Appointments')}
        </SectionPageLayout.Title>
        <SectionPageLayout.Content>
          <FdeAppointmentsTable />
        </SectionPageLayout.Content>
      </SectionPageLayout>
      <FdeAppointmentsDialogs />
    </FdeAppointmentsProvider>
  )
}
