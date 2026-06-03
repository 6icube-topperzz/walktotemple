import Link from 'next/link'

const DEITIES = [
  { slug: 'shiva', label: 'Lord Shiva', emoji: '🔱', desc: 'Jyotirlingas, Kedar, Srisailam' },
  { slug: 'vishnu', label: 'Lord Vishnu', emoji: '🪷', desc: 'Tirupati, Divya Desams, Badrinath' },
  { slug: 'narasimha', label: 'Lakshmi Narasimha', emoji: '🦁', desc: 'Yadadri, Ahobilam, Simhachalam' },
  { slug: 'hanuman', label: 'Hanuman', emoji: '🙏', desc: 'Kondagattu, Dharmapuri, Hampi' },
  { slug: 'devi', label: 'Shakti / Devi', emoji: '🌺', desc: '51 Shakti Peethas & more' },
  { slug: 'durga', label: 'Durga', emoji: '⚡', desc: 'Vijayawada, Chamundi, Vaishno Devi' },
  { slug: 'ganesha', label: 'Ganesha', emoji: '🐘', desc: 'Ashtavinayak, Pillayarpatti' },
  { slug: 'murugan', label: 'Murugan', emoji: '🎺', desc: 'Arupadaiveedu, Pazhani, Tiruchendur' },
  { slug: 'parvathi', label: 'Parvathi', emoji: '🌸', desc: 'Kanchi Kamakshi, Madurai Meenakshi' },
  { slug: 'rama', label: 'Rama', emoji: '🏹', desc: 'Bhadrachalam, Ayodhya, Rameswaram' },
  { slug: 'krishna', label: 'Krishna', emoji: '🪈', desc: 'Vrindavan, Udupi, Guruvayur' },
  { slug: 'dattatreya', label: 'Dattatreya', emoji: '🌟', desc: 'Gangapur, Pithapuram, Srisailam' },
  { slug: 'ayyappa', label: 'Ayyappa', emoji: '🔥', desc: 'Sabarimala & other Ayyappa shrines' },
  { slug: 'lakshmi', label: 'Goddess Lakshmi', emoji: '💰', desc: 'Kolhapur, Padmanabhaswamy' },
  { slug: 'saraswati', label: 'Saraswati', emoji: '📚', desc: 'Basara, Koothanur, Shringeri' },
  { slug: 'navagraha', label: 'Navagraha', emoji: '🌞', desc: 'Nine-planet temple circuits' },
  { slug: 'saibaba', label: 'Saibaba', emoji: '🏠', desc: 'Shirdi & Saibaba shrines' },
  { slug: 'padmanabha', label: 'Padmanabha Swamy', emoji: '🌊', desc: 'Thiruvananthapuram' },
  { slug: 'subramanya', label: 'Subramanya', emoji: '🙏', desc: 'Kukke, Ghati Subramanya' },
  { slug: 'kali', label: 'Kali', emoji: '🌙', desc: 'Kalighat, Kamakhya, Kollur' },
  { slug: 'sita', label: 'Sita', emoji: '🌸', desc: 'Sitamarhi, Janakpur, Bhadrachalam' },
  { slug: 'venkateswara', label: 'Venkateswara', emoji: '🛕', desc: 'Tirumala & other Venkatesa temples' },
]

export default function AllDeitiesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">Temples by Deity</h1>
        <p className="text-gray-500 mt-1">Choose your ishta devata and find pilgrimage packages</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {DEITIES.map(d => (
          <Link
            key={d.slug}
            href={`/temples/deity/${d.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md p-4 transition-all"
          >
            <span className="text-4xl block mb-2">{d.emoji}</span>
            <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">{d.label}</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-snug">{d.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
