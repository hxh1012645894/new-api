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

export function WarehouseTowerDiagram() {
  const { t } = useTranslation()
  const title = t('Data, ready for AI.')

  return (
    <figure className='relative overflow-hidden rounded-lg border border-white/10 bg-[#07101e] shadow-[0_24px_80px_rgba(78,43,28,0.2)]'>
      <svg
        role='img'
        aria-label={title}
        viewBox='0 0 760 520'
        className='h-auto w-full'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>{title}</title>
        <defs>
          <linearGradient id='warehouse-bg' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#07101e' />
            <stop offset='.56' stopColor='#0c1324' />
            <stop offset='1' stopColor='#170f17' />
          </linearGradient>
          <linearGradient id='warehouse-blue' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#7dd3fc' stopOpacity='.55' />
            <stop offset='1' stopColor='#2563eb' stopOpacity='.15' />
          </linearGradient>
          <linearGradient id='warehouse-violet' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#c4b5fd' stopOpacity='.5' />
            <stop offset='1' stopColor='#7c3aed' stopOpacity='.14' />
          </linearGradient>
          <linearGradient id='warehouse-teal' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#99f6e4' stopOpacity='.5' />
            <stop offset='1' stopColor='#0f766e' stopOpacity='.14' />
          </linearGradient>
          <linearGradient id='warehouse-coral' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#fdba74' stopOpacity='.52' />
            <stop offset='1' stopColor='#ea580c' stopOpacity='.14' />
          </linearGradient>
          <pattern
            id='warehouse-grid'
            width='34'
            height='34'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M34 0H0V34'
              fill='none'
              stroke='#7dd3fc'
              strokeOpacity='.07'
            />
          </pattern>
          <filter
            id='warehouse-glow'
            x='-100%'
            y='-100%'
            width='300%'
            height='300%'
          >
            <feGaussianBlur stdDeviation='11' />
          </filter>
        </defs>

        <rect width='760' height='520' fill='url(#warehouse-bg)' />
        <rect width='760' height='520' fill='url(#warehouse-grid)' />
        <ellipse
          cx='418'
          cy='454'
          rx='250'
          ry='34'
          fill='#38bdf8'
          fillOpacity='.08'
        />

        <g fill='none' strokeLinecap='round'>
          <path d='M405 408V100' stroke='#e0f2fe' strokeOpacity='.18' />
          <path d='M258 407V169' stroke='#e0f2fe' strokeOpacity='.1' />
          <path d='M555 407V169' stroke='#e0f2fe' strokeOpacity='.1' />
          <path
            d='M404 102V64'
            stroke='#fb8a6a'
            strokeOpacity='.65'
            strokeWidth='2'
          />
        </g>

        <g>
          <polygon
            points='108,369 390,268 675,369 393,476'
            fill='url(#warehouse-blue)'
            stroke='#60a5fa'
            strokeOpacity='.85'
            strokeWidth='1.5'
          />
          <polygon
            points='108,369 393,476 393,492 108,386'
            fill='#1d4ed8'
            fillOpacity='.2'
            stroke='#60a5fa'
            strokeOpacity='.3'
          />
          <polygon
            points='393,476 675,369 675,386 393,492'
            fill='#1e40af'
            fillOpacity='.27'
            stroke='#60a5fa'
            strokeOpacity='.3'
          />
          <path
            d='M176 374L390 298L608 374L393 456Z'
            fill='none'
            stroke='#bfdbfe'
            strokeOpacity='.2'
          />
          <rect
            x='229'
            y='366'
            width='38'
            height='24'
            rx='4'
            fill='#60a5fa'
            fillOpacity='.14'
            stroke='#93c5fd'
            strokeOpacity='.6'
          />
          <rect
            x='352'
            y='320'
            width='70'
            height='44'
            rx='6'
            fill='#60a5fa'
            fillOpacity='.13'
            stroke='#bfdbfe'
            strokeOpacity='.7'
          />
          <rect
            x='526'
            y='368'
            width='38'
            height='24'
            rx='4'
            fill='#60a5fa'
            fillOpacity='.14'
            stroke='#93c5fd'
            strokeOpacity='.6'
          />
          <path
            d='M267 378L352 343M422 343L526 379'
            stroke='#93c5fd'
            strokeOpacity='.45'
          />
          <text
            x='393'
            y='466'
            fill='#dbeafe'
            fontSize='14'
            fontWeight='700'
            textAnchor='middle'
          >
            ODS
          </text>
        </g>

        <g>
          <polygon
            points='165,303 393,221 624,303 396,390'
            fill='url(#warehouse-violet)'
            stroke='#a78bfa'
            strokeOpacity='.84'
            strokeWidth='1.5'
          />
          <polygon
            points='165,303 396,390 396,404 165,318'
            fill='#7c3aed'
            fillOpacity='.2'
            stroke='#a78bfa'
            strokeOpacity='.3'
          />
          <polygon
            points='396,390 624,303 624,318 396,404'
            fill='#6d28d9'
            fillOpacity='.27'
            stroke='#a78bfa'
            strokeOpacity='.3'
          />
          <circle
            cx='393'
            cy='292'
            r='22'
            fill='#a78bfa'
            fillOpacity='.12'
            stroke='#c4b5fd'
            strokeOpacity='.42'
          />
          <path
            d='M393 270V314M371 292H415'
            stroke='#ddd6fe'
            strokeOpacity='.66'
          />
          <text
            x='396'
            y='381'
            fill='#ede9fe'
            fontSize='14'
            fontWeight='700'
            textAnchor='middle'
          >
            DWD
          </text>
        </g>

        <g>
          <polygon
            points='220,239 397,176 574,239 397,307'
            fill='url(#warehouse-teal)'
            stroke='#5eead4'
            strokeOpacity='.82'
            strokeWidth='1.5'
          />
          <polygon
            points='220,239 397,307 397,320 220,252'
            fill='#0f766e'
            fillOpacity='.2'
            stroke='#5eead4'
            strokeOpacity='.3'
          />
          <polygon
            points='397,307 574,239 574,252 397,320'
            fill='#115e59'
            fillOpacity='.27'
            stroke='#5eead4'
            strokeOpacity='.3'
          />
          <path
            d='M298 247L397 211L498 247L397 285Z'
            fill='none'
            stroke='#99f6e4'
            strokeOpacity='.34'
          />
          <circle cx='397' cy='248' r='8' fill='#ccfbf1' />
          <circle cx='333' cy='247' r='5' fill='#99f6e4' />
          <circle cx='462' cy='247' r='5' fill='#99f6e4' />
          <text
            x='397'
            y='299'
            fill='#ccfbf1'
            fontSize='14'
            fontWeight='700'
            textAnchor='middle'
          >
            DWS
          </text>
        </g>

        <g>
          <polygon
            points='274,177 402,131 531,177 403,226'
            fill='url(#warehouse-coral)'
            stroke='#fb8a6a'
            strokeOpacity='.9'
            strokeWidth='1.5'
          />
          <polygon
            points='274,177 403,226 403,238 274,190'
            fill='#ea580c'
            fillOpacity='.2'
            stroke='#fb8a6a'
            strokeOpacity='.32'
          />
          <polygon
            points='403,226 531,177 531,190 403,238'
            fill='#c2410c'
            fillOpacity='.28'
            stroke='#fb8a6a'
            strokeOpacity='.32'
          />
          <rect
            x='381'
            y='151'
            width='45'
            height='39'
            rx='7'
            fill='#fb8a6a'
            fillOpacity='.12'
            stroke='#fed7aa'
            strokeOpacity='.62'
          />
          <path
            d='M390 181L399 171L407 177L417 163'
            fill='none'
            stroke='#fff7ed'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            x='403'
            y='218'
            fill='#ffedd5'
            fontSize='14'
            fontWeight='700'
            textAnchor='middle'
          >
            ADS
          </text>
        </g>

        <circle
          cx='404'
          cy='64'
          r='42'
          fill='#fb8a6a'
          fillOpacity='.16'
          filter='url(#warehouse-glow)'
        />
        <circle
          cx='404'
          cy='64'
          r='29'
          fill='#160f18'
          stroke='#fb8a6a'
          strokeOpacity='.68'
          strokeWidth='2'
        />
        <path
          d='M390 73L399 63L407 69L420 52'
          fill='none'
          stroke='#5eead4'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <g fontSize='10' fontWeight='700' textAnchor='middle'>
          <rect
            x='52'
            y='396'
            width='58'
            height='28'
            rx='14'
            fill='#0b1728'
            stroke='#60a5fa'
            strokeOpacity='.36'
          />
          <text x='81' y='414' fill='#93c5fd'>
            CRM
          </text>
          <rect
            x='52'
            y='432'
            width='58'
            height='28'
            rx='14'
            fill='#0b1728'
            stroke='#60a5fa'
            strokeOpacity='.36'
          />
          <text x='81' y='450' fill='#93c5fd'>
            ERP
          </text>
          <path
            d='M110 410L164 386M110 446L164 414'
            stroke='#60a5fa'
            strokeOpacity='.34'
          />
        </g>
      </svg>
      <figcaption className='sr-only'>{title}</figcaption>
    </figure>
  )
}
