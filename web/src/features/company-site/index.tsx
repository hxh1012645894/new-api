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
import { Footer } from '@/components/layout/components/footer'
import { PublicHeader } from '@/components/layout/components/public-header'

import { AuditTrail } from './components/sections/audit-trail'
import { CapabilityChain } from './components/sections/capability-chain'
import { FdeSection } from './components/sections/fde-section'
import { Hero } from './components/sections/hero'
import { Pain } from './components/sections/pain'
import { Warehouse } from './components/sections/warehouse'

const COMPANY_FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { text: 'Console', href: '/sign-in' },
      { text: 'Model Square', href: '/pricing' },
      { text: 'Docs', href: 'https://docs.newapi.pro' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About', href: '/about' },
      { text: 'Sign in', href: '/sign-in' },
      { text: 'Sign up', href: '/sign-up' },
    ],
  },
]

/**
 * Company official site — the default public landing page of this deployment.
 * The "New API" project attribution stays in the shared Footer.
 */
export function CompanySite() {
  return (
    <div className='bg-background text-foreground relative min-h-svh overflow-x-clip'>
      <PublicHeader />
      <main>
        <Hero />
        <Pain />
        <CapabilityChain />
        <AuditTrail />
        <Warehouse />
        <FdeSection />
      </main>
      <Footer columns={COMPANY_FOOTER_COLUMNS} />
    </div>
  )
}
