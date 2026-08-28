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

export function BusinessPyramidDiagram() {
  const { t } = useTranslation()
  const title = t('Tokens. Intelligence. Outcomes.')

  return (
    <figure className='relative overflow-hidden rounded-lg border border-white/10 bg-[#07101e] shadow-[0_24px_80px_rgba(10,32,75,0.22)]'>
      <svg
        role='img'
        aria-label={title}
        viewBox='0 0 760 500'
        className='h-auto w-full'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>{title}</title>
        <defs>
          <linearGradient id='business-bg' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#0a1730' />
            <stop offset='1' stopColor='#050a13' />
          </linearGradient>
          <linearGradient id='business-blue' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#60a5fa' stopOpacity='.5' />
            <stop offset='1' stopColor='#2563eb' stopOpacity='.14' />
          </linearGradient>
          <linearGradient id='business-violet' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#c4b5fd' stopOpacity='.5' />
            <stop offset='1' stopColor='#7c3aed' stopOpacity='.14' />
          </linearGradient>
          <linearGradient id='business-gold' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#fde68a' stopOpacity='.55' />
            <stop offset='1' stopColor='#f59e0b' stopOpacity='.14' />
          </linearGradient>
          <pattern
            id='business-grid'
            width='32'
            height='32'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M32 0H0V32'
              fill='none'
              stroke='#7dd3fc'
              strokeOpacity='.08'
            />
          </pattern>
          <filter
            id='business-glow'
            x='-80%'
            y='-80%'
            width='260%'
            height='260%'
          >
            <feGaussianBlur stdDeviation='9' />
          </filter>
        </defs>

        <rect width='760' height='500' fill='url(#business-bg)' />
        <rect width='760' height='500' fill='url(#business-grid)' />
        <circle cx='618' cy='96' r='54' fill='#fbbf24' fillOpacity='.08' />
        <circle
          cx='618'
          cy='96'
          r='22'
          fill='#fbbf24'
          fillOpacity='.32'
          filter='url(#business-glow)'
        />

        <g fill='none' strokeLinecap='round'>
          <path d='M398 383V212' stroke='#93c5fd' strokeOpacity='.28' />
          <path d='M240 327V226' stroke='#93c5fd' strokeOpacity='.18' />
          <path d='M556 324V218' stroke='#93c5fd' strokeOpacity='.18' />
          <path
            d='M466 192C520 170 558 139 599 108'
            stroke='#fbbf24'
            strokeOpacity='.6'
            strokeWidth='2'
          />
        </g>

        <g>
          <polygon
            points='98,345 370,244 670,348 398,456'
            fill='url(#business-blue)'
            stroke='#60a5fa'
            strokeOpacity='.78'
            strokeWidth='1.5'
          />
          <polygon
            points='98,345 398,456 398,474 98,363'
            fill='#1d4ed8'
            fillOpacity='.22'
            stroke='#60a5fa'
            strokeOpacity='.3'
          />
          <polygon
            points='398,456 670,348 670,366 398,474'
            fill='#1e40af'
            fillOpacity='.3'
            stroke='#60a5fa'
            strokeOpacity='.3'
          />
          <path
            d='M174 349L371 276L592 352L397 430Z'
            fill='none'
            stroke='#93c5fd'
            strokeOpacity='.18'
          />
          <circle cx='236' cy='343' r='7' fill='#93c5fd' fillOpacity='.82' />
          <circle cx='369' cy='292' r='9' fill='#dbeafe' fillOpacity='.9' />
          <circle cx='530' cy='349' r='7' fill='#93c5fd' fillOpacity='.82' />
          <path
            d='M236 343L369 292L530 349L397 402Z'
            fill='none'
            stroke='#bfdbfe'
            strokeOpacity='.34'
          />
          <text
            x='398'
            y='444'
            fill='#dbeafe'
            fontSize='15'
            fontWeight='700'
            textAnchor='middle'
          >
            TOKEN
          </text>
        </g>

        <g>
          <polygon
            points='176,269 374,195 598,272 400,352'
            fill='url(#business-violet)'
            stroke='#a78bfa'
            strokeOpacity='.82'
            strokeWidth='1.5'
          />
          <polygon
            points='176,269 400,352 400,367 176,285'
            fill='#7c3aed'
            fillOpacity='.2'
            stroke='#a78bfa'
            strokeOpacity='.3'
          />
          <polygon
            points='400,352 598,272 598,287 400,367'
            fill='#6d28d9'
            fillOpacity='.28'
            stroke='#a78bfa'
            strokeOpacity='.3'
          />
          <circle cx='400' cy='264' r='26' fill='#a78bfa' fillOpacity='.12' />
          <circle cx='400' cy='264' r='9' fill='#ddd6fe' />
          <path
            d='M400 264L284 286M400 264L504 295M400 264V321'
            stroke='#c4b5fd'
            strokeOpacity='.55'
          />
          <circle cx='284' cy='286' r='6' fill='#c4b5fd' />
          <circle cx='504' cy='295' r='6' fill='#c4b5fd' />
          <circle cx='400' cy='321' r='6' fill='#c4b5fd' />
          <text
            x='400'
            y='344'
            fill='#ede9fe'
            fontSize='15'
            fontWeight='700'
            textAnchor='middle'
          >
            BRAIN
          </text>
        </g>

        <g>
          <polygon
            points='258,185 382,139 528,190 404,241'
            fill='url(#business-gold)'
            stroke='#fbbf24'
            strokeOpacity='.9'
            strokeWidth='1.5'
          />
          <polygon
            points='258,185 404,241 404,253 258,198'
            fill='#d97706'
            fillOpacity='.22'
            stroke='#fbbf24'
            strokeOpacity='.32'
          />
          <polygon
            points='404,241 528,190 528,202 404,253'
            fill='#b45309'
            fillOpacity='.28'
            stroke='#fbbf24'
            strokeOpacity='.32'
          />
          <rect
            x='381'
            y='163'
            width='46'
            height='46'
            rx='8'
            fill='#fbbf24'
            fillOpacity='.14'
            stroke='#fde68a'
            strokeOpacity='.72'
          />
          <path
            d='M393 195L402 185L410 191L419 178'
            fill='none'
            stroke='#fef3c7'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            x='404'
            y='232'
            fill='#fef3c7'
            fontSize='14'
            fontWeight='700'
            textAnchor='middle'
          >
            FDE
          </text>
        </g>

        <circle
          cx='618'
          cy='96'
          r='34'
          fill='none'
          stroke='#fbbf24'
          strokeOpacity='.56'
          strokeWidth='2'
        />
        <circle
          cx='618'
          cy='96'
          r='24'
          fill='#f97316'
          fillOpacity='.18'
          stroke='#fdba74'
          strokeOpacity='.58'
        />
        <path
          d='M606 105L614 96L621 101L632 85'
          fill='none'
          stroke='#fff7ed'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <figcaption className='sr-only'>{title}</figcaption>
    </figure>
  )
}
