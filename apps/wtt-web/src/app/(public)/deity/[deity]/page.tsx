import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import { packages } from '@/data/packages'

const deityData: Record<string, {
  name: string; icon: string; bg: string; subtitle: string; significance: string
  temples?: { name: string; location: string; why: string; weHave?: boolean }[]
  packageSlugs?: string[]
}> = {
  shiva: {
    name: 'Lord Shiva', icon: '🔱', bg: 'from-[#8B0000] to-[#4a0010]',
    subtitle: 'The Destroyer and Transformer — Mahadeva, the Great God',
    significance: 'Lord Shiva is one of the principal deities of Hinduism. He is the Lord of Yoga, patron of arts, and destroyer of evil. His 12 Jyotirlingas are the most powerful Shiva shrines on earth.',
    temples: [
      { name: 'Mallikarjuna, Srisailam', location: 'Andhra Pradesh', why: 'Jyotirlinga — most powerful Shiva shrine in AP', weHave: true },
      { name: 'Kaleshwaram', location: 'Telangana', why: 'Triveni Sangamam — 3 rivers meet at this ancient shrine', weHave: true },
      { name: 'Kedarnath', location: 'Uttarakhand', why: 'Himalayan Jyotirlinga — most sacred Shiva shrine in North India' },
      { name: 'Kashi Vishwanath, Varanasi', location: 'Uttar Pradesh', why: 'Dying at Kashi is believed to grant moksha' },
    ],
    packageSlugs: ['srisailam-2day', 'kaleshwaram-1day', 'warangal-temples-1day'],
  },
  vishnu: {
    name: 'Lord Vishnu', icon: '🪷', bg: 'from-emerald-900 to-teal-800',
    subtitle: 'The Preserver — Narayana, the protector of dharma and the universe',
    significance: 'Lord Vishnu is the preserver of the universe. He has taken 10 avatars (Dasavatara) to protect dharma, including Rama, Krishna, and Narasimha. His 108 Divya Desams are the ultimate Vaishnavite pilgrimage.',
    temples: [
      { name: 'Tirumala Venkateswara, Tirupati', location: 'Andhra Pradesh', why: 'Most visited temple in the world', weHave: true },
      { name: 'Yadadri Narasimha', location: 'Telangana', why: '5 forms of Narasimha — newly renovated grand temple', weHave: true },
      { name: 'Ahobilam (9 Narasimha)', location: 'Andhra Pradesh', why: 'All 9 forms of Lord Narasimha in one forest', weHave: true },
      { name: 'Srirangam', location: 'Tamil Nadu', why: 'Largest functioning Hindu temple complex in the world' },
    ],
    packageSlugs: ['tirupati-3day', 'yadadri-day-trip', 'ahobilam-2day'],
  },
  venkateswara: {
    name: 'Lord Venkateswara', icon: '🌊', bg: 'from-slate-800 to-slate-700',
    subtitle: 'Balaji, the Lord of Tirumala — most visited deity in the world',
    significance: 'Lord Venkateswara (Balaji) is a form of Vishnu who manifested on the seven hills of Tirumala to save humanity in Kali Yuga. Tirupati receives over 50,000 pilgrims daily, making it the richest and most visited temple on earth.',
    temples: [
      { name: 'Tirumala Venkateswara', location: 'Tirupati, Andhra Pradesh', why: 'The main shrine on the highest hill of Tirumala', weHave: true },
      { name: 'Padmavathi Devi, Tiruchanur', location: 'Andhra Pradesh', why: 'Consort of Venkateswara — near Tirupati', weHave: true },
    ],
    packageSlugs: ['tirupati-3day'],
  },
  rama: {
    name: 'Lord Rama', icon: '🏹', bg: 'from-green-900 to-emerald-800',
    subtitle: 'The ideal king — Maryada Purushottam, the perfect dharmic being',
    significance: 'Lord Rama, the 7th avatar of Vishnu, is the ideal human — the perfect son, husband, king, and warrior. His epic journey, the Ramayana, remains the greatest story of dharma, love, and devotion.',
    temples: [
      { name: 'Bhadrachalam (Sita Ramachandra Swamy)', location: 'Telangana', why: '"Dakshin Ayodhya" — most sacred Rama temple in South India', weHave: true },
      { name: 'Ayodhya Ram Mandir', location: 'Uttar Pradesh', why: 'Birthplace of Lord Rama — the grandest new temple in India' },
      { name: 'Rameswaram', location: 'Tamil Nadu', why: 'Where Rama built the bridge to Lanka and worshipped Shiva' },
      { name: 'Mantralayam', location: 'Andhra Pradesh', why: 'Raghavendra Swami ashram — Rama devotee\'s sacred site' },
    ],
    packageSlugs: ['bhadrachalam-2day'],
  },
  krishna: {
    name: 'Lord Krishna', icon: '🪈', bg: 'from-blue-900 to-indigo-800',
    subtitle: 'The divine flutist — Vasudeva, the teacher of the Bhagavad Gita',
    significance: 'Lord Krishna, the 8th avatar of Vishnu, is the most beloved deity in Hinduism. He is friend, teacher, protector, and divine lover. His Bhagavad Gita is the most important spiritual text of Hinduism.',
    temples: [
      { name: 'Udupi Sri Krishna', location: 'Karnataka', why: 'Krishna installed by Madhvacharya — one of 8 Mathas' },
      { name: 'Guruvayur', location: 'Kerala', why: '"Dwarka of the South" — 8 million pilgrims annually' },
      { name: 'Vrindavan temples', location: 'Uttar Pradesh', why: 'Krishna\'s childhood home — ISKCON, Banke Bihari' },
      { name: 'Dwarkadhish', location: 'Gujarat', why: 'Krishna\'s kingdom — Bada Char Dham' },
    ],
  },
  narasimha: {
    name: 'Lord Narasimha', icon: '🦁', bg: 'from-orange-900 to-orange-800',
    subtitle: 'The Man-Lion avatar — fiercest protector of devotees',
    significance: 'Lord Narasimha is the 4th avatar of Vishnu, who appeared as half-man half-lion to protect his devotee Prahlada. He is worshipped especially for protection from enemies and evil forces.',
    temples: [
      { name: 'Yadadri (5 forms of Narasimha)', location: 'Telangana', why: '5 forms including Jwala, Ganda, Yogananda and more', weHave: true },
      { name: 'Ahobilam (9 Nava Narasimha)', location: 'Andhra Pradesh', why: 'All 9 forms in the sacred Nallamala forest', weHave: true },
      { name: 'Simhachalam (Varaha Narasimha)', location: 'Visakhapatnam, AP', why: 'Unique combined Varaha+Narasimha form — hilltop temple' },
    ],
    packageSlugs: ['yadadri-day-trip', 'ahobilam-2day'],
  },
  devi: {
    name: 'Goddess Devi / Shakti', icon: '🌺', bg: 'from-rose-900 to-rose-800',
    subtitle: 'The Divine Mother — supreme cosmic energy that pervades all creation',
    significance: 'Goddess Devi (Shakti) is the supreme divine mother, manifesting as Durga, Kali, Lakshmi, and Saraswati. She is the active cosmic energy through which the universe operates.',
    temples: [
      { name: 'Kanaka Durga, Vijayawada', location: 'Andhra Pradesh', why: 'Shakti Peetha — one of the most powerful Devi shrines in South India', weHave: true },
      { name: 'Bhramaramba, Srisailam', location: 'Andhra Pradesh', why: 'Shakti Peetha at the Mallikarjuna Jyotirlinga complex', weHave: true },
      { name: 'Gnana Saraswati, Basara', location: 'Telangana', why: 'One of only 2 Saraswati temples in India', weHave: true },
    ],
    packageSlugs: ['vijayawada-2day', 'srisailam-2day', 'basara-1day'],
  },
  durga: { name: 'Goddess Durga', icon: '⚡', bg: 'from-red-900 to-rose-800',
    subtitle: 'The invincible warrior goddess — Devi who destroyed Mahishasura',
    significance: 'Goddess Durga is the fierce form of Shakti who battles the forces of evil. She is depicted with 8-10 arms holding weapons, riding a lion, symbolizing divine power protecting dharma.',
    temples: [{ name: 'Kanaka Durga, Vijayawada', location: 'Andhra Pradesh', why: 'Most powerful Durga shrine in South India', weHave: true }],
    packageSlugs: ['vijayawada-2day'],
  },
  kali: { name: 'Goddess Kali', icon: '🌙', bg: 'from-gray-900 to-black',
    subtitle: 'The dark goddess — destroyer of time and ego',
    significance: 'Goddess Kali is the most ferocious form of Devi, representing the destruction of ego and the liberation from the cycle of time. She is worshipped especially in Bengal and Assam.',
    temples: [{ name: 'Kalighat, Kolkata', location: 'West Bengal', why: 'One of 51 Shakti Peethas — most important Kali shrine' }, { name: 'Kamakhya, Guwahati', location: 'Assam', why: 'One of the 18 Maha Shakti Peethas — supreme Tantric shrine' }],
  },
  saraswati: { name: 'Goddess Saraswati', icon: '📚', bg: 'from-sky-900 to-blue-800',
    subtitle: 'The goddess of wisdom, learning, arts, and music',
    significance: 'Goddess Saraswati embodies all forms of knowledge. She is worshipped especially by students and artists, and Vijayadasami/Ayudha Puja is her most important festival.',
    temples: [{ name: 'Gnana Saraswati, Basara', location: 'Telangana', why: 'One of only 2 Saraswati temples in India', weHave: true }],
    packageSlugs: ['basara-1day'],
  },
  lakshmi: { name: 'Goddess Lakshmi', icon: '💰', bg: 'from-yellow-900 to-amber-800',
    subtitle: 'The goddess of wealth, fortune, and prosperity',
    significance: 'Goddess Lakshmi is the consort of Vishnu and the goddess of wealth and prosperity. She is worshipped on Fridays and especially on Diwali.',
    temples: [
      { name: 'Yadadri Lakshmi Narasimha', location: 'Telangana', why: 'Lakshmi and Narasimha together in one shrine', weHave: true },
      { name: 'Mahalakshmi, Kolhapur', location: 'Maharashtra', why: 'One of 51 Shakti Peethas — most important Lakshmi shrine' },
    ],
    packageSlugs: ['yadadri-day-trip'],
  },
  parvati: { name: 'Goddess Parvati', icon: '🌸', bg: 'from-pink-900 to-rose-700',
    subtitle: 'The gentle mother — consort of Shiva, daughter of Himavan',
    significance: 'Goddess Parvati is the divine mother and consort of Lord Shiva. She represents love, devotion, and the feminine energy that balances Shiva\'s fierce nature.',
    temples: [{ name: 'Parvati temples at all Shiva shrines', location: 'Pan-India', why: 'Parvati is present at every Shiva temple as his consort' }],
  },
  sita: { name: 'Goddess Sita', icon: '🌸', bg: 'from-green-800 to-emerald-700',
    subtitle: 'The ideal wife — daughter of Earth, consort of Rama',
    significance: 'Goddess Sita is the consort of Lord Rama and the ideal of feminine virtue, devotion, and sacrifice in Hindu tradition.',
    temples: [{ name: 'Bhadrachalam (Sita Ramachandra)', location: 'Telangana', why: 'Sita is equally worshipped alongside Rama here', weHave: true }],
    packageSlugs: ['bhadrachalam-2day'],
  },
  ganesha: { name: 'Lord Ganesha', icon: '🐘', bg: 'from-yellow-800 to-amber-700',
    subtitle: 'The remover of obstacles — Vighnaharta, first to be worshipped',
    significance: 'Lord Ganesha, the elephant-headed son of Shiva and Parvati, is the first deity invoked at any auspicious occasion. He removes obstacles and bestows wisdom.',
    temples: [
      { name: 'Kanipakam Vinayaka', location: 'Chittoor, AP', why: 'The "growing" Ganesha — one of the richest temples in AP', weHave: true },
      { name: 'Ashtavinayak (8 Ganesha temples)', location: 'Maharashtra', why: 'Complete Ganesha pilgrimage circuit near Pune' },
    ],
    packageSlugs: ['tirupati-3day'],
  },
  hanuman: { name: 'Lord Hanuman', icon: '🙏', bg: 'from-orange-800 to-red-700',
    subtitle: 'The devoted servant of Rama — Anjaneya, lord of strength and courage',
    significance: 'Lord Hanuman is worshipped for strength, courage, and devotion. His complete surrender to Lord Rama is the highest ideal of bhakti (devotion) in Hinduism.',
    temples: [
      { name: 'Kondagattu Anjaneya', location: 'Telangana', why: 'Powerful hilltop Hanuman temple — 5 lakh weekly visitors' },
      { name: 'Hanuman at Yadadri', location: 'Telangana', why: 'Anjaneya shrine within the Yadadri complex', weHave: true },
    ],
    packageSlugs: ['yadadri-day-trip'],
  },
  murugan: { name: 'Lord Murugan', icon: '🎺', bg: 'from-red-800 to-rose-700',
    subtitle: 'The god of war and victory — Kartikeya, commander of the divine army',
    significance: 'Lord Murugan (Kartikeya/Subramanya) is the son of Shiva and Parvati. He is especially revered in Tamil Nadu and Sri Lanka, where he is the primary deity.',
    temples: [{ name: 'Palani Dhandayudhapani', location: 'Tamil Nadu', why: 'Most important Murugan temple — famous herbal medicine idol' }, { name: 'Tiruchendur', location: 'Tamil Nadu', why: 'Coastal Murugan temple where Soorapadman was defeated' }],
  },
  ayyappa: { name: 'Lord Ayyappa', icon: '🙏', bg: 'from-slate-800 to-gray-700',
    subtitle: 'The celibate god of Sabarimala — born of Vishnu and Shiva',
    significance: 'Lord Ayyappa is worshipped at Sabarimala, the world\'s second largest annual pilgrimage (after Hajj). The 41-day Vratha (austerity) undertaken by pilgrims is a powerful spiritual discipline.',
    temples: [{ name: 'Sabarimala', location: 'Kerala', why: 'Largest pilgrimage — 5 crore pilgrims annually in Mandala season' }],
  },
  dattatreya: { name: 'Lord Dattatreya', icon: '🌟', bg: 'from-amber-900 to-yellow-800',
    subtitle: 'The divine guru — combined form of Brahma, Vishnu, and Shiva',
    significance: 'Lord Dattatreya is the Adi-Guru (first teacher), combining all three aspects of the Trinity. He wanders the earth as an ascetic, teaching through his 24 Gurus (teachers found in nature).',
    temples: [{ name: 'Basara (Dattatreya Temple)', location: 'Telangana', why: 'On the Godavari — next to Gnana Saraswati temple', weHave: true }, { name: 'Ganagapur', location: 'Karnataka', why: 'Most revered Datta shrine in South India' }],
    packageSlugs: ['basara-1day'],
  },
  padmanabhaswami: { name: 'Lord Padmanabha Swamy', icon: '🐢', bg: 'from-teal-900 to-cyan-800',
    subtitle: 'Anantashayana Vishnu — the reclining Vishnu on the serpent Ananta',
    significance: 'Lord Padmanabha Swamy at Thiruvananthapuram is Vishnu in the cosmic sleeping pose on the serpent Adishesha. The Sree Padmanabhaswamy Temple is one of the richest temples in the world.',
    temples: [{ name: 'Sree Padmanabhaswamy Temple', location: 'Thiruvananthapuram, Kerala', why: 'One of the world\'s richest temples — vaults hold billions in gold' }],
  },
  navagraha: { name: 'Navagraha', icon: '🌞', bg: 'from-purple-900 to-indigo-800',
    subtitle: '9 celestial deities — the 9 planetary influences on human life',
    significance: 'The Navagraha (9 planets) are worshipped to mitigate the negative effects of planetary positions in one\'s horoscope. Navagraha temples have specific rituals for each planet.',
    temples: [{ name: 'Navagraha Temples, Kumbakonam', location: 'Tamil Nadu', why: '9 separate temples for each planet within 25km — most famous Navagraha circuit' }],
  },
  saibaba: { name: 'Sai Baba of Shirdi', icon: '🏠', bg: 'from-gray-700 to-gray-600',
    subtitle: 'The saint of Shirdi — revered by Hindus and Muslims alike',
    significance: 'Sai Baba of Shirdi (1838-1918) is one of the most revered saints of modern India, venerated by both Hindus and Muslims. His principal teaching was the unity of God across all religions.',
    temples: [{ name: 'Shirdi Sai Baba Temple', location: 'Shirdi, Maharashtra', why: 'Most visited pilgrimage in Maharashtra — 40,000+ pilgrims daily' }],
  },
  subramanya: { name: 'Lord Subramanya', icon: '🔥', bg: 'from-red-900 to-orange-800',
    subtitle: 'God of war and youth — the peacock-riding son of Shiva',
    significance: 'Lord Subramanya (Murugan/Kartikeya) is the son of Shiva, born specifically to destroy the demon Soorapadman. He represents divine youth, energy, and valor.',
    temples: [{ name: 'Kukke Subramanya', location: 'Karnataka', why: 'Most powerful Subramanya shrine — serpent deity worship' }, { name: 'Palani', location: 'Tamil Nadu', why: 'Murugan with the staff — 4 crore pilgrims annually' }],
  },
}

export default async function DeityPage({ params }: { params: Promise<{ deity: string }> }) {
  const { deity } = await params
  const data = deityData[deity]

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-5xl mb-4">🙏</div>
        <h1 className="font-heading text-4xl font-semibold text-gray-900 mb-3">Coming Soon</h1>
        <p className="text-gray-500 mb-6">This deity page is being built.</p>
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
          <div className="text-6xl mb-3">{data.icon}</div>
          <h1 className="font-heading text-5xl font-semibold mb-3">{data.name}</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">{data.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {data.significance && (
          <div className="bg-cream rounded-2xl p-6">
            <p className="text-gray-700 leading-relaxed text-lg">{data.significance}</p>
          </div>
        )}

        {data.temples && data.temples.length > 0 && (
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-5">Key Temples</h2>
            <div className="space-y-3">
              {data.temples.map((t, i) => (
                <div key={i} className={`rounded-xl border p-5 ${t.weHave ? 'bg-orange-50 border-saffron/30' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{t.name}</span>
                        {t.weHave && <span className="text-xs bg-saffron text-white px-2 py-0.5 rounded-full">Package Available ✓</span>}
                      </div>
                      <p className="text-sm text-gray-500">📍 {t.location}</p>
                      <p className="text-sm text-gray-600 mt-1 italic">{t.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedPackages.length > 0 && (
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-5">Book Your Pilgrimage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPackages.map(p => <PackageCard key={p.slug} pkg={p} />)}
            </div>
          </div>
        )}

        <div className="bg-hero text-white rounded-2xl p-8 text-center">
          <h3 className="font-heading text-2xl font-semibold mb-2">Seek Blessings of {data.name}</h3>
          <p className="text-gray-300 mb-5">We handle every temple, every transfer, every stay.</p>
          <Link href="/plan-trip"
            className="inline-block bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3 rounded-full transition-colors">
            Plan This Pilgrimage →
          </Link>
        </div>
      </div>
    </div>
  )
}
