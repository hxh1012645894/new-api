import { useTranslation } from 'react-i18next'

import { SectionPageLayout } from '@/components/layout'

import { AuditDetailDialog } from './components/audits-detail-dialog'
import { RequestAuditsProvider } from './components/audits-provider'
import { RequestAuditsTable } from './components/audits-table'

export function RequestAudits() {
  const { t } = useTranslation()
  return (
    <RequestAuditsProvider>
      <SectionPageLayout fixedContent>
        <SectionPageLayout.Title>{t('Content Audit')}</SectionPageLayout.Title>
        <SectionPageLayout.Content>
          <RequestAuditsTable />
        </SectionPageLayout.Content>
      </SectionPageLayout>
      <AuditDetailDialog />
    </RequestAuditsProvider>
  )
}
