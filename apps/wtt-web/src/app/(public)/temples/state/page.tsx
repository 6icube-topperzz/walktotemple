import Link from 'next/link'

const STATES = [
  { slug: 'telangana', label: 'Telangana', emoji: '🌺', count: '40+ temples' },
  { slug: 'andhra-pradesh', label: 'Andhra Pradesh', emoji: '🛕', count: '50+ temples' },
  { slug: 'tamil-nadu', label: 'Tamil Nadu', emoji: '🌴', count: '60+ temples' },
  { slug: 'karnataka', label: 'Karnataka', emoji: '🏔️', count: '35+ temples' },
  { slug: 'kerala', label: 'Kerala', emoji: '🌿', count: '25+ temples' },
  { slug: 'maharashtra', label: 'Maharashtra', emoji: '🏛️', count: '30+ temples' },
  { slug: 'uttar-pradesh', label: 'Uttar Pradesh', emoji: '🙏', count: '45+ temples' },
  { slug: 'uttarakhand', label: 'Uttarakhand', emoji: '⛰️', count: 'Coming soon' },
  { slug: 'rajasthan', label: 'Rajasthan', emoji: '🏰', count: '20+ temples' },
  { slug: 'odisha', label: 'Odisha', emoji: '🌊', count: '20+ temples' },
  { slug: 'gujarat', label: 'Gujarat', emoji: '🏺', count: '25+ temples' },
  { slug: 'west-bengal', label: 'West Bengal', emoji: '🌸', count: '15+ temples' },
  { slug: 'madhya-pradesh', label: 'Madhya Pradesh', emoji: '🌳', count: '15+ temples' },
  { slug: 'himachal-pradesh', label: 'Himachal Pradesh', emoji: '🏔️', count: 'Coming soon' },
  { slug: 'punjab', label: 'Punjab', emoji: '🌾', count: '10+ temples' },
]

export default function AllStatesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">Temples by State</h1>
        <p className="text-gray-500 mt-1">Explore pilgrimage packages across India, state by state</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {STATES.map(s => (
          <Link
            key={s.slug}
            href={`/temples/state/${s.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md p-4 transition-all"
          >
            <span className="text-3xl block mb-2">{s.emoji}</span>
            <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.count}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
