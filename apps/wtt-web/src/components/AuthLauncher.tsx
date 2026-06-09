'use client'
import { useState } from 'react'
import { AuthModal } from '@6icube/ui'
import { theme, brand } from '@/theme.config'
import { useAuthCard } from '@/lib/useAuthCard'
import type { ReactNode } from 'react'

function AuthLauncherModal({
  open, mode, onClose, onSwitchMode,
}: {
  open: boolean
  mode: 'login' | 'register'
  onClose: () => void
  onSwitchMode: () => void
}) {
  const auth = useAuthCard(mode)
  return (
    <AuthModal
      open={open}
      mode={mode}
      brand={brand}
      heading={mode === 'login' ? 'Welcome back' : 'Create account'}
      showGoogle={false}
      theme={theme}
      onClose={onClose}
      {...auth}
      onSwitchMode={onSwitchMode}
    />
  )
}

export function AuthLauncher({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        {children}
      </button>
      <AuthLauncherModal
        open={open}
        mode={mode}
        onClose={() => setOpen(false)}
        onSwitchMode={() => setMode(m => m === 'login' ? 'register' : 'login')}
      />
    </>
  )
}
