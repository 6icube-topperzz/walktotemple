'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post<{ token: string }>('/auth/register', form)
      localStorage.setItem('wtt_token', res.token)
      router.push('/packages')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-center mb-1">Create account</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Start your pilgrimage journey</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'fullName', label: 'Full name', type: 'text', placeholder: 'Ravi Kumar' },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { key: 'mobile', label: 'Mobile', type: 'tel', placeholder: '+91 98765 43210' },
            { key: 'password', label: 'Password', type: 'password', placeholder: 'Min. 8 characters' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                required
                value={form[key as keyof typeof form]}
                onChange={set(key as keyof typeof form)}
                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                placeholder={placeholder}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-saffron hover:bg-saffron-dark text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-saffron hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}
