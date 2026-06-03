import Link from 'next/link'

const yatraData: Record<string, {
  title: string; icon: string; subtitle: string; about: string; bg: string
  dhams?: { name: string; deity: string; location: string; direction?: string }[]
  seasons?: string; altitude?: string; difficulty?: string
}> = {
  'bada-char-dham': {
    title: 'Bada Char Dham', icon: '🛕', bg: 'from-amber-900 to-orange-800',
    subtitle: 'The 4 great sacred cities — North, South, East, West',
    about: 'The Bada Char Dham refers to 4 major pilgrimage sites spread across the 4 corners of India. Adi Shankaracharya established these as the ultimate pilgrimage circuit for all Hindus.',
    dhams: [
      { name: 'Badrinath', deity: 'Lord Vishnu', location: 'Chamoli, Uttarakhand', direction: '⬆️ North' },
      { name: 'Dwarka (Dwarkadhish)', deity: 'Lord Krishna', location: 'Devbhoomi Dwarka, Gujarat', direction: '⬅️ West' },
      { name: 'Jagannath Puri', deity: 'Lord Jagannath (Vishnu)', location: 'Puri, Odisha', direction: '➡️ East' },
      { name: 'Rameswaram', deity: 'Lord Shiva + Rama', location: 'Ramanathapuram, Tamil Nadu', direction: '⬇️ South' },
    ],
  },
  'chota-char-dham': {
    title: 'Chota Char Dham', icon: '🏔️', bg: 'from-blue-900 to-indigo-800',
    subtitle: 'The 4 sacred dhams of Uttarakhand — in the lap of the Himalayas',
    about: 'The Chota Char Dham Yatra is the most popular pilgrimage in North India. All 4 dhams are in Uttarakhand, open May–November. The complete circuit covers about 1,600 km.',
    dhams: [
      { name: 'Yamunotri', deity: 'Goddess Yamuna', location: 'Uttarkashi, Uttarakhand' },
      { name: 'Gangotri', deity: 'Goddess Ganga', location: 'Uttarkashi, Uttarakhand' },
      { name: 'Kedarnath', deity: 'Lord Shiva (Jyotirlinga)', location: 'Rudraprayag, Uttarakhand' },
      { name: 'Badrinath', deity: 'Lord Vishnu', location: 'Chamoli, Uttarakhand' },
    ],
    seasons: 'Open: May to November (closed in winter)',
    altitude: 'Kedarnath: 3,583m · Badrinath: 3,133m',
    difficulty: 'Moderate — helicopter options available',
  },
  'panch-kedar': {
    title: 'Panch Kedar', icon: '🔱', bg: 'from-gray-900 to-gray-800',
    subtitle: '5 Shiva shrines in the Garhwal Himalayas — for the devoted trekker-pilgrim',
    about: 'The Panch Kedar are 5 temples in Uttarakhand dedicated to Lord Shiva, associated with the Pandavas from the Mahabharata. Each temple is said to contain a different body part of Lord Shiva.',
    dhams: [
      { name: 'Kedarnath', deity: 'Hump (Prishtha)', location: 'Rudraprayag, Uttarakhand' },
      { name: 'Tungnath', deity: 'Arms (Bahu)', location: 'Rudraprayag, Uttarakhand' },
      { name: 'Rudranath', deity: 'Face (Mukha)', location: 'Chamoli, Uttarakhand' },
      { name: 'Madhyamaheshwar', deity: 'Navel (Nabhi)', location: 'Rudraprayag, Uttarakhand' },
      { name: 'Kalpeshwar', deity: 'Locks of hair (Jata)', location: 'Chamoli, Uttarakhand' },
    ],
    seasons: 'Open: May to November · Requires trekking',
    difficulty: 'Strenuous — trek of 3–24 km per temple',
  },
  'panch-badri': {
    title: 'Panch Badri', icon: '🪷', bg: 'from-emerald-900 to-teal-800',
    subtitle: '5 Vishnu temples in Uttarakhand — the complete Badrinath circuit',
    about: 'The Panch Badri are 5 temples dedicated to Lord Vishnu (Badri) in Uttarakhand. Each Badri is believed to have been established by Adi Shankaracharya and represents a different form of Vishnu.',
    dhams: [
      { name: 'Badrinath (Vishala Badri)', deity: 'Lord Vishnu (main)', location: 'Chamoli, Uttarakhand' },
      { name: 'Yogadhyan Badri', deity: 'Meditating Vishnu', location: 'Pandukeshwar, Chamoli' },
      { name: 'Bhavishya Badri', deity: 'Future Badrinath', location: 'Tapovan, Chamoli' },
      { name: 'Vriddha Badri', deity: 'Ancient Vishnu', location: 'Animath, Chamoli' },
      { name: 'Adi Badri', deity: 'Primeval Vishnu', location: 'Chamoli, Uttarakhand' },
    ],
    seasons: 'Open: May to November',
  },
  'sapta-puri': {
    title: 'Sapta Puri — 7 Sacred Cities', icon: '🏙️', bg: 'from-yellow-900 to-amber-800',
    subtitle: 'The 7 most sacred cities of Hinduism — moksha is guaranteed for those who die here',
    about: 'The Sapta Puri (7 sacred cities) are believed to be the holiest cities in Hinduism. According to tradition, dying in any of these cities grants moksha — liberation from the cycle of rebirth.',
    dhams: [
      { name: 'Ayodhya', deity: 'Lord Rama', location: 'Uttar Pradesh' },
      { name: 'Mathura', deity: 'Lord Krishna', location: 'Uttar Pradesh' },
      { name: 'Haridwar', deity: 'Gateway to gods', location: 'Uttarakhand' },
      { name: 'Varanasi (Kashi)', deity: 'Lord Shiva', location: 'Uttar Pradesh' },
      { name: 'Kanchipuram', deity: 'Multi-deity', location: 'Tamil Nadu' },
      { name: 'Ujjain', deity: 'Lord Mahakaleshwar', location: 'Madhya Pradesh' },
      { name: 'Dwarka', deity: 'Lord Krishna', location: 'Gujarat' },
    ],
  },
  'amarnath': {
    title: 'Amarnath Yatra', icon: '❄️', bg: 'from-sky-900 to-blue-800',
    subtitle: 'The most sacred Shiva yatra — the ice lingam at 3,888m',
    about: 'The Amarnath cave temple at 3,888m altitude houses a naturally formed ice Shivalinga that waxes and wanes with the moon. The annual yatra (June-August) is one of India\'s most challenging and sacred pilgrimages.',
    seasons: 'Open: June to August only',
    altitude: '3,888 meters above sea level',
    difficulty: 'Strenuous — helicopter options available from Pahalgam/Baltal',
  },
  'vaishnodevi': {
    title: 'Vaishnodevi Yatra', icon: '🌺', bg: 'from-rose-900 to-rose-800',
    subtitle: 'Mata Vaishno Devi — the most visited Devi shrine in India',
    about: 'The Vaishno Devi cave temple in the Trikuta mountains of Jammu is visited by over 8 million pilgrims annually. Mata Vaishno Devi is worshipped as the combined form of Lakshmi, Saraswati, and Kali.',
    altitude: '1,560 meters — 14 km trek from base camp',
    seasons: 'Open year-round (best: March-April, September-October)',
    difficulty: 'Moderate — pony and helicopter options available',
  },
  'kailash-mansarovar': {
    title: 'Kailash Mansarovar Yatra', icon: '🏔️', bg: 'from-indigo-900 to-slate-800',
    subtitle: 'The most sacred mountain on earth — home of Lord Shiva',
    about: 'Mount Kailash (6,638m) in Tibet is the sacred abode of Lord Shiva and is considered the center of the universe in Hindu, Buddhist, Jain, and Bon traditions. Circumambulating Kailash (Parikrama) is believed to erase all sins of a lifetime.',
    altitude: 'Kailash: 6,638m · Mansarovar Lake: 4,590m',
    seasons: 'Open: June to September',
    difficulty: 'Extremely strenuous — requires special permits',
  },
  '12-jyotirlinga': {
    title: 'Dwadasha Jyotirlinga Yatra', icon: '🔱', bg: 'from-maroon to-[#4a0010]',
    subtitle: 'All 12 Jyotirlingas in one complete circuit',
    about: 'The Dwadasha (12) Jyotirlinga Yatra involves visiting all 12 self-manifested lingas of Lord Shiva across India. Completing this circuit is believed to be equivalent to circumambulating the entire earth.',
    seasons: 'Year-round — can be done in 15-21 days by air/train',
  },
}

export default async function YatraPage({ params }: { params: Promise<{ yatra: string }> }) {
  const { yatra } = await params
  const data = yatraData[yatra]

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-5xl mb-4">🏔️</div>
        <h1 className="font-heading text-4xl font-semibold text-gray-900 mb-3">Yatra — Coming Soon</h1>
        <p className="text-gray-500 mb-6">This yatra package is being planned.</p>
        <Link href="/" className="bg-saffron text-white font-semibold px-6 py-3 rounded-full">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className={`bg-gradient-to-br ${data.bg} text-white py-16 px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-3">{data.icon}</div>
          <h1 className="font-heading text-5xl font-semibold mb-3">{data.title}</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">{data.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {data.seasons && <span className="bg-white/10 text-white/90 text-sm px-4 py-1.5 rounded-full border border-white/20">📅 {data.seasons}</span>}
            {data.altitude && <span className="bg-white/10 text-white/90 text-sm px-4 py-1.5 rounded-full border border-white/20">⛰️ {data.altitude}</span>}
            {data.difficulty && <span className="bg-white/10 text-white/90 text-sm px-4 py-1.5 rounded-full border border-white/20">🥾 {data.difficulty}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <div className="bg-cream rounded-2xl p-6">
          <p className="text-gray-700 leading-relaxed text-lg">{data.about}</p>
        </div>

        {data.dhams && (
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-5">The Sacred Sites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.dhams.map((d, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-semibold text-gray-900">{i + 1}. {d.name}</span>
                    {'direction' in d && d.direction && <span className="text-lg">{d.direction}</span>}
                  </div>
                  <p className="text-sm text-saffron font-medium mb-0.5">{d.deity}</p>
                  <p className="text-sm text-gray-500">📍 {d.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-hero text-white rounded-2xl p-8 text-center">
          <h3 className="font-heading text-2xl font-semibold mb-2">Plan Your {data.title}</h3>
          <p className="text-gray-300 mb-5">We handle transport, accommodation, permits, and darshan at every site.</p>
          <Link href="/plan-trip"
            className="inline-block bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3 rounded-full transition-colors">
            Plan This Yatra →
          </Link>
        </div>
      </div>
    </div>
  )
}
