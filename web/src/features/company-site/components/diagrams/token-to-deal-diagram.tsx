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

export function TokenToDealDiagram() {
  const { t } = useTranslation()
  const title = t('From tokens to deals.')

  return (
    <figure className='relative overflow-hidden rounded-lg border border-white/10 bg-[#07101e] shadow-[0_24px_80px_rgba(50,31,104,0.22)]'>
      <svg
        role='img'
        aria-label={title}
        viewBox='0 0 760 460'
        className='h-auto w-full'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>{title}</title>
        <defs>
          <linearGradient id='deal-bg' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#070e1c' />
            <stop offset='.55' stopColor='#0b1022' />
            <stop offset='1' stopColor='#160b18' />
          </linearGradient>
          <linearGradient id='deal-flow' x1='0' y1='0' x2='1' y2='0'>
            <stop stopColor='#60a5fa' stopOpacity='.1' />
            <stop offset='.55' stopColor='#8b5cf6' stopOpacity='.85' />
            <stop offset='1' stopColor='#fb8a6a' />
          </linearGradient>
          <radialGradient id='deal-orb'>
            <stop stopColor='#fb8a6a' stopOpacity='.35' />
            <stop offset='1' stopColor='#fb8a6a' stopOpacity='0' />
          </radialGradient>
          <pattern
            id='deal-grid'
            width='34'
            height='34'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M34 0H0V34'
              fill='none'
              stroke='#818cf8'
              strokeOpacity='.07'
            />
          </pattern>
          <filter id='deal-glow' x='-100%' y='-100%' width='300%' height='300%'>
            <feGaussianBlur stdDeviation='10' />
          </filter>
        </defs>

        <rect width='760' height='460' fill='url(#deal-bg)' />
        <rect width='760' height='460' fill='url(#deal-grid)' />
        <circle cx='648' cy='230' r='112' fill='url(#deal-orb)' />

        <g fill='#60a5fa'>
          <rect x='52' y='106' width='8' height='8' rx='2' fillOpacity='.54' />
          <rect x='80' y='132' width='13' height='13' rx='3' fillOpacity='.8' />
          <rect x='121' y='91' width='6' height='6' rx='2' fillOpacity='.65' />
          <rect
            x='143'
            y='150'
            width='10'
            height='10'
            rx='3'
            fillOpacity='.48'
          />
          <rect
            x='54'
            y='190'
            width='14'
            height='14'
            rx='3'
            fillOpacity='.72'
          />
          <rect x='105' y='216' width='8' height='8' rx='2' fillOpacity='.48' />
          <rect
            x='154'
            y='201'
            width='13'
            height='13'
            rx='3'
            fillOpacity='.82'
          />
          <rect x='75' y='275' width='9' height='9' rx='2' fillOpacity='.62' />
          <rect
            x='125'
            y='303'
            width='14'
            height='14'
            rx='3'
            fillOpacity='.72'
          />
          <rect x='166' y='266' width='7' height='7' rx='2' fillOpacity='.48' />
          <rect x='52' y='347' width='7' height='7' rx='2' fillOpacity='.5' />
          <rect
            x='96'
            y='365'
            width='11'
            height='11'
            rx='3'
            fillOpacity='.68'
          />
          <rect x='149' y='336' width='9' height='9' rx='2' fillOpacity='.54' />
        </g>
        <g fill='#a78bfa'>
          <circle cx='102' cy='116' r='4' fillOpacity='.7' />
          <circle cx='184' cy='125' r='5' fillOpacity='.62' />
          <circle cx='128' cy='174' r='3' fillOpacity='.72' />
          <circle cx='83' cy='240' r='4' fillOpacity='.66' />
          <circle cx='191' cy='230' r='5' fillOpacity='.78' />
          <circle cx='102' cy='328' r='4' fillOpacity='.64' />
          <circle cx='183' cy='318' r='3' fillOpacity='.76' />
        </g>

        <g fill='none' stroke='url(#deal-flow)' strokeLinecap='round'>
          <path
            d='M58 110C174 110 205 150 286 170C383 194 428 208 554 221'
            strokeOpacity='.55'
          />
          <path
            d='M90 138C180 139 228 182 304 196C395 213 447 218 554 226'
            strokeOpacity='.7'
          />
          <path
            d='M60 196C176 196 228 214 314 218C413 224 452 226 554 229'
            strokeWidth='1.5'
            strokeOpacity='.78'
          />
          <path
            d='M110 220C194 223 247 229 325 230C425 231 468 231 554 231'
            strokeWidth='2'
          />
          <path
            d='M78 280C177 280 230 258 310 248C399 237 460 235 554 233'
            strokeWidth='1.5'
            strokeOpacity='.8'
          />
          <path
            d='M132 310C216 303 246 272 326 258C420 241 467 238 554 235'
            strokeOpacity='.7'
          />
          <path
            d='M58 350C161 347 218 309 298 279C391 244 452 241 554 238'
            strokeOpacity='.5'
          />
        </g>

        <g fill='none' stroke='#818cf8' strokeOpacity='.38'>
          <rect x='232' y='112' width='64' height='236' rx='18' />
          <rect x='318' y='132' width='64' height='196' rx='18' />
          <rect x='404' y='151' width='64' height='158' rx='18' />
          <rect x='490' y='171' width='64' height='118' rx='18' />
        </g>
        <g fill='#c4b5fd'>
          <circle cx='296' cy='170' r='3' />
          <circle cx='318' cy='196' r='3' />
          <circle cx='382' cy='218' r='3' />
          <circle cx='404' cy='248' r='3' />
          <circle cx='468' cy='226' r='3' />
          <circle cx='490' cy='235' r='3' />
          <circle cx='554' cy='231' r='4' />
        </g>

        <path
          d='M554 229H586'
          stroke='#fb8a6a'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <circle
          cx='648'
          cy='230'
          r='72'
          fill='none'
          stroke='#fb8a6a'
          strokeOpacity='.26'
          strokeWidth='16'
          filter='url(#deal-glow)'
        />
        <circle
          cx='648'
          cy='230'
          r='70'
          fill='#160f18'
          stroke='#fb8a6a'
          strokeWidth='12'
        />
        <circle
          cx='648'
          cy='230'
          r='56'
          fill='#090e18'
          stroke='#fdba74'
          strokeOpacity='.22'
        />
        <path
          d='M610 257L622 243L635 250L648 229L660 238L679 207'
          fill='none'
          stroke='#5eead4'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx='679' cy='207' r='5' fill='#5eead4' />

        <text x='54' y='410' fill='#93c5fd' fontSize='11' fontWeight='700'>
          TOKEN
        </text>
        <text
          x='648'
          y='344'
          fill='#fdba74'
          fontSize='11'
          fontWeight='700'
          textAnchor='middle'
        >
          DEAL
        </text>
      </svg>
      <figcaption className='sr-only'>{title}</figcaption>
    </figure>
  )
}
