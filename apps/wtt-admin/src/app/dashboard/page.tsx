'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

interface Stats {
  totalBookingsThisMonth: number
  revenueThisMonth: number
  pendingEnquiries: number
  totalBookings: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('wtt_admin_token')
    if (token) api.get<Stats>('/admin/stats', token).then(setStats).catch(() => {})
  }, [])

  const cards = stats
    ? [
        { label: 'Bookings this month', value: stats.totalBookingsThisMonth, icon: '📋' },
        { label: 'Revenue this month', value: `₹${stats.revenueThisMonth?.toFixed(0) || 0}`, icon: '💰' },
        { label: 'Pending enquiries', value: stats.pendingEnquiries, icon: '📩' },
        { label: 'Total bookings', value: stats.totalBookings, icon: '🧾' },
      ]
    : []

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="bg-white rounded-xl border p-5">
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-2xl font-bold text-primary">{c.value}</div>
              <div className="text-sm text-gray-500 mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
