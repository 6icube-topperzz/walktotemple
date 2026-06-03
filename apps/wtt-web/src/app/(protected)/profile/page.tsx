'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import type { User } from '@/types'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('wtt_token')
    if (!token) { router.push('/auth/login'); return }
    api.get<User>('/auth/me', token).then(setUser).catch(() => router.push('/auth/login'))
  }, [router])

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading…</div>

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-hero text-white py-10 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-saffron flex items-center justify-center text-2xl font-bold mx-auto mb-3">
          {user.fullName[0]}
        </div>
        <h1 className="text-xl font-bold">{user.fullName}</h1>
        <p className="text-gray-300 text-sm">{user.email}</p>
      </div>
      <div className="max-w-md mx-auto px-6 py-8 text-sm text-gray-700 space-y-2 bg-white rounded-xl border mt-6">
        <p><span className="font-medium">Mobile:</span> {user.mobile}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
      </div>
    </main>
  )
}
