'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('wtt_admin_token')
    if (token) api.get<any[]>('/admin/bookings', token).then(setBookings).catch(() => {})
  }, [])

  const filtered = filter ? bookings.filter((b) => b.status === filter) : bookings

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Bookings</h1>
          <div className="flex gap-2">
            {['', 'pending', 'confirmed', 'cancelled'].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-sm ${filter === s ? 'bg-primary text-white' : 'border text-gray-600 hover:border-primary hover:text-primary'}`}>
                {s || 'All'}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Booking #', 'Contact', 'Adults', 'Amount', 'Status', 'Payment', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{b.bookingNumber}</td>
                  <td className="px-4 py-3">{b.contactName}<br /><span className="text-gray-400">{b.contactMobile}</span></td>
                  <td className="px-4 py-3">{b.adults}</td>
                  <td className="px-4 py-3 font-medium">₹{b.totalAmount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[b.status] || 'bg-gray-100'}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{b.paymentStatus}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN') : ''}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No bookings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
