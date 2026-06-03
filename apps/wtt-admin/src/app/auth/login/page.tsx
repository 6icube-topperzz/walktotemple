'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post<{ token: string; user: { role: string } }>('/auth/login', { email, password })
      if (res.user.role !== 'admin') throw new Error('Admin access required')
      localStorage.setItem('wtt_admin_token', res.token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-8">
        <h1 className="text-xl font-bold text-center mb-1">WalkToTemple Admin</h1>
        <p className="text-center text-gray-400 text-sm mb-6">Admin access only</p>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-3 py-2 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-semibold text-sm disabled:opacity-60">
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </main>
  )
}
