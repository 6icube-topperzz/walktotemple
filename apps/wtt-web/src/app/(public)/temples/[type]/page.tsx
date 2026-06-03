import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import { packages } from '@/data/packages'

const templeData: Record<string, {
  title: string; icon: string; subtitle: string; about: string; bg: string
  items?: { name: string; element?: string; location: string; state: string; weHave?: boolean }[]
  packageSlugs?: string[]
}> = {
  'jyotirlingas': {
    title: '12 Jyotirlingas', icon: '🔱', bg: 'from-maroon to-[#4a0010]',
    subtitle: '12 sacred abodes of Lord Shiva — the most powerful Shiva pilgrimage circuit',
    about: 'The 12 Jyotirlingas are self-manifested lingas of Lord Shiva, spread across India. Visiting all 12 is considered one of the most spiritually significant pilgrimages in Hinduism.',
    items: [
      { name: 'Somnath', location: 'Prabhas Patan', state: 'Gujarat' },
      { name: 'Mallikarjuna (Srisailam)', location: 'Srisailam', state: 'Andhra Pradesh', weHave: true },
      { name: 'Mahakaleshwar', location: 'Ujjain', state: 'Madhya Pradesh' },
      { name: 'Omkareshwar', location: 'Khandwa', state: 'Madhya Pradesh' },
      { name: 'Kedarnath', location: 'Rudraprayag', state: 'Uttarakhand' },
      { name: 'Bhimashankar', location: 'Pune district', state: 'Maharashtra' },
      { name: 'Vishwanath (Kashi)', location: 'Varanasi', state: 'Uttar Pradesh' },
      { name: 'Trimbakeshwar', location: 'Nashik', state: 'Maharashtra' },
      { name: 'Vaidyanath', location: 'Deoghar', state: 'Jharkhand' },
      { name: 'Nageshwar', location: 'Dwarka', state: 'Gujarat' },
      { name: 'Rameshwaram', location: 'Rameswaram', state: 'Tamil Nadu' },
      { name: 'Grishneshwar', location: 'Aurangabad', state: 'Maharashtra' },
    ],
    packageSlugs: ['srisailam-2day'],
  },
  'pancha-bootha': {
    title: 'Pancha Bootha Sthalas', icon: '🌍', bg: 'from-slate-800 to-slate-700',
    subtitle: '5 Shiva temples representing the 5 elements — Earth · Water · Fire · Air · Ether',
    about: 'The Pancha Bootha Sthalas are five Shiva temples in South India where Lord Shiva is worshipped as the manifestation of the five classical elements. Visiting all five is believed to grant moksha.',
    items: [
      { name: 'Ekambareswarar', element: '🌍 Earth (Prithvi)', location: 'Kanchipuram', state: 'Tamil Nadu' },
      { name: 'Jambukeswarar', element: '💧 Water (Appu)', location: 'Thiruvanaikaval, Trichy', state: 'Tamil Nadu' },
      { name: 'Arunachaleswarar', element: '🔥 Fire (Agni)', location: 'Tiruvannamalai', state: 'Tamil Nadu' },
      { name: 'Srikalahasti', element: '💨 Air/Wind (Vayu)', location: 'Srikalahasti', state: 'Andhra Pradesh', weHave: true },
      { name: 'Thillai Nataraja', element: '✨ Ether (Akash)', location: 'Chidambaram', state: 'Tamil Nadu' },
    ],
    packageSlugs: ['tirupati-3day'],
  },
  'shakti-peethas': {
    title: '18 Maha Shakti Peethas', icon: '🌺', bg: 'from-rose-900 to-rose-800',
    subtitle: '18 principal shrines of Goddess Shakti — the most sacred Devi pilgrimage circuit',
    about: 'The 18 Maha Shakti Peethas are the principal shrines of Goddess Durga / Shakti. Each represents a body part of Goddess Sati that fell to earth after Lord Shiva\'s grief-stricken cosmic dance.',
    items: [
      { name: 'Bhramaramba, Srisailam', location: 'Srisailam, AP', state: 'Andhra Pradesh', weHave: true },
      { name: 'Kanaka Durga, Vijayawada', location: 'Vijayawada, AP', state: 'Andhra Pradesh', weHave: true },
      { name: 'Durga, Kolkata (Kalighat)', location: 'Kolkata', state: 'West Bengal' },
      { name: 'Mahalakshmi, Kolhapur', location: 'Kolhapur', state: 'Maharashtra' },
      { name: 'Kamakhya, Guwahati', location: 'Guwahati', state: 'Assam' },
    ],
    packageSlugs: ['srisailam-2day', 'vijayawada-2day'],
  },
  'divya-desams': {
    title: '108 Divya Desams', icon: '🪷', bg: 'from-emerald-900 to-emerald-800',
    subtitle: '108 sacred Vishnu temples glorified by the Tamil Alvars — the supreme Vaishnavite pilgrimage',
    about: 'The 108 Divya Desams are Vishnu temples in India, Nepal, and the celestial realm, glorified in the Nalayira Divya Prabandham by 12 Alvars. Visiting all 108 is the ultimate Vaishnavite pilgrimage.',
    items: [
      { name: 'Tirumala Venkateswara', location: 'Tirupati', state: 'Andhra Pradesh', weHave: true },
      { name: 'Ahobilam (Nava Narasimha)', location: 'Nandyal', state: 'Andhra Pradesh', weHave: true },
      { name: 'Annavaram', location: 'East Godavari', state: 'Andhra Pradesh', weHave: true },
      { name: 'Srirangam', location: 'Trichy', state: 'Tamil Nadu' },
      { name: 'Kanchipuram Varadaraja', location: 'Kanchipuram', state: 'Tamil Nadu' },
    ],
    packageSlugs: ['tirupati-3day', 'ahobilam-2day', 'annavaram-1day'],
  },
  'hilltop': {
    title: 'Hilltop Temples', icon: '⛰️', bg: 'from-stone-700 to-stone-600',
    subtitle: 'Sacred temples perched on hills — where heaven meets earth',
    about: 'Hilltop temples offer not just spiritual darshan but also the physical challenge of ascent, symbolizing spiritual elevation. The views from these temples are as divine as the experience within.',
    items: [
      { name: 'Tirumala Venkateswara', location: 'Tirupati', state: 'Andhra Pradesh', weHave: true },
      { name: 'Yadadri Narasimha', location: 'Yadadri', state: 'Telangana', weHave: true },
      { name: 'Simhachalam', location: 'Visakhapatnam', state: 'Andhra Pradesh' },
      { name: 'Annamalai (Arunachala)', location: 'Tiruvannamalai', state: 'Tamil Nadu' },
      { name: 'Kondagattu Anjaneya', location: 'Jagtial', state: 'Telangana' },
    ],
    packageSlugs: ['yadadri-day-trip', 'tirupati-3day'],
  },
  'riverside': {
    title: 'Riverside Temples', icon: '🌊', bg: 'from-blue-900 to-blue-800',
    subtitle: 'Sacred shrines on holy rivers — where water and divinity meet',
    about: 'River temples hold a special place in Hindu tradition. The confluence of sacred rivers with temple towns creates an atmosphere of extraordinary spiritual potency.',
    items: [
      { name: 'Bhadrachalam (Godavari)', location: 'Bhadrachalam', state: 'Telangana', weHave: true },
      { name: 'Kaleshwaram (Godavari+Pranahita)', location: 'Kaleshwaram', state: 'Telangana', weHave: true },
      { name: 'Srisailam (Krishna)', location: 'Srisailam', state: 'Andhra Pradesh', weHave: true },
      { name: 'Kanaka Durga (Krishna)', location: 'Vijayawada', state: 'Andhra Pradesh', weHave: true },
    ],
    packageSlugs: ['bhadrachalam-2day', 'kaleshwaram-1day', 'srisailam-2day'],
  },
  'forest': {
    title: 'Forest Temples', icon: '🌿', bg: 'from-green-900 to-green-800',
    subtitle: 'Ancient shrines in sacred forests — nature as the ultimate temple',
    about: 'Forest temples in India are set in dense, ancient forests, often accessible only by trek. The untouched nature surrounding them adds to the powerful spiritual energy.',
    items: [
      { name: 'Ahobilam Narasimha (Nallamala)', location: 'Nandyal', state: 'Andhra Pradesh', weHave: true },
      { name: 'Komuravelli Mallikarjuna', location: 'Siddipet', state: 'Telangana' },
      { name: 'Medaram Sammakka', location: 'Mulugu', state: 'Telangana' },
      { name: 'Ananthagiri Hills', location: 'Vikarabad', state: 'Telangana' },
    ],
    packageSlugs: ['ahobilam-2day'],
  },
  'cave': {
    title: 'Cave Temples', icon: '🪨', bg: 'from-zinc-800 to-zinc-700',
    subtitle: 'Divine shrines in ancient rock and natural caves',
    about: 'Cave temples represent some of the oldest sacred sites in India. Whether rock-cut or natural, they offer a sense of primordial spirituality unlike any other.',
    items: [
      { name: 'Undavalli Caves', location: 'Vijayawada', state: 'Andhra Pradesh' },
      { name: 'Kaleshwaram (Underground)', location: 'Kaleshwaram', state: 'Telangana', weHave: true },
      { name: 'Badami Cave Temples', location: 'Bagalkot', state: 'Karnataka' },
    ],
    packageSlugs: ['kaleshwaram-1day'],
  },
}

export default async function TempleTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const data = templeData[type]

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-5xl mb-4">🛕</div>
        <h1 className="font-heading text-4xl font-semibold text-gray-900 mb-3">Temples — Coming Soon</h1>
        <p className="text-gray-500 mb-6">We are curating this section. Check back soon.</p>
        <Link href="/" className="bg-saffron text-white font-semibold px-6 py-3 rounded-full">← Back to Home</Link>
      </div>
    )
  }

  const relatedPackages = data.packageSlugs
    ? packages.filter(p => data.packageSlugs!.includes(p.slug))
    : []

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${data.bg} text-white py-16 px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">{data.icon}</div>
          <h1 className="font-heading text-5xl font-semibold mb-3">{data.title}</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">{data.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* About */}
        <div className="bg-cream rounded-2xl p-6">
          <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">{data.about}</p>
        </div>

        {/* Temple list */}
        {data.items && (
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-5">The Temples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.items.map((t, i) => (
                <div key={i} className={`rounded-2xl border p-5 ${t.weHave ? 'bg-orange-50 border-saffron/30' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{i + 1}. {t.name}</span>
                        {t.weHave && <span className="text-xs bg-saffron text-white px-2 py-0.5 rounded-full font-medium">We Cover ✓</span>}
                      </div>
                      {'element' in t && t.element && (
                        <p className="text-sm font-medium text-saffron mb-0.5">{t.element}</p>
                      )}
                      <p className="text-sm text-gray-500">📍 {t.location}, {t.state}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related packages */}
        {relatedPackages.length > 0 && (
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-5">Available Packages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPackages.map(p => <PackageCard key={p.slug} pkg={p} />)}
            </div>
          </div>
        )}

        {/* Circuit CTA */}
        <div className="bg-hero text-white rounded-2xl p-8 text-center">
          <h3 className="font-heading text-2xl font-semibold mb-2">Plan the Complete {data.title} Circuit</h3>
          <p className="text-gray-300 mb-5">Let us plan every leg of this sacred journey for you.</p>
          <Link href="/plan-trip"
            className="inline-block bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3 rounded-full transition-colors">
            Plan This Yatra →
          </Link>
        </div>
      </div>
    </div>
  )
}
