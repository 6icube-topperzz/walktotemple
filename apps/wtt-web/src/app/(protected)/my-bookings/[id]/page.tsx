'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { api } from '@/lib/api'
import type { Booking } from '@/types'

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('wtt_token')
    if (!token) { router.push('/auth/login'); return }
    api.get<Booking>(`/bookings/${params.id}`, token)
      .then(setBooking)
      .catch(() => router.push('/my-bookings'))
      .finally(() => setLoading(false))
  }, [params.id, router])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>
  if (!booking) return null

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-hero text-white py-10 px-6">
        <Link href="/my-bookings" className="text-gray-300 text-sm hover:text-white">← My Bookings</Link>
        <h1 className="text-2xl font-bold mt-2">Booking #{booking.bookingNumber}</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        <div className="bg-white rounded-xl border p-5 space-y-3 text-sm">
          <Row label="Status" value={booking.status.toUpperCase()} />
          <Row label="Payment" value={booking.paymentStatus.toUpperCase()} />
          <Row label="Adults" value={String(booking.adults)} />
          <Row label="Children" value={String(booking.children ?? 0)} />
          <Row label="Total" value={`₹${booking.totalAmount}`} />
          <Row label="Contact" value={`${booking.contactName} · ${booking.contactMobile}`} />
          <Row label="Booked on" value={booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' }) : '—'} />
        </div>
      </div>
    </main>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  )
}
