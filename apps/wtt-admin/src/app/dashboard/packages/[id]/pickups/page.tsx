'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function PickupsPage() {
  const params = useParams()
  const [pickups, setPickups] = useState<any[]>([])
  const [form, setForm] = useState({ city: '', locationName: '', pickupTime: '' })
  const [saving, setSaving] = useState(false)

  const token = () => localStorage.getItem('wtt_admin_token') || ''

  useEffect(() => {
    api.get<any[]>(`/pickup-points/package/${params.id}`, token()).then(setPickups).catch(() => {})
  }, [params.id])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post(`/admin/packages/${params.id}/pickups`, form, token())
      const updated = await api.get<any[]>(`/pickup-points/package/${params.id}`, token())
      setPickups(updated)
      setForm({ city: '', locationName: '', pickupTime: '' })
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-lg space-y-6">
        <h1 className="text-2xl font-bold">Pickup Points</h1>
        {pickups.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border p-4">
            <p className="font-medium">{p.city} — {p.locationName}</p>
            <p className="text-sm text-gray-500">Pickup: {p.pickupTime}</p>
          </div>
        ))}
        <form onSubmit={handleAdd} className="bg-white rounded-xl border p-5 space-y-3">
          <h2 className="font-semibold">Add Pickup Point</h2>
          <input placeholder="City" required value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />
          <input placeholder="Location name" required value={form.locationName} onChange={(e) => setForm((f) => ({ ...f, locationName: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />
          <input type="time" required value={form.pickupTime} onChange={(e) => setForm((f) => ({ ...f, pickupTime: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />
          <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-60">
            {saving ? 'Adding…' : 'Add Pickup Point'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
