import { packages } from '@/data/packages'
import PackageCard from '@/components/PackageCard'
import { upcomingDepartures } from '@/data/packages'

interface Props {
  searchParams: Promise<{ q?: string; deity?: string; state?: string; duration?: string; group?: string }>
}

export default async function TemplesPage({ searchParams }: Props) {
  const params = await searchParams
  const { q, deity, state, duration, group } = params

  let filtered = packages.filter(p => p.isActive)

  if (q) filtered = filtered.filter(p =>
    p.nameEn.toLowerCase().includes(q.toLowerCase()) ||
    p.deity.toLowerCase().includes(q.toLowerCase()) ||
    p.state.toLowerCase().includes(q.toLowerCase())
  )
  if (deity) filtered = filtered.filter(p => p.deity.toLowerCase().includes(deity.toLowerCase()))
  if (state) filtered = filtered.filter(p => p.state.toLowerCase().includes(state.toLowerCase()))
  if (duration) {
    const d = parseInt(duration)
    if (d === 1) filtered = filtered.filter(p => p.durationDays === 1)
    else if (d === 2) filtered = filtered.filter(p => p.durationDays >= 2 && p.durationDays <= 3)
    else if (d === 4) filtered = filtered.filter(p => p.durationDays >= 4 && p.durationDays < 7)
    else if (d === 7) filtered = filtered.filter(p => p.durationDays >= 7)
  }

  const heading = q ? `Results for "${q}"` :
    deity ? `${deity} Temples` :
    state ? `Temples in ${state}` :
    duration ? `${duration === '1' ? 'Day Trip' : duration === '2' ? 'Weekend' : 'Extended'} Packages` :
    group ? `${group.charAt(0).toUpperCase() + group.slice(1)} Packages` :
    'All Temple Packages'

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">{heading}</h1>
        <p className="text-sm text-gray-500 mt-1">{filtered.length} packages available</p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🛕</div>
          <p className="text-lg">No packages found. Try a different filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(pkg => {
            const dep = upcomingDepartures.find(d => d.packageSlug === pkg.slug)
            return (
              <PackageCard
                key={pkg.slug}
                pkg={pkg}
                nextDate={dep?.date}
                seatsLeft={dep ? dep.totalSeats - dep.bookedSeats : undefined}
              />
            )
          })}
        </div>
      )}
    </main>
  )
}
