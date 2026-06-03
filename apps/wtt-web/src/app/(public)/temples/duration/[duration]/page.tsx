import { packages, upcomingDepartures } from '@/data/packages'
import PackageCard from '@/components/PackageCard'

const DURATION_INFO: Record<string, { label: string; emoji: string; desc: string; days: number[] }> = {
  'day-trips': { label: 'Day Trips', emoji: '☀️', desc: 'Start at dawn, return by nightfall — perfect for quick darshans near your city.', days: [1] },
  weekend:     { label: 'Weekend Getaways', emoji: '🌙', desc: '2–3 day packages — depart Friday evening, return Sunday night.', days: [2, 3] },
  extended:    { label: 'Extended Yatras', emoji: '🗓️', desc: '4+ day spiritual journeys — deeper circuits, multiple temples, full immersion.', days: [4, 5, 6, 7, 8, 9, 10] },
}

export default async function TemplesByDurationPage({ params }: { params: Promise<{ duration: string }> }) {
  const { duration } = await params
  const info = DURATION_INFO[duration] ?? { label: 'Packages', emoji: '🛕', desc: '', days: [] }

  const filtered = info.days.length > 0
    ? packages.filter(p => p.isActive && info.days.includes(p.durationDays))
    : packages.filter(p => p.isActive)

  const all = filtered.length > 0 ? filtered : packages.filter(p => p.isActive)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{info.emoji}</span>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.label}</h1>
            {info.desc && <p className="text-gray-500 mt-1 text-sm">{info.desc}</p>}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-6">{all.length} packages available</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {all.map(pkg => {
          const dep = upcomingDepartures.find(d => d.packageSlug === pkg.slug)
          return (
            <PackageCard key={pkg.slug} pkg={pkg} nextDate={dep?.date}
              seatsLeft={dep ? dep.totalSeats - dep.bookedSeats : undefined} />
          )
        })}
      </div>
    </main>
  )
}
