import { packages, upcomingDepartures } from '@/data/packages'
import PackageCard from '@/components/PackageCard'

const GROUP_INFO: Record<string, { label: string; emoji: string; desc: string }> = {
  family:    { label: 'Family Pilgrimage Packages', emoji: '👨‍👩‍👧', desc: 'Temples, activities and stays designed for families — kid-friendly itineraries, accessible darshans.' },
  senior:    { label: 'Senior Special Packages', emoji: '👴', desc: 'Comfortable travel with special assistance — wheelchair access, easy darshan priority queues.' },
  solo:      { label: 'Solo Pilgrimage Packages', emoji: '🧘', desc: 'Peaceful solo yatras — shared groups, safe stays, and guided darshan experiences.' },
  corporate: { label: 'Corporate Spiritual Packages', emoji: '🤝', desc: 'Team spiritual retreats — temple visits, meditation, and team-bonding at sacred spaces.' },
}

export default async function TemplesByGroupPage({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params
  const info = GROUP_INFO[group] ?? {
    label: group.charAt(0).toUpperCase() + group.slice(1) + ' Packages',
    emoji: '🛕',
    desc: '',
  }

  const all = packages.filter(p => p.isActive)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{info.emoji}</span>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.label}</h1>
            {info.desc && <p className="text-sm text-gray-500 mt-1 max-w-2xl">{info.desc}</p>}
          </div>
        </div>
      </div>

      {group === 'corporate' && (
        <div className="bg-blue-50 rounded-2xl p-5 mb-6 border border-blue-100">
          <p className="text-sm text-blue-800 font-medium">📋 Corporate packages are customised — contact us for group pricing, GSTIN invoice, and CSR documentation</p>
          <a href="https://wa.me/919876543210"
            className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            Get a Quote →
          </a>
        </div>
      )}

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
