'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import type { AuthCardValues, AuthCardErrors } from '@6icube/ui'

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE || 'http://localhost:4008/api/v1'
const APP_ID    = process.env.NEXT_PUBLIC_APP_ID    || 'wtt'

export function useAuthCard(mode: 'login' | 'register') {
  const router   = useRouter()
  const { login } = useAuth()

  const [values, setValues]       = useState<AuthCardValues>({ fullName: '', email: '', password: '' })
  const [errors]                  = useState<AuthCardErrors>({})
  const [loading, setLoading]     = useState(false)
  const [formError, setFormError] = useState('')

  const onChange = (field: keyof AuthCardValues, value: string) =>
    setValues(v => ({ ...v, [field]: value }))

  const onSubmit = async () => {
    setFormError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(values.email, values.password)
        router.push('/')
      } else {
        await axios.post(`${AUTH_BASE}/auth/register/email`, {
          email:    values.email,
          password: values.password,
          name:     values.fullName,
          app_id:   APP_ID,
        })
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`)
      }
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message
      setFormError(msg || (mode === 'login' ? 'Login failed.' : 'Registration failed.'))
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = () => {
    window.location.href = `${AUTH_BASE}/auth/google`
  }

  const onSwitchMode = () => {
    router.push(mode === 'login' ? '/register' : '/login')
  }

  return { values, errors, loading, formError, onChange, onSubmit, onGoogle, onSwitchMode }
}
