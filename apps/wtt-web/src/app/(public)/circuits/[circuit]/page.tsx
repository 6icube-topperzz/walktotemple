import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import { packages } from '@/data/packages'

const circuitData: Record<string, {
  title: string; icon: string; subtitle: string; about: string; bg: string
  temples?: { name: string; location: string; weHave?: boolean }[]
  packageSlugs?: string[]
}> = {
  'jyotirlingas': {
    title: '12 Jyotirlingas Circuit', icon: '🔱', bg: 'from-maroon to-[#4a0010]',
    subtitle: 'Complete the most sacred Shiva pilgrimage — all 12 abodes in one journey',
    about: 'The Dwadasha Jyotirlinga Circuit is the most comprehensive Shiva pilgrimage. Completing all 12 is believed to grant liberation from the cycle of birth and death.',
    packageSlugs: ['srisailam-2day'],
  },
  'pancha-bootha': {
    title: 'Pancha Bootha Sthalas Circuit', icon: '🌍', bg: 'from-slate-800 to-slate-700',
    subtitle: 'Complete the 5-element Shiva circuit — Earth, Water, Fire, Air, Ether',
    about: 'Visit all 5 Pancha Bootha Sthalas to experience Lord Shiva in each of the five classical elements. All 5 are in South India, making this a convenient circuit.',
    temples: [
      { name: 'Ekambareswarar (Earth)', location: 'Kanchipuram, Tamil Nadu' },
      { name: 'Jambukeswarar (Water)', location: 'Trichy, Tamil Nadu' },
      { name: 'Arunachaleswarar (Fire)', location: 'Tiruvannamalai, Tamil Nadu' },
      { name: 'Srikalahasti (Air)', location: 'Srikalahasti, Andhra Pradesh', weHave: true },
      { name: 'Thillai Nataraja (Ether)', location: 'Chidambaram, Tamil Nadu' },
    ],
    packageSlugs: ['tirupati-3day'],
  },
  'divya-desams': {
    title: '108 Divya Desams Circuit', icon: '🪷', bg: 'from-emerald-900 to-emerald-800',
    subtitle: '108 Vishnu temples glorified by the Alvars — the ultimate Vaishnavite journey',
    about: 'The 108 Divya Desams are spread across South India, North India, Nepal, and the celestial realm. Completing all 108 is the highest goal for Vaishnavites.',
    packageSlugs: ['tirupati-3day', 'ahobilam-2day', 'yadadri-day-trip'],
  },
  '18-shakti': {
    title: '18 Maha Shakti Peethas', icon: '🌺', bg: 'from-rose-900 to-rose-800',
    subtitle: 'The 18 principal Shakti shrines — sacred drops of Goddess Sati',
    about: 'The 18 Maha Shakti Peethas are considered the most important Devi temples in India. Each represents a part of Goddess Sati\'s body that fell after Lord Shiva\'s grief-stricken journey.',
    packageSlugs: ['srisailam-2day', 'vijayawada-2day'],
  },
  'pancharama': {
    title: 'Pancharama Kshetras', icon: '🔱', bg: 'from-amber-900 to-amber-800',
    subtitle: '5 sacred Shiva temples of Andhra Pradesh on the Krishna-Godavari delta',
    about: 'The Pancharama Kshetras are 5 Shiva temples in coastal Andhra Pradesh, all connected to the story of the defeat of the demon Tarakasura. Visiting all 5 is considered highly auspicious.',
    temples: [
      { name: 'Bhima Lingeswara (Draksharama)', location: 'East Godavari, AP' },
      { name: 'Someswara (Bhimavaram)', location: 'West Godavari, AP' },
      { name: 'Ksheerarama (Palakollu)', location: 'West Godavari, AP' },
      { name: 'Amararama (Amaravathi)', location: 'Guntur, AP' },
      { name: 'Kumararama (Samarlakota)', location: 'East Godavari, AP' },
    ],
  },
  'nava-narasimha': {
    title: 'Nava Narasimha — Ahobilam', icon: '🦁', bg: 'from-orange-900 to-orange-800',
    subtitle: '9 forms of Lord Narasimha in the Nallamala forest',
    about: 'Ahobilam in Nandyal district of Andhra Pradesh is home to 9 shrines of Lord Narasimha, each representing a different form in which He appeared to destroy Hiranyakashipu and protect Prahlada.',
    temples: [
      { name: 'Jwala Narasimha (upper)', location: 'Upper Ahobilam, AP', weHave: true },
      { name: 'Ahobila Narasimha (main)', location: 'Upper Ahobilam, AP', weHave: true },
      { name: 'Malola Narasimha', location: 'Upper Ahobilam, AP', weHave: true },
      { name: 'Karanja Narasimha', location: 'Upper Ahobilam, AP' },
      { name: 'Bhargava Narasimha', location: 'Upper Ahobilam, AP' },
      { name: 'Yogananda Narasimha', location: 'Lower Ahobilam, AP', weHave: true },
      { name: 'Chatravata Narasimha', location: 'Lower Ahobilam, AP' },
      { name: 'Pavana Narasimha', location: 'Lower Ahobilam, AP' },
      { name: 'Varaha Narasimha', location: 'Lower Ahobilam, AP' },
    ],
    packageSlugs: ['ahobilam-2day'],
  },
  'ashtavinayak': {
    title: 'Ashtavinayak Yatra', icon: '🐘', bg: 'from-yellow-900 to-yellow-800',
    subtitle: '8 Ganesha temples near Pune — the most sacred Ganesha pilgrimage',
    about: 'The Ashtavinayak temples are 8 Ganesha temples in Maharashtra, all within about 100 km of Pune. Each temple is said to be a Swayambhu (self-manifested) Ganesha.',
    temples: [
      { name: 'Moreshwar (Morgaon)', location: 'Pune, Maharashtra' },
      { name: 'Siddhatek', location: 'Ahmednagar, Maharashtra' },
      { name: 'Pali Ballaleshwar', location: 'Raigad, Maharashtra' },
      { name: 'Varadvinayak (Mahad)', location: 'Raigad, Maharashtra' },
      { name: 'Chintamani (Theur)', location: 'Pune, Maharashtra' },
      { name: 'Girijatmaj (Lenyadri)', location: 'Pune, Maharashtra' },
      { name: 'Vighnahar (Ozar)', location: 'Pune, Maharashtra' },
      { name: 'Mahaganapati (Ranjangaon)', location: 'Pune, Maharashtra' },
    ],
  },
  'arupadai-veedu': {
    title: 'Six Arupadai Veedu', icon: '🎺', bg: 'from-red-900 to-red-800',
    subtitle: '6 sacred Murugan temples of Tamil Nadu',
    about: 'The Six Arupadai Veedu are the six principal abodes of Lord Murugan (Kartikeya) in Tamil Nadu. Visiting all six is considered the ultimate Murugan pilgrimage.',
    temples: [
      { name: 'Palani Dhandayudhapani', location: 'Palani, Tamil Nadu' },
      { name: 'Tiruchendur Senthilnatha', location: 'Tiruchendur, Tamil Nadu' },
      { name: 'Tiruparamkundram', location: 'Madurai, Tamil Nadu' },
      { name: 'Swamimalai', location: 'Kumbakonam, Tamil Nadu' },
      { name: 'Thirutani', location: 'Thiruvallur, Tamil Nadu' },
      { name: 'Pazhamudircholai', location: 'Madurai, Tamil Nadu' },
    ],
  },
}

export default async function CircuitPage({ params }: { params: Promise<{ circuit: string }> }) {
  const { circuit } = await params
  const data = circuitData[circuit]

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-5xl mb-4">⭕</div>
        <h1 className="font-heading text-4xl font-semibold text-gray-900 mb-3">Circuit — Coming Soon</h1>
        <Link href="/" className="bg-saffron text-white font-semibold px-6 py-3 rounded-full">← Back to Home</Link>
      </div>
    )
  }

  const relatedPackages = data.packageSlugs
    ? packages.filter(p => data.packageSlugs!.includes(p.slug))
    : []

  return (
    <div className="min-h-screen">
      <div className={`bg-gradient-to-br ${data.bg} text-white py-16 px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">{data.icon}</div>
          <h1 className="font-heading text-5xl font-semibold mb-3">{data.title}</h1>
          <p className="text-white/80 text-xl">{data.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <div className="bg-cream rounded-2xl p-6">
          <p className="text-gray-700 leading-relaxed">{data.about}</p>
        </div>

        {data.temples && (
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-5">The Temples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.temples.map((t, i) => (
                <div key={i} className={`rounded-xl border p-4 ${t.weHave ? 'bg-orange-50 border-saffron/30' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{i + 1}. {t.name}</span>
                      <p className="text-sm text-gray-500 mt-0.5">📍 {t.location}</p>
                    </div>
                    {t.weHave && <span className="text-xs bg-saffron text-white px-2 py-0.5 rounded-full">We Cover ✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedPackages.length > 0 && (
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-5">Book These Temples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPackages.map(p => <PackageCard key={p.slug} pkg={p} />)}
            </div>
          </div>
        )}

        <div className="bg-hero text-white rounded-2xl p-8 text-center">
          <h3 className="font-heading text-2xl font-semibold mb-2">Plan the Complete {data.title}</h3>
          <p className="text-gray-300 mb-5">We handle every temple, every transfer, every stay.</p>
          <Link href="/plan-trip" className="inline-block bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3 rounded-full transition-colors">
            Plan This Circuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
