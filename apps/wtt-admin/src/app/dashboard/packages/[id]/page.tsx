'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'

export default function EditPackagePage() {
  const params = useParams()
  const router = useRouter()
  const [form, setForm] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('wtt_admin_token')
    if (token) {
      api.get<any[]>('/admin/packages', token).then((pkgs) => {
        const pkg = pkgs.find((p) => p.id === params.id)
        if (pkg) setForm({
          ...pkg,
          inclusions: (pkg.inclusions || []).join('\n'),
          exclusions: (pkg.exclusions || []).join('\n'),
          highlights: (pkg.highlights || []).join('\n'),
          templesCovered: (pkg.templesCovered || []).join('\n'),
        })
      })
    }
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('wtt_admin_token')
      await api.put(`/admin/packages/${params.id}`, {
        ...form,
        inclusions: form.inclusions.split('\n').filter(Boolean),
        exclusions: form.exclusions.split('\n').filter(Boolean),
        highlights: form.highlights.split('\n').filter(Boolean),
        templesCovered: form.templesCovered.split('\n').filter(Boolean),
      }, token || undefined)
      router.push('/dashboard/packages')
    } catch (err: any) {
      setError(err.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  if (!form) return <AdminLayout><div className="p-8 text-gray-400">Loading…</div></AdminLayout>

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/packages" className="text-sm text-gray-500 hover:text-gray-700">← Packages</Link>
          <h1 className="text-2xl font-bold">Edit Package</h1>
        </div>
        <div className="flex gap-3 mb-6">
          <Link href={`/dashboard/packages/${params.id}/itinerary`} className="text-sm text-primary hover:underline">Manage Itinerary</Link>
          <Link href={`/dashboard/packages/${params.id}/departures`} className="text-sm text-primary hover:underline">Manage Departures</Link>
          <Link href={`/dashboard/packages/${params.id}/pickups`} className="text-sm text-primary hover:underline">Pickup Points</Link>
        </div>
        {error && <div className="bg-red-50 text-red-700 text-sm rounded px-3 py-2 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl border p-6">
          {[['Name (EN)', 'nameEn'], ['Name (TE)', 'nameTe'], ['Price/person', 'pricePerPerson']].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input value={form[key] || ''} onChange={(e) => setForm((f: any) => ({ ...f, [key]: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
          ))}
          {[['Temples covered', 'templesCovered'], ['Highlights', 'highlights'], ['Inclusions', 'inclusions'], ['Exclusions', 'exclusions']].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label} (one per line)</label>
              <textarea value={form[key] || ''} onChange={(e) => setForm((f: any) => ({ ...f, [key]: e.target.value }))}
                rows={3} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm disabled:opacity-60">
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
