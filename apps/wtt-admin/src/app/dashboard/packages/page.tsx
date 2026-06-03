'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

interface Package { id: string; nameEn: string; slug: string; region: string; durationDays: number; isActive: boolean; totalBookings: number }

export default function PackagesListPage() {
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    const token = localStorage.getItem('wtt_admin_token')
    if (token) api.get<Package[]>('/admin/packages', token).then(setPackages).catch(() => {})
  }, [])

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Packages</h1>
          <Link href="/dashboard/packages/add" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add Package
          </Link>
        </div>
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Name', 'Region', 'Duration', 'Bookings', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.nameEn}</td>
                  <td className="px-4 py-3 text-gray-500">{p.region}</td>
                  <td className="px-4 py-3 text-gray-500">{p.durationDays}D</td>
                  <td className="px-4 py-3">{p.totalBookings}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/packages/${p.id}`} className="text-primary hover:underline text-xs mr-3">Edit</Link>
                    <Link href={`/dashboard/packages/${p.id}/itinerary`} className="text-gray-500 hover:underline text-xs mr-3">Itinerary</Link>
                    <Link href={`/dashboard/packages/${p.id}/departures`} className="text-gray-500 hover:underline text-xs">Departures</Link>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No packages yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
