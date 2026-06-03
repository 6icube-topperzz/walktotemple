'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import type { Booking } from '@/types'

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('wtt_token')
    if (!token) { router.push('/auth/login'); return }
    api.get<Booking[]>('/bookings', token)
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading bookings…</div>

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-hero text-white py-10 px-6 text-center">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No bookings yet.</p>
            <Link href="/packages" className="bg-saffron text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
              Browse Packages
            </Link>
          </div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{b.bookingNumber}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{b.contactName} · {b.adults} adults</p>
                  <p className="text-sm text-gray-500">{b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN') : ''}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-600'}`}>
                    {b.status}
                  </span>
                  <p className="text-saffron font-bold mt-1">₹{b.totalAmount}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/my-bookings/${b.id}`}
                  className="flex-1 text-center border border-saffron text-saffron text-sm py-2 rounded-lg hover:bg-orange-50 transition">
                  View Details
                </Link>
                {b.status === 'confirmed' && (
                  <button className="flex-1 border border-red-300 text-red-500 text-sm py-2 rounded-lg hover:bg-red-50 transition">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
