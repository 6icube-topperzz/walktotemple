'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function AddPackagePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nameEn: '', nameTe: '', slug: '', region: 'Telangana', startCity: '',
    durationDays: '1', durationNights: '0', pricePerPerson: '',
    descriptionEn: '', descriptionTe: '',
    inclusions: '', exclusions: '', highlights: '', templesCovered: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function toArray(val: string) {
    return val.split('\n').map((s) => s.trim()).filter(Boolean)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('wtt_admin_token')
      await api.post('/admin/packages', {
        ...form,
        durationDays: parseInt(form.durationDays),
        durationNights: parseInt(form.durationNights),
        inclusions: toArray(form.inclusions),
        exclusions: toArray(form.exclusions),
        highlights: toArray(form.highlights),
        templesCovered: toArray(form.templesCovered),
      }, token || undefined)
      router.push('/dashboard/packages')
    } catch (err: any) {
      setError(err.message || 'Failed to create package')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add Package</h1>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-3 py-2 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl border p-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name (EN)" value={form.nameEn} onChange={set('nameEn')} required />
            <Field label="Name (TE)" value={form.nameTe} onChange={set('nameTe')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug" value={form.slug} onChange={set('slug')} required placeholder="yadadri-day-trip" />
            <Field label="Start City" value={form.startCity} onChange={set('startCity')} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <select value={form.region} onChange={set('region')} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option>Telangana</option>
                <option>Andhra Pradesh</option>
              </select>
            </div>
            <Field label="Days" value={form.durationDays} onChange={set('durationDays')} type="number" required />
            <Field label="Nights" value={form.durationNights} onChange={set('durationNights')} type="number" required />
          </div>
          <Field label="Price per person (₹)" value={form.pricePerPerson} onChange={set('pricePerPerson')} required />
          <div>
            <label className="block text-sm font-medium mb-1">Description (EN)</label>
            <textarea value={form.descriptionEn} onChange={set('descriptionEn')} rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm" required />
          </div>
          <TextareaField label="Temples covered (one per line)" value={form.templesCovered} onChange={set('templesCovered')} />
          <TextareaField label="Highlights (one per line)" value={form.highlights} onChange={set('highlights')} />
          <TextareaField label="Inclusions (one per line)" value={form.inclusions} onChange={set('inclusions')} />
          <TextareaField label="Exclusions (one per line)" value={form.exclusions} onChange={set('exclusions')} />
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm disabled:opacity-60">
            {loading ? 'Creating…' : 'Create Package'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder = '' }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input type={type} value={value} onChange={onChange} required={required} placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm" />
    </div>
  )
}

function TextareaField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea value={value} onChange={onChange} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm" />
    </div>
  )
}
