# WTT-WEB — Frontend Auth (AuthProvider + AuthModal)
## Window: C:\dev\walktotemple\apps\wtt-web\
## Port: 3003
## App color: Saffron (#FF9933 / amber-600)
## app_id: wtt

---

## STEP 1 — Install packages

```bash
pnpm add axios
```

---

## STEP 2 — Add .env.local

Create `.env.local` in root of wtt-web:

```env
NEXT_PUBLIC_AUTH_BASE=http://localhost:4001/api/v1
NEXT_PUBLIC_API_BASE=http://localhost:4008/api/v1
NEXT_PUBLIC_APP_ID=wtt
```

---

## STEP 3 — Create src/hooks/useAuth.ts

```typescript
'use client'
import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE || 'http://localhost:4001/api/v1'
const APP_ID    = process.env.NEXT_PUBLIC_APP_ID    || 'wtt'

let memoryToken: string | null = null

export interface AuthUser {
  id:                string
  email:             string
  name:              string
  role:              string
  app_id:            string
  avatar_url?:       string
  is_email_verified: boolean
  is_phone_verified: boolean
}

interface AuthState {
  user:       AuthUser | null
  isLoggedIn: boolean
  isLoading:  boolean
}

export const AuthContext = createContext<{
  state:          AuthState
  login:          (email: string, password: string) => Promise<void>
  logout:         () => Promise<void>
  getToken:       () => string | null
  refreshSession: () => Promise<void>
}>({
  state:          { user: null, isLoggedIn: false, isLoading: true },
  login:          async () => {},
  logout:         async () => {},
  getToken:       () => null,
  refreshSession: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null, isLoggedIn: false, isLoading: true,
  })

  useEffect(() => {
    const reqId = axios.interceptors.request.use(config => {
      if (memoryToken) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${memoryToken}`
      }
      return config
    })

    const resId = axios.interceptors.response.use(
      res => res,
      async err => {
        const orig = err.config
        if (err.response?.status === 401 && !orig._retry) {
          orig._retry = true
          try {
            const { data } = await axios.post(
              `${AUTH_BASE}/auth/refresh`, {}, { withCredentials: true }
            )
            memoryToken = data.access_token
            orig.headers.Authorization = `Bearer ${memoryToken}`
            return axios(orig)
          } catch {
            memoryToken = null
            setState({ user: null, isLoggedIn: false, isLoading: false })
          }
        }
        return Promise.reject(err)
      }
    )

    return () => {
      axios.interceptors.request.eject(reqId)
      axios.interceptors.response.eject(resId)
    }
  }, [])

  useEffect(() => { refreshSession() }, [])

  const refreshSession = async () => {
    try {
      const { data } = await axios.post(
        `${AUTH_BASE}/auth/refresh`, {}, { withCredentials: true }
      )
      memoryToken = data.access_token
      const { data: user } = await axios.get(`${AUTH_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${memoryToken}` }
      })
      setState({ user, isLoggedIn: true, isLoading: false })
    } catch {
      setState({ user: null, isLoggedIn: false, isLoading: false })
    }
  }

  const login = async (email: string, password: string) => {
    const { data } = await axios.post(
      `${AUTH_BASE}/auth/login/email`,
      { email, password, app_id: APP_ID },
      { withCredentials: true }
    )
    memoryToken = data.access_token
    setState({ user: data.user, isLoggedIn: true, isLoading: false })
  }

  const logout = async () => {
    try {
      await axios.post(`${AUTH_BASE}/auth/logout`, {}, { withCredentials: true })
    } catch {}
    memoryToken = null
    setState({ user: null, isLoggedIn: false, isLoading: false })
  }

  return (
    <AuthContext.Provider value={{
      state, login, logout,
      getToken: () => memoryToken,
      refreshSession,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---

## STEP 4 — Create src/components/AuthModal.tsx

```typescript
'use client'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE || 'http://localhost:4001/api/v1'
const APP_ID    = process.env.NEXT_PUBLIC_APP_ID    || 'wtt'

// WTT accent: Saffron / Amber
const ACCENT = 'bg-amber-600 hover:bg-amber-700'
const RING   = 'focus:ring-amber-500'
const LINK   = 'text-amber-600 hover:text-amber-700'

type Mode = 'login' | 'register' | 'otp' | 'forgot'

interface Props {
  isOpen:  boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: Props) {
  const { login } = useAuth()
  const [mode, setMode]         = useState<Mode>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [otp, setOtp]           = useState('')
  const [userId, setUserId]     = useState('')
  const [otpType, setOtpType]   = useState('')
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [timer, setTimer]       = useState(0)

  if (!isOpen) return null

  const inp = `w-full border border-gray-200 rounded-xl px-4 py-3
               text-sm focus:outline-none focus:ring-2 ${RING} transition-all`
  const reset = () => { setError(''); setSuccess('') }

  const handleLogin = async () => {
    setLoading(true); reset()
    try {
      await login(email, password)
      onClose()
    } catch (e: any) {
      setError(e.response?.data?.message || 'Login failed.')
    } finally { setLoading(false) }
  }

  const handleRegister = async () => {
    setLoading(true); reset()
    try {
      const { data } = await axios.post(`${AUTH_BASE}/auth/register/email`, {
        email, password, name, app_id: APP_ID
      })
      setUserId(data.user_id)
      setOtpType('email_register')
      setMode('otp')
      startTimer()
    } catch (e: any) {
      setError(e.response?.data?.message || 'Registration failed.')
    } finally { setLoading(false) }
  }

  const handleVerifyOtp = async () => {
    setLoading(true); reset()
    try {
      await axios.post(
        `${AUTH_BASE}/auth/verify/otp`,
        { user_id: userId, otp, type: otpType },
        { withCredentials: true }
      )
      window.location.reload()
    } catch (e: any) {
      setError(e.response?.data?.message || 'Invalid code.')
    } finally { setLoading(false) }
  }

  const handleResend = async () => {
    if (timer > 0) return
    try {
      await axios.post(`${AUTH_BASE}/auth/resend-otp`, {
        user_id: userId, identifier: email, type: otpType, channel: 'email'
      })
      startTimer()
      setSuccess('New code sent!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to resend.')
    }
  }

  const handleForgot = async () => {
    setLoading(true); reset()
    try {
      await axios.post(`${AUTH_BASE}/auth/forgot-password`, { email, app_id: APP_ID })
      setSuccess('Reset link sent if this email is registered.')
    } catch (e: any) {
      setError(e.response?.data?.message || 'Request failed.')
    } finally { setLoading(false) }
  }

  const startTimer = () => {
    setTimer(60)
    const id = setInterval(() => {
      setTimer(t => { if (t <= 1) { clearInterval(id); return 0 } return t - 1 })
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/50 backdrop-blur-sm px-4"
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'login'    && '🙏 Welcome back'}
            {mode === 'register' && '🙏 Create account'}
            {mode === 'otp'      && 'Verify your email'}
            {mode === 'forgot'   && 'Reset your password'}
          </h2>
          <button onClick={onClose}
            className="text-gray-400 hover:text-gray-600 w-8 h-8
                       flex items-center justify-center rounded-lg
                       hover:bg-gray-100 transition-colors text-xl">✕</button>
        </div>

        {error   && <div className="bg-red-50 text-red-600 text-sm px-4 py-3
                                    rounded-xl mb-4 border border-red-100">{error}</div>}
        {success && <div className="bg-green-50 text-green-700 text-sm px-4 py-3
                                    rounded-xl mb-4 border border-green-100">{success}</div>}

        {mode === 'login' && (
          <div className="space-y-4">
            <input className={inp} type="email" placeholder="Email address"
              value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <input className={inp} type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <button onClick={handleLogin} disabled={loading}
              className={`w-full ${ACCENT} text-white py-3 rounded-xl
                         font-semibold text-sm transition-colors disabled:opacity-50`}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div className="flex justify-between text-sm text-gray-500">
              <button onClick={() => { setMode('forgot'); reset() }} className={LINK}>
                Forgot password?</button>
              <button onClick={() => { setMode('register'); reset() }}
                className={`${LINK} font-medium`}>Create account →</button>
            </div>
          </div>
        )}

        {mode === 'register' && (
          <div className="space-y-4">
            <input className={inp} type="text" placeholder="Full name"
              value={name} onChange={e => setName(e.target.value)} />
            <input className={inp} type="email" placeholder="Email address"
              value={email} onChange={e => setEmail(e.target.value)} />
            <input className={inp} type="password"
              placeholder="Password (min 8 chars, 1 uppercase, 1 number)"
              value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister} disabled={loading}
              className={`w-full ${ACCENT} text-white py-3 rounded-xl
                         font-semibold text-sm transition-colors disabled:opacity-50`}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <button onClick={() => { setMode('login'); reset() }}
                className={`${LINK} font-medium`}>Sign in</button>
            </p>
          </div>
        )}

        {mode === 'otp' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 text-center">
              Code sent to <span className="font-medium text-gray-800">{email}</span>
            </p>
            <input
              className={`${inp} text-center text-3xl tracking-[0.5em] font-mono`}
              type="text" placeholder="000000" maxLength={6}
              value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              onKeyDown={e => e.key === 'Enter' && otp.length === 6 && handleVerifyOtp()} />
            <button onClick={handleVerifyOtp} disabled={loading || otp.length !== 6}
              className={`w-full ${ACCENT} text-white py-3 rounded-xl
                         font-semibold text-sm transition-colors disabled:opacity-50`}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            <p className="text-center text-sm text-gray-400">
              Didn't receive it?{' '}
              <button onClick={handleResend} disabled={timer > 0}
                className={`${LINK} disabled:text-gray-400`}>
                {timer > 0 ? `Resend in ${timer}s` : 'Resend code'}
              </button>
            </p>
          </div>
        )}

        {mode === 'forgot' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Enter your email and we'll send a reset link.
            </p>
            <input className={inp} type="email" placeholder="Email address"
              value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={handleForgot} disabled={loading}
              className={`w-full ${ACCENT} text-white py-3 rounded-xl
                         font-semibold text-sm transition-colors disabled:opacity-50`}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <p className="text-center text-sm">
              <button onClick={() => { setMode('login'); reset() }}
                className={LINK}>← Back to login</button>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
```

---

## STEP 5 — Wrap with AuthProvider

Update `app/layout.tsx`:

```typescript
import { AuthProvider } from '../hooks/useAuth'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

---

## STEP 6 — Verify

```bash
pnpm run dev

# Open http://localhost:3003
# 1. Login modal opens with saffron/amber theme
# 2. Register → OTP email → verify → logged in
# 3. Refresh → still logged in
# 4. Logout → cleared
```
