import Link from 'next/link'

const DHAMS = [
  { slug: 'bada-char-dham', label: 'Bada Char Dham', emoji: '🏔️', desc: 'Badrinath · Dwarka · Puri · Rameswaram', tag: 'All-India Circuit' },
  { slug: 'chota-char-dham', label: 'Chota Char Dham', emoji: '⛰️', desc: 'Kedarnath · Badrinath · Yamunotri · Gangotri', tag: 'Uttarakhand' },
  { slug: 'panch-kedar', label: 'Panch Kedar', emoji: '🔱', desc: 'Five forms of Shiva in Garhwal Himalayas', tag: 'Uttarakhand' },
  { slug: 'panch-badri', label: 'Panch Badri', emoji: '🪷', desc: 'Five forms of Vishnu in Uttarakhand', tag: 'Uttarakhand' },
  { slug: 'sapta-puri', label: 'Sapta Puri', emoji: '🏛️', desc: 'Seven sacred cities of India', tag: 'All-India' },
  { slug: 'amarnath', label: 'Amarnath Yatra', emoji: '❄️', desc: 'Sacred ice Shiva lingam in the Himalayas', tag: 'June–Aug' },
  { slug: 'vaishnodevi', label: 'Vaishno Devi', emoji: '🌺', desc: 'Mata Vaishno Devi in the Trikuta mountains', tag: 'Jammu' },
  { slug: 'kailash-mansarovar', label: 'Kailash Mansarovar', emoji: '🌍', desc: 'Abode of Lord Shiva in Tibet', tag: 'Coming soon' },
  { slug: 'jyotirlingas', label: '12 Jyotirlingas', emoji: '🔱', desc: '12 most sacred Shiva temples across India', tag: 'All-India' },
  { slug: 'shakti-peethas', label: '51 Shakti Peethas', emoji: '🌺', desc: 'Sacred shrines of Goddess Shakti', tag: 'All-India' },
  { slug: 'divya-desams', label: '108 Divya Desams', emoji: '🪷', desc: 'Vishnu temples sung by Alvar saints', tag: 'South India' },
  { slug: 'pancha-bootha', label: 'Pancha Bootha Sthalas', emoji: '🌟', desc: 'Five Shiva temples — five elements', tag: 'Tamil Nadu' },
]

export default function AllDhamsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">Dham Yatras & Sacred Circuits</h1>
        <p className="text-gray-500 mt-1">Curated packages for India's most sacred pilgrimage circuits</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DHAMS.map(d => (
          <Link
            key={d.slug}
            href={`/temples/dham/${d.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md p-5 transition-all flex gap-4 items-start"
          >
            <span className="text-4xl shrink-0">{d.emoji}</span>
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">{d.label}</p>
                <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full shrink-0">{d.tag}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-snug">{d.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
