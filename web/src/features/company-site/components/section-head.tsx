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
  number: '01' | '02' | '03'
  label: string
  title: string
  description: string
  tone: 'blue' | 'violet' | 'coral'
  className?: string
}

const TONE_CLASSES = {
  blue: 'text-blue-600 dark:text-blue-300',
  violet: 'text-violet-600 dark:text-violet-300',
  coral: 'text-orange-600 dark:text-orange-300',
}

export function SectionHead(props: SectionHeadProps) {
  return (
    <div className={cn('max-w-md', props.className)}>
      <div className='flex items-center gap-3'>
        <span
          className={cn(
            'font-mono text-xs font-semibold tracking-normal',
            TONE_CLASSES[props.tone]
          )}
        >
          {props.number}
        </span>
        <span className='text-muted-foreground text-xs font-semibold tracking-normal uppercase'>
          {props.label}
        </span>
        <span className='bg-border h-px flex-1' aria-hidden='true' />
      </div>
      <h2 className='mt-6 text-4xl leading-tight font-semibold tracking-normal text-balance md:text-5xl'>
        {props.title}
      </h2>
      <p className='text-muted-foreground mt-5 text-base leading-relaxed text-pretty'>
        {props.description}
      </p>
    </div>
  )
}
