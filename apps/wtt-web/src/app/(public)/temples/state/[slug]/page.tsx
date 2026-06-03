import { packages, upcomingDepartures } from '@/data/packages'
import PackageCard from '@/components/PackageCard'
import Link from 'next/link'

// States where packages are not yet launched
const COMING_SOON = new Set(['uttarakhand', 'himachal-pradesh'])

export default async function TemplesByStatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const stateName = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  if (COMING_SOON.has(slug)) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <span className="text-6xl block mb-4">🏔️</span>
        <h1 className="font-heading text-3xl font-semibold text-gray-900 mb-2">
          {stateName} Packages — Coming Soon
        </h1>
        <p className="text-gray-500 mb-6">
          We&apos;re working on carefully curated pilgrimage packages for {stateName}.
          Join the waitlist to be the first to know when they launch.
        </p>
        <div className="bg-amber-50 rounded-2xl p-6 border border-orange-100 mb-6">
          <p className="text-sm text-orange-800 font-medium mb-3">
            🙏 Join 5,000+ pilgrims waiting for this route
          </p>
          <form className="flex gap-2 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
              Notify Me
            </button>
          </form>
        </div>
        <Link href="/temples" className="text-sm text-orange-500 hover:underline">
          ← Browse other temple packages
        </Link>
      </main>
    )
  }

  const filtered = packages.filter(
    p => p.isActive && p.state.toLowerCase() === stateName.toLowerCase()
  )
  const all = filtered.length > 0 ? filtered : packages.filter(p => p.isActive)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">Temples in {stateName}</h1>
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
