'use client'
import { useState } from 'react'
import Link from 'next/link'

const festivals = [
  {
    name: 'Karthika Masam',
    date: 'Nov 2026',
    icon: '🪔',
    color: 'from-orange-600 to-amber-500',
    packages: ['Srisailam Karthika Special', 'Kaleshwaram Karthika Deepotsavam', 'Yadadri Karthika Darshan'],
    bookingNote: 'Booking opens: Sept 2026',
    href: '/festival/karthika',
    count: 3,
  },
  {
    name: 'Maha Shivaratri',
    date: 'Feb 2027',
    icon: '🔱',
    color: 'from-slate-700 to-slate-600',
    packages: ['Srisailam Overnight Special', 'Pan-India Jyotirlinga Circuit'],
    bookingNote: 'Early bird discount available',
    href: '/festival/shivaratri',
    count: 2,
  },
  {
    name: 'Brahmotsavam',
    date: 'Sept 2026',
    icon: '🪷',
    color: 'from-emerald-700 to-emerald-600',
    packages: ['Tirupati Brahmotsavam Darshan', 'Special accommodation arranged'],
    bookingNote: 'Advance booking required',
    href: '/festival/brahmotsavam',
    count: 1,
  },
  {
    name: 'Navratri',
    date: 'Oct 2026',
    icon: '🌺',
    color: 'from-pink-700 to-rose-600',
    packages: ['Kanaka Durga Navratri', 'Basara Saraswati Puja', 'Vijayawada Special'],
    bookingNote: 'Booking opens: Aug 2026',
    href: '/festival/navratri',
    count: 3,
  },
]

export default function FestivalPilgrimages() {
  const [start, setStart] = useState(0)
  const visible = 3

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">Upcoming Festival Pilgrimages 🎉</h2>
          <p className="text-gray-500">Special darshans during auspicious occasions</p>
        </div>

        <div className="relative">
          {start > 0 && (
            <button onClick={() => setStart(s => Math.max(0, s - 1))} className="carousel-arrow left-[-16px]">←</button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {festivals.slice(start, start + visible).map(f => (
              <div key={f.name} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className={`bg-gradient-to-r ${f.color} p-5 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl mb-1">{f.icon}</div>
                      <h3 className="font-heading text-xl font-semibold">{f.name}</h3>
                      <p className="text-white/80 text-sm">{f.date}</p>
                    </div>
                    <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                      {f.count} packages
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="space-y-1.5 mb-4">
                    {f.packages.map((p, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                        <span className="text-saffron mt-0.5">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">⏰ {f.bookingNote}</span>
                    <Link href={f.href} className="text-sm text-saffron font-semibold hover:text-saffron-dark">View →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {start + visible < festivals.length && (
            <button onClick={() => setStart(s => Math.min(festivals.length - visible, s + 1))} className="carousel-arrow right-[-16px]">→</button>
          )}
        </div>
      </div>
    </section>
  )
}
