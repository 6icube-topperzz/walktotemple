'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('wtt_admin_token')
    if (token) api.get<any[]>('/reviews', token).then(setReviews).catch(() => {})
  }, [])

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Reviews</h1>
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{'⭐'.repeat(r.rating)}</span>
                {r.title && <span className="font-medium">{r.title}</span>}
                {r.isVerified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>}
              </div>
              <p className="text-sm text-gray-600">{r.reviewText}</p>
              <p className="text-xs text-gray-400 mt-1">{r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : ''}</p>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-gray-400 text-center py-8">No reviews yet.</p>}
        </div>
      </div>
    </AdminLayout>
  )
}
