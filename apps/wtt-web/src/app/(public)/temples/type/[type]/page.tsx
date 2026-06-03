import { packages, upcomingDepartures } from '@/data/packages'
import PackageCard from '@/components/PackageCard'

const TYPE_LABELS: Record<string, { label: string; emoji: string; description: string }> = {
  forest:   { label: 'Forest Temples', emoji: '🌲', description: 'Temples nestled in dense forests — serene, powerful, off-the-beaten-path.' },
  beach:    { label: 'Beach / Coastal Temples', emoji: '🌊', description: 'Sacred temples on India\'s coastlines, where the divine meets the sea.' },
  riverside: { label: 'Riverside Temples', emoji: '💧', description: 'Temples on the sacred banks of India\'s holy rivers.' },
  hilltop:  { label: 'Hilltop Temples', emoji: '⛰️', description: 'Temples perched on hilltops — climb to seek blessings with breathtaking views.' },
  cave:     { label: 'Cave Temples', emoji: '🕳️', description: 'Ancient rock-cut temples carved into caves and cliffs.' },
  island:   { label: 'Island Temples', emoji: '🏝️', description: 'Sacred temples on islands — reached by boat for a unique pilgrimage experience.' },
  underground: { label: 'Underground Temples', emoji: '⬇️', description: 'Rare underground and subterranean temples.' },
}

interface Props {
  params: Promise<{ type: string }>
  searchParams: Promise<{ q?: string }>
}

export default async function TemplesByTypePage({ params, searchParams }: Props) {
  const { type } = await params
  const { q } = await searchParams

  const info = TYPE_LABELS[type] ?? { label: type.charAt(0).toUpperCase() + type.slice(1) + ' Temples', emoji: '🛕', description: '' }

  const all = packages.filter(p => p.isActive)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">
          <a href="/temples" className="hover:text-orange-500">Temples</a> · {info.label}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{info.emoji}</span>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.label}</h1>
            {q && <p className="text-sm text-orange-600 mt-0.5">Filtered: {q}</p>}
            {!q && info.description && <p className="text-sm text-gray-500 mt-0.5">{info.description}</p>}
          </div>
        </div>
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
