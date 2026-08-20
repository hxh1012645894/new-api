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
import { cn } from '@/lib/utils'

interface SectionHeadProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

/**
 * Shared editorial section header: numbered eyebrow + display title on the
 * left, optional supporting paragraph on the right. Receives already
 * localized strings.
 */
export function SectionHead(props: SectionHeadProps) {
  return (
    <div
      className={cn(
        'mb-12 grid gap-6 lg:grid-cols-2 lg:gap-14 lg:mb-16',
        props.className
      )}
    >
      <div>
        <span className='text-muted-foreground text-[11px] font-bold tracking-[0.14em] uppercase'>
          {props.eyebrow}
        </span>
        <h2 className='mt-3 text-3xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-4xl'>
          {props.title}
        </h2>
      </div>
      {props.description ? (
        <p className='text-muted-foreground max-w-[440px] self-end text-[15px] leading-relaxed lg:justify-self-end'>
          {props.description}
        </p>
      ) : null}
    </div>
  )
}
