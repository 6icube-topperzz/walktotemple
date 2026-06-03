import Link from 'next/link'
import { packages as allPackages, upcomingDepartures } from '@/data/packages'

function SeatBar({ booked, total }: { booked: number; total: number }) {
  const pct = Math.round((booked / total) * 100)
  const left = total - booked
  const isUrgent = left <= 5
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isUrgent ? 'bg-red-400' : pct > 60 ? 'bg-amber-400' : 'bg-green-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-semibold whitespace-nowrap ${isUrgent ? 'text-red-500' : 'text-gray-600'}`}>
        {left}/{total} seats {isUrgent ? '🔥' : ''}
      </span>
    </div>
  )
}

export default function UpcomingDepartures() {
  const departures = upcomingDepartures.slice(0, 5).map(d => ({
    ...d,
    pkg: allPackages.find(p => p.slug === d.packageSlug),
  }))

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">Upcoming Departures — Book Fast 🔥</h2>
          <p className="text-gray-500">Limited seats per trip</p>
        </div>

        <div className="space-y-3">
          {departures.map(d => {
            if (!d.pkg) return null
            const dateObj = new Date(d.date)
            const dayName = dateObj.toLocaleDateString('en-IN', { weekday: 'short' })
            const dateStr = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
            return (
              <div key={d.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  {/* Date badge */}
                  <div className="shrink-0 w-14 text-center">
                    <div className="text-lg font-bold text-saffron leading-none">{dateObj.getDate()}</div>
                    <div className="text-xs text-gray-500">{dateObj.toLocaleDateString('en-IN', { month: 'short' })}</div>
                    <div className="text-xs text-gray-400">{dayName}</div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-gray-900 truncate">{d.pkg.nameEn}</h3>
                      <span className="shrink-0 text-xs bg-orange-50 text-saffron-dark px-2 py-0.5 rounded-full">
                        {d.pkg.durationDays}D{d.pkg.durationNights > 0 ? `/${d.pkg.durationNights}N` : ''}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">🚌 From Hyderabad · ₹{d.pkg.pricePerPerson.toLocaleString()} / person</p>
                    <SeatBar booked={d.bookedSeats} total={d.totalSeats} />
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/packages/${d.packageSlug}`}
                    className="shrink-0 bg-saffron hover:bg-saffron-dark text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Book →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/pilgrimages"
            className="text-saffron hover:text-saffron-dark font-medium text-sm inline-flex items-center gap-1">
            View All Departures →
          </Link>
        </div>
      </div>
    </section>
  )
}
