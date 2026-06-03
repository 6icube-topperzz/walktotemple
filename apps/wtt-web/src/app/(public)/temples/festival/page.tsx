import Link from 'next/link'

const FESTIVALS = [
  { slug: 'karthika', label: 'Karthika Masam', emoji: '🪔', desc: 'Month of Karthik — special darshans at Shiva & Vishnu temples', months: 'Oct–Nov' },
  { slug: 'shivaratri', label: 'Maha Shivaratri', emoji: '🔱', desc: 'Night-long vigil at 12 Jyotirlingas & Shiva temples', months: 'Feb–Mar' },
  { slug: 'brahmotsavam', label: 'Brahmotsavam', emoji: '🛕', desc: 'Grand Brahmotsavam at Tirumala Tirupati', months: 'Sep–Oct' },
  { slug: 'vaikunta', label: 'Vaikunta Ekadashi', emoji: '🪷', desc: 'Sacred day for Vaishnava temples — Tirupati, Srirangam', months: 'Dec–Jan' },
  { slug: 'navratri', label: 'Navratri', emoji: '🌺', desc: 'Nine nights of Devi worship at Shakti temples', months: 'Sep–Oct' },
  { slug: 'diwali', label: 'Diwali Special', emoji: '✨', desc: 'Festival of lights at Lakshmi & Rama temples', months: 'Oct–Nov' },
]

export default function TempleFestivalsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">Festival Pilgrimage Packages</h1>
        <p className="text-gray-500 mt-1">Travel on auspicious days — darshans, special sevas, and festive packages</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FESTIVALS.map(f => (
          <Link
            key={f.slug}
            href={`/temples/festival/${f.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md p-5 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl">{f.emoji}</span>
              <span className="text-xs bg-amber-50 text-amber-700 font-medium px-2.5 py-1 rounded-full border border-amber-100">{f.months}</span>
            </div>
            <h2 className="font-heading text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{f.label}</h2>
            <p className="text-sm text-gray-500 mt-1 leading-snug">{f.desc}</p>
            <div className="mt-4 text-sm text-orange-500 font-medium flex items-center gap-1">
              View packages
              <span style={{ display: 'inline-block', width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '5px solid currentColor' }} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
