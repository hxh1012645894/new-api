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
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight, LogIn, LogOut, Sparkles, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { logout } from '@/features/auth/api'
import { UserAuthForm } from '@/features/auth/sign-in/components/user-auth-form'
import { SignUpForm } from '@/features/auth/sign-up/components/sign-up-form'
import { useStatus } from '@/hooks/use-status'
import { clearAuthenticatedClientState } from '@/lib/auth-session'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'

export function HeroAuthCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { status } = useStatus()
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const { auth } = useAuthStore()
  const user = auth.user

  const isRegisterEnabled =
    !status?.self_use_mode_enabled && status?.register_enabled !== false

  useEffect(() => {
    if (!isRegisterEnabled && tab === 'signup') {
      setTab('signin')
    }
  }, [isRegisterEnabled, tab])

  const handleSignOut = () => {
    clearAuthenticatedClientState(queryClient)
    toast.success(t('Signed out successfully'))
    void navigate({ to: '/', replace: true })
    void logout()
  }

  if (user) {
    const isAdmin = (user.role ?? 0) >= 10

    return (
      <div className='border-border/80 bg-card/95 relative w-full rounded-2xl border p-6 shadow-xl backdrop-blur-xl sm:p-7'>
        <div className='border-border/60 flex items-center gap-3 border-b pb-5'>
          <Avatar className='border-border/80 h-12 w-12 border'>
            <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2'>
              <h3 className='truncate text-base font-semibold'>
                {user.display_name || user.username}
              </h3>
              <span className='inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400'>
                {isAdmin ? t('Admin') : t('User')}
              </span>
            </div>
            <p className='text-muted-foreground truncate text-xs'>
              {user.email || t('Authenticated Session')}
            </p>
          </div>
        </div>

        <div className='mt-6 space-y-3'>
          <div className='border-border/60 bg-muted/30 rounded-xl border p-3.5'>
            <div className='flex items-center justify-between text-xs'>
              <span className='text-muted-foreground'>
                {t('Account Status')}
              </span>
              <span className='flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400'>
                <span className='size-1.5 rounded-full bg-emerald-500' />
                {t('Active')}
              </span>
            </div>
            <div className='mt-2.5 flex items-center justify-between text-xs'>
              <span className='text-muted-foreground'>
                {t('Current Plan / Group')}
              </span>
              <span className='font-mono font-medium'>
                {user.group || 'default'}
              </span>
            </div>
          </div>

          <Button
            className='h-10 w-full justify-center gap-2 rounded-xl text-sm font-medium'
            render={<Link to='/dashboard' />}
          >
            <span>{t('Go to Console')}</span>
            <ArrowRight className='size-4' />
          </Button>

          <Button
            variant='outline'
            onClick={handleSignOut}
            className='border-border/70 text-muted-foreground hover:text-destructive h-10 w-full justify-center gap-2 rounded-xl text-xs'
          >
            <LogOut className='size-3.5' />
            <span>{t('Sign out / Switch account')}</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='border-border/80 bg-card/95 relative w-full overflow-hidden rounded-2xl border p-5 shadow-2xl backdrop-blur-xl sm:p-7'>
      <div className='border-border/60 mb-5 flex items-center justify-between border-b pb-3.5'>
        {isRegisterEnabled ? (
          <div className='bg-muted/60 flex gap-1.5 rounded-lg p-1'>
            <button
              type='button'
              onClick={() => setTab('signin')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                tab === 'signin'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LogIn className='size-3.5' />
              <span>{t('Sign in')}</span>
            </button>
            <button
              type='button'
              onClick={() => setTab('signup')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                tab === 'signup'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <UserPlus className='size-3.5' />
              <span>{t('Sign up')}</span>
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-1.5 text-xs font-semibold'>
            <LogIn className='size-4 text-blue-500' />
            <span>{t('Sign in')}</span>
          </div>
        )}

        <div className='text-muted-foreground hidden items-center gap-1.5 text-[11px] font-medium sm:flex'>
          <Sparkles className='size-3 text-blue-500' />
          <span>{t('Instant access')}</span>
        </div>
      </div>

      <div className='max-h-[540px] overflow-y-auto pr-0.5'>
        {tab === 'signin' || !isRegisterEnabled ? (
          <div className='space-y-4'>
            <div className='space-y-1'>
              <h3 className='text-lg font-semibold tracking-tight'>
                {t('Welcome to iFAi')}
              </h3>
              <p className='text-muted-foreground text-xs'>
                {t(
                  'Sign in to manage models, audit tokens and access workflows.'
                )}
              </p>
            </div>
            <UserAuthForm redirectTo='/dashboard' className='gap-3 text-xs' />
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='space-y-1'>
              <h3 className='text-lg font-semibold tracking-tight'>
                {t('Create an account')}
              </h3>
              <p className='text-muted-foreground text-xs'>
                {t(
                  'Start governed token billing and intelligent data warehousing.'
                )}
              </p>
            </div>
            <SignUpForm className='gap-3 text-xs' />
          </div>
        )}
      </div>
    </div>
  )
}
