import { packages, upcomingDepartures } from '@/data/packages'
import PackageCard from '@/components/PackageCard'

export default async function TemplesByDeityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const deityName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')

  const filtered = packages.filter(
    p => p.isActive && p.deity.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase())
  )
  const all = filtered.length > 0 ? filtered : packages.filter(p => p.isActive)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">
          <a href="/temples" className="hover:text-orange-500">Temples</a> · Deities
        </p>
        <h1 className="font-heading text-3xl font-semibold text-gray-900">{deityName} Temples</h1>
        <p className="text-sm text-gray-500 mt-1">{all.length} packages available</p>
      </div>
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
