import Link from 'next/link'

const cols = [
  {
    title: 'PILGRIMAGES',
    links: [
      { label: 'Day Trips', href: '/pilgrimages/day-trips' },
      { label: 'Weekend Journeys', href: '/pilgrimages/weekend' },
      { label: 'Extended Trips', href: '/pilgrimages/extended' },
      { label: 'Family Packages', href: '/pilgrimages/family' },
      { label: 'Senior Special', href: '/pilgrimages/senior' },
      { label: 'Group Pilgrimages', href: '/pilgrimages/group' },
    ],
  },
  {
    title: 'BY DEITY',
    links: [
      { label: '🔱 Shiva Temples', href: '/deity/shiva' },
      { label: '🪷 Vishnu Temples', href: '/deity/vishnu' },
      { label: '🌺 Devi Temples', href: '/deity/devi' },
      { label: '🐘 Ganesha', href: '/deity/ganesha' },
      { label: '🙏 Hanuman', href: '/deity/hanuman' },
      { label: '🏹 Rama Temples', href: '/deity/rama' },
    ],
  },
  {
    title: 'SACRED CIRCUITS',
    links: [
      { label: '12 Jyotirlingas', href: '/jyotirlingas' },
      { label: 'Char Dham Yatra', href: '/char-dham' },
      { label: 'Shakti Peethas', href: '/shakti-peethas' },
      { label: 'Divya Desams', href: '/divya-desams' },
      { label: 'Festival Pilgrimages', href: '/festival/karthika' },
      { label: 'Village Experiences', href: '/village-experiences' },
    ],
  },
  {
    title: 'REGIONS',
    links: [
      { label: 'Telangana', href: '/region/telangana' },
      { label: 'Andhra Pradesh', href: '/region/andhra-pradesh' },
      { label: 'Tamil Nadu', href: '/region/tamil-nadu' },
      { label: 'Karnataka', href: '/region/karnataka' },
      { label: 'Uttar Pradesh', href: '/region/uttar-pradesh' },
      { label: 'Uttarakhand', href: '/region/uttarakhand' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Become a Tour Partner', href: '/partner' },
      { label: 'Plan My Trip', href: '/plan-trip' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-hero text-white">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        {/* Logo + tagline */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🛕</span>
            <div>
              <div className="font-heading text-2xl font-semibold">WalkToTemple</div>
              <div className="text-saffron text-sm">Sacred Journeys. Simplified.</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Curated pilgrimage packages across India. Transport, accommodation, and darshan — all arranged so you can focus on the divine.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{col.title}</h4>
              <ul className="space-y-1.5">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-300 hover:text-saffron transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            🛕 Connecting devotees to their sacred temples · A 6icube product
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Payments:</span>
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">UPI</span>
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">Razorpay</span>
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">COD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
