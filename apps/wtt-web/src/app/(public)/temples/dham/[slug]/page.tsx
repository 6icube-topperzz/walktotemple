import Link from 'next/link'
import { packages, upcomingDepartures } from '@/data/packages'
import PackageCard from '@/components/PackageCard'

const DHAM_INFO: Record<string, { title: string; description: string; emoji: string; comingSoon?: boolean }> = {
  'bada-char-dham':   { title: 'Bada Char Dham', description: 'Badrinath · Dwarka · Puri · Rameswaram — the four sacred dhams at the four corners of India.', emoji: '🏔️' },
  'chota-char-dham':  { title: 'Chota Char Dham', description: 'Kedarnath · Badrinath · Yamunotri · Gangotri — the four sacred shrines of Uttarakhand.', emoji: '⛰️' },
  'panch-kedar':      { title: 'Panch Kedar', description: 'Five forms of Lord Shiva in the Garhwal Himalayas.', emoji: '🔱' },
  'panch-badri':      { title: 'Panch Badri', description: 'Five forms of Lord Vishnu in Uttarakhand.', emoji: '🪷' },
  'sapta-puri':       { title: 'Sapta Puri', description: 'Seven sacred cities: Ayodhya · Mathura · Haridwar · Varanasi · Kanchipuram · Ujjain · Dwarka', emoji: '🏛️' },
  amarnath:           { title: 'Amarnath Yatra', description: 'The sacred ice lingam of Lord Shiva in the Himalayas. Open June–August.', emoji: '🏔️' },
  vaishnodevi:        { title: 'Vaishno Devi', description: 'Mata Vaishno Devi temple in the Trikuta mountains of Jammu.', emoji: '🌺' },
  'kailash-mansarovar': { title: 'Kailash Mansarovar', description: 'The abode of Lord Shiva in Tibet — the most sacred pilgrimage on Earth.', emoji: '⛰️', comingSoon: true },
  jyotirlingas:       { title: '12 Jyotirlingas', description: '12 most sacred Shiva temples across India.', emoji: '🔱' },
  'shakti-peethas':   { title: '51 Shakti Peethas', description: 'The 51 sacred shrines of Goddess Shakti across the subcontinent.', emoji: '🌺' },
  'divya-desams':     { title: '108 Divya Desams', description: 'The 108 sacred Vishnu temples sung by the Alvar saints.', emoji: '🪷' },
  'pancha-bootha':    { title: 'Pancha Bootha Sthalas', description: 'Five Shiva temples representing the five elements — Earth, Water, Fire, Air, Ether.', emoji: '🌟' },
}

export default async function DhamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const info = DHAM_INFO[slug] ?? {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: 'Sacred pilgrimage circuit',
    emoji: '🛕',
  }

  if (info.comingSoon) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <span className="text-6xl block mb-4">{info.emoji}</span>
        <h1 className="font-heading text-3xl font-semibold text-gray-900 mb-2">{info.title} — Coming Soon</h1>
        <p className="text-gray-500 mb-2">{info.description}</p>
        <p className="text-gray-500 mb-6">We are curating special packages for this sacred journey. Join the waitlist.</p>
        <div className="bg-amber-50 rounded-2xl p-6 border border-orange-100 mb-6">
          <p className="text-sm text-orange-800 font-medium mb-3">🙏 Join 5,000+ pilgrims waiting for this route</p>
          <form className="flex gap-2 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com"
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
              Notify Me
            </button>
          </form>
        </div>
        <Link href="/temples/dham" className="text-sm text-orange-500 hover:underline">← All Dham Yatras</Link>
      </main>
    )
  }

  const all = packages.filter(p => p.isActive)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{info.emoji}</span>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{info.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-orange-100">
        <p className="text-sm text-orange-800 font-medium">🙏 Custom packages for {info.title} — contact us for personalised itineraries</p>
        <a href="https://wa.me/919876543210"
          className="mt-2 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          WhatsApp Us →
        </a>
      </div>

      <h2 className="font-heading text-xl font-semibold text-gray-800 mb-4">Available Packages</h2>
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
