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
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { useSystemConfig } from '@/hooks/use-system-config'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'

interface HeaderLink {
  href: string
  label: string
}

function BrandMark() {
  return (
    <span
      className='flex size-7 shrink-0 items-center justify-center gap-[3px]'
      aria-hidden='true'
    >
      <span className='size-1.5 rounded-full bg-blue-500' />
      <span className='size-1.5 rounded-full bg-violet-500' />
      <span className='size-1.5 rounded-full bg-yellow-500' />
      <span className='size-1.5 rounded-full bg-red-500' />
    </span>
  )
}

function HamburgerIcon(props: { open: boolean }) {
  const bar =
    'absolute inset-x-0 block h-[1.5px] origin-center rounded-full bg-current transition-all duration-300'
  return (
    <span className='relative size-4' aria-hidden='true'>
      <span
        className={cn(bar, props.open ? 'top-[7px] rotate-45' : 'top-[3px]')}
      />
      <span
        className={cn(
          bar,
          props.open ? 'scale-x-0 opacity-0' : 'top-[7px] opacity-100'
        )}
      />
      <span
        className={cn(bar, props.open ? 'top-[7px] -rotate-45' : 'top-[11px]')}
      />
    </span>
  )
}

export function SiteHeader() {
  const { t } = useTranslation()
  const { systemName, logo } = useSystemConfig()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  const displayName = systemName || 'iFAi'
  const links: HeaderLink[] = [
    { href: '#capabilities', label: t('Capabilities') },
    { href: '#audit', label: t('Audit Trail') },
    { href: '#warehouse', label: t('Data Warehouse') },
    { href: '#fde', label: t('FDE') },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-border/60 bg-background/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
    >
      <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6'>
        <Link
          to='/'
          className='flex shrink-0 items-center gap-2.5'
          aria-label='iFAi'
        >
          {logo ? (
            <img
              src={logo}
              alt={displayName}
              className='size-7 rounded-lg object-contain'
            />
          ) : (
            <BrandMark />
          )}
          <span className='text-sm font-semibold tracking-tight'>
            {displayName}
          </span>
        </Link>

        <div className='hidden items-center gap-6 md:flex'>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200'
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className='hidden items-center gap-1.5 md:flex'>
          <LanguageSwitcher />
          <ThemeSwitch />
          {isAuthenticated ? (
            <Button
              size='sm'
              variant='outline'
              className='h-8 rounded-lg px-3 text-xs font-medium'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
            </Button>
          ) : (
            <Button
              size='sm'
              variant='ghost'
              className='h-8 rounded-lg px-3 text-xs font-medium'
              render={<Link to='/sign-in' />}
            >
              {t('Sign in')}
            </Button>
          )}
          <Button
            size='sm'
            className='h-8 rounded-lg px-3.5 text-xs font-medium'
            render={<a href='#fde' />}
          >
            {t('Book FDE')}
          </Button>
        </div>

        <div className='flex items-center gap-1.5 md:hidden'>
          <LanguageSwitcher />
          <ThemeSwitch />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='size-9'
            aria-expanded={open}
            aria-controls='company-site-mobile-menu'
            aria-label={t('Toggle navigation menu')}
            onClick={() => setOpen((value) => !value)}
          >
            <HamburgerIcon open={open} />
          </Button>
        </div>
      </nav>

      {open ? (
        <div
          id='company-site-mobile-menu'
          className='border-border/60 bg-background/98 border-t px-6 py-4 md:hidden'
        >
          <nav className='flex flex-col'>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className='text-muted-foreground hover:text-foreground py-2.5 text-sm font-medium'
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className='mt-3 flex flex-col gap-2'>
            {isAuthenticated ? (
              <Button
                className='h-10 rounded-lg text-sm font-medium'
                render={<Link to='/dashboard' onClick={() => setOpen(false)} />}
              >
                {t('Go to Dashboard')}
              </Button>
            ) : (
              <Button
                variant='outline'
                className='h-10 rounded-lg text-sm font-medium'
                render={<Link to='/sign-in' onClick={() => setOpen(false)} />}
              >
                {t('Sign in')}
              </Button>
            )}
            <Button
              className='h-10 rounded-lg text-sm font-medium'
              render={<a href='#fde' onClick={() => setOpen(false)} />}
            >
              {t('Book FDE')}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
