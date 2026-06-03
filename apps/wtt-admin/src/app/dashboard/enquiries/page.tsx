'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('wtt_admin_token')
    if (token) api.get<any[]>('/admin/enquiries', token).then(setEnquiries).catch(() => {})
  }, [])

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Enquiries</h1>
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Name', 'Mobile', 'Persons', 'Preferred Date', 'Message', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3">{e.mobile}</td>
                  <td className="px-4 py-3">{e.persons}</td>
                  <td className="px-4 py-3 text-gray-500">{e.preferredDate || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{e.message || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${e.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN') : ''}</td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No enquiries yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
