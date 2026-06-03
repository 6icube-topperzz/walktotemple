import { packages, upcomingDepartures } from '@/data/packages'
import PackageCard from '@/components/PackageCard'

const FESTIVAL_INFO: Record<string, { title: string; desc: string; emoji: string; months: string }> = {
  karthika:      { title: 'Karthika Masam Packages', desc: 'Special darshans at Shiva & Vishnu temples during the sacred month of Karthik.', emoji: '🪔', months: 'Oct–Nov' },
  shivaratri:    { title: 'Maha Shivaratri Packages', desc: 'Night-long vigil packages at Jyotirlingas, Srisailam, and Shiva temples across India.', emoji: '🔱', months: 'Feb–Mar' },
  brahmotsavam:  { title: 'Brahmotsavam Packages', desc: 'Special packages for Tirumala Brahmotsavam — the grandest festival of Venkateswara.', emoji: '🛕', months: 'Sep–Oct' },
  vaikunta:      { title: 'Vaikunta Ekadashi Packages', desc: 'Darshan packages at Tirupati, Srirangam and other Vishnu temples on Vaikunta Ekadashi.', emoji: '🪷', months: 'Dec–Jan' },
  navratri:      { title: 'Navratri Packages', desc: 'Nine-night Devi worship packages at Vijayawada, Chamundi Hills, Vaishno Devi and more.', emoji: '🌺', months: 'Sep–Oct' },
  diwali:        { title: 'Diwali Special Packages', desc: 'Celebrate Diwali at sacred Lakshmi and Rama temples — lights, sevas, and blessings.', emoji: '✨', months: 'Oct–Nov' },
}

export default async function FestivalPage({ params }: { params: Promise<{ festival: string }> }) {
  const { festival } = await params
  const info = FESTIVAL_INFO[festival] ?? {
    title: festival.charAt(0).toUpperCase() + festival.slice(1) + ' Festival Packages',
    desc: 'Festival pilgrimage packages',
    emoji: '🎉',
    months: 'Seasonal',
  }

  const all = packages.filter(p => p.isActive)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{info.emoji}</span>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.title}</h1>
            <span className="text-xs bg-amber-50 text-amber-700 font-medium px-2.5 py-1 rounded-full border border-amber-100">{info.months}</span>
          </div>
        </div>
        <p className="text-gray-500 mt-2">{info.desc}</p>
      </div>

      <div className="bg-amber-50 rounded-2xl p-5 mb-8 border border-orange-100">
        <p className="text-sm text-orange-800 font-medium">🗓️ Festival dates vary year to year — contact us for exact darshan slots and advance booking</p>
        <a
          href="https://wa.me/919876543210"
          className="mt-2 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          WhatsApp for Festival Slots →
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
