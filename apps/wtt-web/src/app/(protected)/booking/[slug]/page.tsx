'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { api } from '@/lib/api'
import type { Package, DepartureDate } from '@/types'

type Step = 1 | 2 | 3 | 4

export default function BookingPage() {
  const params = useParams()
  const slug = params.slug as string
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [pkg, setPkg] = useState<Package | null>(null)
  const [departures, setDepartures] = useState<DepartureDate[]>([])
  const [selectedDeparture, setSelectedDeparture] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [travellers, setTravellers] = useState([{ fullName: '', age: '', gender: '', isLead: true }])
  const [pickupPoint, setPickupPoint] = useState('')
  const [contact, setContact] = useState({ name: '', mobile: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('wtt_token')
    if (!token) { router.push('/auth/login'); return }
    api.get<Package>(`/packages/${slug}`).then(setPkg).catch(() => router.push('/packages'))
    api.get<DepartureDate[]>(`/packages/${slug}/departures`).then(setDepartures).catch(() => {})
  }, [slug, router])

  async function handleConfirm() {
    const token = localStorage.getItem('wtt_token')
    if (!token) return
    setLoading(true)
    setError('')
    try {
      const booking = await api.post<{ id: string; bookingNumber: string; totalAmount: string }>(
        '/bookings/initiate',
        {
          departureDateId: selectedDeparture,
          adults,
          children,
          contactName: contact.name,
          contactMobile: contact.mobile,
          contactEmail: contact.email,
          pickupPoint,
          travellers: travellers.map((t) => ({ ...t, age: parseInt(t.age) })),
        },
        token,
      )
      router.push(`/booking/payment?bookingId=${booking.id}&amount=${booking.totalAmount}`)
    } catch (err: any) {
      setError(err.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  if (!pkg) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-hero text-white py-8 px-6 text-center">
        <h1 className="text-2xl font-bold">Book — {pkg.nameEn}</h1>
        <div className="flex justify-center gap-2 mt-4">
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-saffron text-white' : 'bg-gray-600 text-gray-300'}`}>
              {s}
            </div>
          ))}
        </div>
        <p className="text-gray-300 text-sm mt-2">
          {step === 1 && 'Select departure & persons'}
          {step === 2 && 'Traveller details'}
          {step === 3 && 'Pickup point'}
          {step === 4 && 'Review & pay'}
        </p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

        {step === 1 && (
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="font-bold text-lg">Select Departure</h2>
            <select
              value={selectedDeparture}
              onChange={(e) => setSelectedDeparture(e.target.value)}
              className="w-full border rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="">Choose a date…</option>
              {departures.map((d) => (
                <option key={d.id} value={d.id}>
                  {new Date(d.departureDate).toLocaleDateString('en-IN')} — {d.totalSeats - (d.bookedSeats ?? 0)} seats left
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Adults</label>
                <input type="number" min={1} value={adults} onChange={(e) => setAdults(parseInt(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2.5 text-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Children</label>
                <input type="number" min={0} value={children} onChange={(e) => setChildren(parseInt(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2.5 text-sm" />
              </div>
            </div>
            <button onClick={() => setStep(2)} disabled={!selectedDeparture}
              className="w-full bg-saffron text-white py-2.5 rounded-lg font-semibold disabled:opacity-50">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="font-bold text-lg">Traveller Details</h2>
            {travellers.map((t, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium text-gray-600">Traveller {i + 1}{t.isLead ? ' (Lead)' : ''}</p>
                <input placeholder="Full name" value={t.fullName}
                  onChange={(e) => setTravellers((arr) => arr.map((x, j) => j === i ? { ...x, fullName: e.target.value } : x))}
                  className="w-full border rounded-lg px-3 py-2 text-sm" />
                <div className="flex gap-2">
                  <input placeholder="Age" type="number" value={t.age}
                    onChange={(e) => setTravellers((arr) => arr.map((x, j) => j === i ? { ...x, age: e.target.value } : x))}
                    className="w-24 border rounded-lg px-3 py-2 text-sm" />
                  <select value={t.gender}
                    onChange={(e) => setTravellers((arr) => arr.map((x, j) => j === i ? { ...x, gender: e.target.value } : x))}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm">
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            ))}
            <div className="border rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Contact Details</p>
              <input placeholder="Contact name" value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Mobile" type="tel" value={contact.mobile}
                onChange={(e) => setContact((c) => ({ ...c, mobile: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Email (optional)" type="email" value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border py-2.5 rounded-lg text-sm">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-saffron text-white py-2.5 rounded-lg font-semibold text-sm">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="font-bold text-lg">Pickup Point</h2>
            <input placeholder="Enter your pickup location / city" value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              className="w-full border rounded-lg px-3 py-2.5 text-sm" />
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border py-2.5 rounded-lg text-sm">Back</button>
              <button onClick={() => setStep(4)} className="flex-1 bg-saffron text-white py-2.5 rounded-lg font-semibold text-sm">Next</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="font-bold text-lg">Review & Pay</h2>
            <div className="text-sm space-y-1 text-gray-700">
              <p><span className="font-medium">Package:</span> {pkg.nameEn}</p>
              <p><span className="font-medium">Adults:</span> {adults} · <span className="font-medium">Children:</span> {children}</p>
              <p><span className="font-medium">Pickup:</span> {pickupPoint || 'Not specified'}</p>
              <p><span className="font-medium">Contact:</span> {contact.name} · {contact.mobile}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 border py-2.5 rounded-lg text-sm">Back</button>
              <button onClick={handleConfirm} disabled={loading}
                className="flex-1 bg-saffron text-white py-2.5 rounded-lg font-semibold text-sm disabled:opacity-60">
                {loading ? 'Processing…' : 'Proceed to Pay'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
