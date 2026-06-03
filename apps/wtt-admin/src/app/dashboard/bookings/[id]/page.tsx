'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function AdminBookingDetailPage() {
  const params = useParams()
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('wtt_admin_token')
    if (token) {
      api.get<any[]>('/admin/bookings', token).then((list) => {
        const b = list.find((b) => b.id === params.id)
        if (b) setBooking(b)
      }).catch(() => {})
    }
  }, [params.id])

  if (!booking) return <AdminLayout><div className="p-8 text-gray-400">Loading…</div></AdminLayout>

  return (
    <AdminLayout>
      <div className="p-8 max-w-xl">
        <Link href="/dashboard/bookings" className="text-sm text-gray-500 hover:text-gray-700">← Bookings</Link>
        <h1 className="text-2xl font-bold mt-2 mb-6">{booking.bookingNumber}</h1>
        <div className="bg-white rounded-xl border p-5 space-y-2 text-sm">
          {Object.entries({
            Status: booking.status,
            Payment: booking.paymentStatus,
            Contact: `${booking.contactName} · ${booking.contactMobile}`,
            Email: booking.contactEmail || '—',
            Adults: booking.adults,
            Children: booking.children || 0,
            'Total Amount': `₹${booking.totalAmount}`,
            'Pickup Point': booking.pickupPoint || '—',
            'Special Req': booking.specialRequirements || '—',
          }).map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-gray-500">{k}</span>
              <span className="font-medium">{String(v)}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
