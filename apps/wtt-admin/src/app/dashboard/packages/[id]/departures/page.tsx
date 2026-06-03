'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function DeparturesPage() {
  const params = useParams()
  const [departures, setDepartures] = useState<any[]>([])
  const [form, setForm] = useState({ departureDate: '', returnDate: '', totalSeats: '', priceOverride: '', notes: '' })
  const [saving, setSaving] = useState(false)

  const token = () => localStorage.getItem('wtt_admin_token') || ''

  useEffect(() => {
    api.get<any[]>('/admin/packages', token()).then((pkgs) => {
      const pkg = pkgs.find((p: any) => p.id === params.id)
      if (pkg) {
        api.get<any[]>(`/packages/${pkg.slug}/departures`, token()).then(setDepartures).catch(() => {})
      }
    }).catch(() => {})
  }, [params.id])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/admin/departures', {
        packageId: params.id,
        departureDate: form.departureDate,
        returnDate: form.returnDate,
        totalSeats: parseInt(form.totalSeats),
        priceOverride: form.priceOverride || null,
        notes: form.notes || null,
      }, token())
      setForm({ departureDate: '', returnDate: '', totalSeats: '', priceOverride: '', notes: '' })
      alert('Departure added!')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Manage Departures</h1>

        {departures.map((d) => (
          <div key={d.id} className="bg-white rounded-xl border p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{new Date(d.departureDate).toLocaleDateString('en-IN')} → {new Date(d.returnDate).toLocaleDateString('en-IN')}</p>
              <p className="text-sm text-gray-500">{d.bookedSeats}/{d.totalSeats} booked · {d.status}</p>
            </div>
            {d.priceOverride && <p className="text-saffron font-bold">₹{d.priceOverride}</p>}
          </div>
        ))}

        <form onSubmit={handleAdd} className="bg-white rounded-xl border p-5 space-y-3">
          <h2 className="font-semibold">Add Departure</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Departure Date</label>
              <input type="date" required value={form.departureDate} onChange={(e) => setForm((f) => ({ ...f, departureDate: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Return Date</label>
              <input type="date" required value={form.returnDate} onChange={(e) => setForm((f) => ({ ...f, returnDate: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Total seats" type="number" required value={form.totalSeats} onChange={(e) => setForm((f) => ({ ...f, totalSeats: e.target.value }))} className="border rounded-lg px-3 py-2 text-sm" />
            <input placeholder="Price override (optional)" value={form.priceOverride} onChange={(e) => setForm((f) => ({ ...f, priceOverride: e.target.value }))} className="border rounded-lg px-3 py-2 text-sm" />
          </div>
          <input placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />
          <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-60">
            {saving ? 'Adding…' : 'Add Departure'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
