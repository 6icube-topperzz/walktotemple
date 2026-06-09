'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE || 'http://localhost:4008/api/v1'

// Module-level memory — survives re-renders, lost on hard refresh (correct interim behaviour).
// No localStorage: access tokens must not be written to persistent browser storage.
let _token: string | null = null

type User = { name?: string; email?: string } | null

interface AuthState {
  isLoggedIn: boolean
  isLoading: boolean
  user: User
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  })

  useEffect(() => {
    if (!_token) {
      setState({ isLoggedIn: false, isLoading: false, user: null })
      return
    }
    axios
      .get(`${AUTH_BASE}/auth/me`, { headers: { Authorization: `Bearer ${_token}` } })
      .then(({ data }) => setState({ isLoggedIn: true, isLoading: false, user: data }))
      .catch(() => {
        _token = null
        setState({ isLoggedIn: false, isLoading: false, user: null })
      })
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const { data } = await axios.post(`${AUTH_BASE}/auth/login`, { email, password })
    _token = data.token
    const me = await axios.get(`${AUTH_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${_token}` },
    })
    setState({ isLoggedIn: true, isLoading: false, user: me.data })
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    _token = null
    setState({ isLoggedIn: false, isLoading: false, user: null })
  }, [])

  return { state, login, logout }
}
