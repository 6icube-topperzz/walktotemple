'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Package, DepartureDate, PickupPoint } from '@/data/packages'

interface Props {
  pkg: Package
  departures: DepartureDate[]
  pickupPoints: PickupPoint[]
}

export default function BookingPanel({ pkg, departures, pickupPoints }: Props) {
  const router = useRouter()
  const [selectedDep, setSelectedDep] = useState(departures[0]?.id || '')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [seniors, setSeniors] = useState(0)
  const [pickup, setPickup] = useState('')

  const dep = departures.find(d => d.id === selectedDep)
  const price = dep?.price || pkg.pricePerPerson
  const childPrice = pkg.priceChild || Math.round(price * 0.5)
  const seniorPrice = Math.round(price * 0.85)

  const subtotal = adults * price + children * childPrice + seniors * seniorPrice
  const gst = Math.round(subtotal * 0.05)
  const total = subtotal + gst

  function handleBook() {
    if (!selectedDep) return alert('Please select a departure date')
    router.push(`/booking/${pkg.slug}?dep=${selectedDep}&adults=${adults}&children=${children}&seniors=${seniors}&pickup=${pickup}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Price header */}
      <div className="bg-hero text-white p-5">
        <p className="text-gray-300 text-sm mb-0.5">{pkg.nameEn}</p>
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-3xl font-semibold text-saffron">₹{price.toLocaleString()}</span>
          <span className="text-gray-300 text-sm">/ person</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {['AC Transport', 'Accommodation', 'Darshan', 'Meals'].map(i => (
            <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-300">✓ {i}</span>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Departure selection */}
        {departures.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Departure Date</label>
            <div className="space-y-2">
              {departures.map(d => {
                const avail = d.totalSeats - d.bookedSeats
                const pct = Math.round((d.bookedSeats / d.totalSeats) * 100)
                const isUrgent = avail <= 5
                return (
                  <label
                    key={d.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedDep === d.id ? 'border-saffron bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="departure"
                      value={d.id}
                      checked={selectedDep === d.id}
                      onChange={() => setSelectedDep(d.id)}
                      className="accent-saffron"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', weekday: 'short' })}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1 bg-gray-100 rounded-full">
                          <div className={`h-full rounded-full ${isUrgent ? 'bg-red-400' : pct > 60 ? 'bg-amber-400' : 'bg-green-400'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className={`text-xs font-medium ${isUrgent ? 'text-red-500' : 'text-gray-500'}`}>
                          {avail} left {isUrgent ? '🔥' : ''}
                        </span>
                      </div>
                    </div>
                    {d.price && d.price !== pkg.pricePerPerson && (
                      <span className="text-xs text-saffron font-bold">₹{d.price.toLocaleString()}</span>
                    )}
                  </label>
                )
              })}
            </div>
          </div>
        )}

        {/* Persons */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Persons</label>
          <div className="space-y-2">
            {[
              { label: 'Adults', value: adults, set: setAdults, min: 1, sub: `₹${price.toLocaleString()}` },
              { label: 'Children (5–12)', value: children, set: setChildren, min: 0, sub: `₹${childPrice.toLocaleString()}` },
              { label: 'Senior (60+)', value: seniors, set: setSeniors, min: 0, sub: `₹${seniorPrice.toLocaleString()}` },
            ].map(({ label, value, set, min, sub }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-700">{label}</span>
                  <span className="text-xs text-gray-400 ml-1">{sub}/person</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => set(Math.max(min, value - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-saffron hover:text-saffron text-gray-600 flex items-center justify-center text-lg font-bold transition-colors">
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{value}</span>
                  <button onClick={() => set(value + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-saffron hover:text-saffron text-gray-600 flex items-center justify-center text-lg font-bold transition-colors">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pickup point */}
        {pickupPoints.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Point</label>
            <select
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
            >
              <option value="">Select pickup point…</option>
              {pickupPoints.map(p => (
                <option key={p.id} value={p.id}>{p.city} — {p.location} ({p.time})</option>
              ))}
            </select>
          </div>
        )}

        {/* Price breakdown */}
        <div className="bg-cream rounded-xl p-4 space-y-1.5 text-sm">
          {adults > 0 && <div className="flex justify-between text-gray-600"><span>{adults} × Adults</span><span>₹{(adults * price).toLocaleString()}</span></div>}
          {children > 0 && <div className="flex justify-between text-gray-600"><span>{children} × Children</span><span>₹{(children * childPrice).toLocaleString()}</span></div>}
          {seniors > 0 && <div className="flex justify-between text-gray-600"><span>{seniors} × Senior</span><span>₹{(seniors * seniorPrice).toLocaleString()}</span></div>}
          <div className="flex justify-between text-gray-500 text-xs pt-1 border-t border-orange-100"><span>GST (5%)</span><span>₹{gst.toLocaleString()}</span></div>
          <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-orange-200">
            <span>Total</span>
            <span className="text-saffron">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* CTAs */}
        <button
          onClick={handleBook}
          className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm"
        >
          Proceed to Book →
        </button>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 border-2 border-green-500 text-green-700 hover:bg-green-50 font-medium py-3 rounded-xl transition-colors text-sm"
        >
          <span>💬</span> Enquire on WhatsApp
        </a>
      </div>
    </div>
  )
}
