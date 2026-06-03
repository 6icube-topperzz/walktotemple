import Link from 'next/link'

const packageTypes = [
  { label: 'All Packages', href: '/pilgrimages', icon: '🛕' },
  { label: 'Day Trips', href: '/pilgrimages/day-trips', icon: '☀️' },
  { label: 'Weekend', href: '/pilgrimages/weekend', icon: '🌙' },
  { label: 'Extended', href: '/pilgrimages/extended', icon: '📅' },
  { label: 'Family', href: '/pilgrimages/family', icon: '👨‍👩‍👧' },
  { label: 'Senior Special', href: '/pilgrimages/senior', icon: '👴' },
  { label: 'Group', href: '/pilgrimages/group', icon: '👥' },
  { label: 'Solo', href: '/pilgrimages/solo', icon: '🚶' },
  { label: 'Corporate', href: '/pilgrimages/corporate', icon: '🏢' },
  { label: 'Festival Special', href: '/festival/karthika', icon: '🎉' },
]

const states = [
  { label: 'Telangana', href: '/region/telangana', icon: '🔱' },
  { label: 'Andhra Pradesh', href: '/region/andhra-pradesh', icon: '🪷' },
  { label: 'Tamil Nadu', href: '/region/tamil-nadu', icon: '🎺' },
  { label: 'Karnataka', href: '/region/karnataka', icon: '🐘' },
  { label: 'Kerala', href: '/region/kerala', icon: '🌴' },
  { label: 'Maharashtra', href: '/region/maharashtra', icon: '🏰' },
  { label: 'Uttar Pradesh', href: '/region/uttar-pradesh', icon: '🙏' },
  { label: 'Uttarakhand', href: '/region/uttarakhand', icon: '🏔️' },
  { label: 'Rajasthan', href: '/region/rajasthan', icon: '🏜️' },
  { label: 'Odisha', href: '/region/odisha', icon: '🌊' },
  { label: 'Gujarat', href: '/region/gujarat', icon: '🏛️' },
  { label: 'West Bengal', href: '/region/west-bengal', icon: '🌸' },
]

export default function DiscoveryStrips() {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      {/* Strip 1 — Package types */}
      <div className="border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide shrink-0 mr-1">Type</span>
          {packageTypes.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-50 hover:bg-saffron hover:text-white text-saffron-dark border border-orange-200 hover:border-saffron rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0"
            >
              <span>{p.icon}</span>
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Strip 2 — States */}
      <div className="py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide shrink-0 mr-1">State</span>
          {states.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-50 hover:bg-hero hover:text-white text-gray-700 border border-gray-200 hover:border-hero rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0"
            >
              <span>{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
