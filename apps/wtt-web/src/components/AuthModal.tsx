'use client'
import { useState } from 'react'
import { AuthModal as UIAuthModal } from '@6icube/ui'
import { theme, brand } from '@/theme.config'
import { useAuthCard } from '@/lib/useAuthCard'

function AuthModalInner({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
}: {
  isOpen: boolean
  mode: 'login' | 'register'
  onClose: () => void
  onSwitchMode: () => void
}) {
  const auth = useAuthCard(mode)
  return (
    <UIAuthModal
      open={isOpen}
      mode={mode}
      brand={brand}
      heading={mode === 'login' ? 'Welcome back' : 'Create account'}
      showGoogle
      theme={theme}
      onClose={onClose}
      {...auth}
      onSwitchMode={onSwitchMode}
    />
  )
}

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  return (
    <AuthModalInner
      isOpen={isOpen}
      mode={mode}
      onClose={onClose}
      onSwitchMode={() => setMode(m => (m === 'login' ? 'register' : 'login'))}
    />
  )
}
