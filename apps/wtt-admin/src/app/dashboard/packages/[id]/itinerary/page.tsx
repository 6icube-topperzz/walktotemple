'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function ItineraryPage() {
  const params = useParams()
  const [days, setDays] = useState<any[]>([])
  const [form, setForm] = useState({ dayNumber: '', titleEn: '', descriptionEn: '', activities: '', breakfast: false, lunch: false, dinner: false, overnightStay: '' })
  const [saving, setSaving] = useState(false)

  const token = () => localStorage.getItem('wtt_admin_token') || ''

  useEffect(() => {
    api.get<any[]>(`/admin/packages/${params.id}/itinerary`, token()).then(setDays).catch(() => {})
  }, [params.id])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post(`/admin/packages/${params.id}/itinerary`, {
        ...form,
        dayNumber: parseInt(form.dayNumber),
        activities: form.activities.split('\n').filter(Boolean),
      }, token())
      const updated = await api.get<any[]>(`/admin/packages/${params.id}/itinerary`, token())
      setDays(updated)
      setForm({ dayNumber: '', titleEn: '', descriptionEn: '', activities: '', breakfast: false, lunch: false, dinner: false, overnightStay: '' })
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Itinerary</h1>

        {days.map((d) => (
          <div key={d.id} className="bg-white rounded-xl border p-4">
            <p className="font-medium">Day {d.dayNumber}: {d.titleEn}</p>
            <p className="text-sm text-gray-500 mt-1">{d.descriptionEn}</p>
            <div className="flex gap-2 text-xs text-gray-400 mt-2">
              {d.breakfast && <span>Breakfast</span>}
              {d.lunch && <span>Lunch</span>}
              {d.dinner && <span>Dinner</span>}
              {d.overnightStay && <span>Stay: {d.overnightStay}</span>}
            </div>
          </div>
        ))}

        <form onSubmit={handleAdd} className="bg-white rounded-xl border p-5 space-y-3">
          <h2 className="font-semibold">Add Day</h2>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Day #" type="number" value={form.dayNumber} onChange={(e) => setForm((f) => ({ ...f, dayNumber: e.target.value }))} required className="border rounded-lg px-3 py-2 text-sm" />
            <input placeholder="Title" value={form.titleEn} onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))} required className="border rounded-lg px-3 py-2 text-sm" />
          </div>
          <textarea placeholder="Description" value={form.descriptionEn} onChange={(e) => setForm((f) => ({ ...f, descriptionEn: e.target.value }))} rows={2} required className="w-full border rounded-lg px-3 py-2 text-sm" />
          <textarea placeholder="Activities (one per line)" value={form.activities} onChange={(e) => setForm((f) => ({ ...f, activities: e.target.value }))} rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" />
          <input placeholder="Overnight stay" value={form.overnightStay} onChange={(e) => setForm((f) => ({ ...f, overnightStay: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />
          <div className="flex gap-4 text-sm">
            {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
              <label key={meal} className="flex items-center gap-1 capitalize">
                <input type="checkbox" checked={form[meal]} onChange={(e) => setForm((f) => ({ ...f, [meal]: e.target.checked }))} />
                {meal}
              </label>
            ))}
          </div>
          <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-60">
            {saving ? 'Saving…' : 'Add Day'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
