'use client'
import Link from 'next/link'

const pills = [
  { label: 'All Packages', icon: '🛕', href: '/pilgrimages' },
  { label: 'Day Trips', icon: '☀️', href: '/pilgrimages/day-trips' },
  { label: 'Weekend', icon: '🌙', href: '/pilgrimages/weekend' },
  { label: 'Extended', icon: '📅', href: '/pilgrimages/extended' },
  { label: 'Shiva Temples', icon: '🔱', href: '/deity/shiva' },
  { label: 'Vishnu Temples', icon: '🪷', href: '/deity/vishnu' },
  { label: 'Devi Temples', icon: '🌺', href: '/deity/devi' },
  { label: 'Ganesha', icon: '🐘', href: '/deity/ganesha' },
  { label: 'Char Dham', icon: '🏔️', href: '/char-dham' },
  { label: 'Jyotirlingas', icon: '⚡', href: '/jyotirlingas' },
  { label: 'Festival Special', icon: '🎉', href: '/festival/karthika' },
  { label: 'Family', icon: '👨‍👩‍👧', href: '/pilgrimages/family' },
  { label: 'Senior Special', icon: '👴', href: '/pilgrimages/senior' },
  { label: 'Village Stays', icon: '🌿', href: '/village-experiences' },
]

export default function CategoryPills() {
  return (
    <section className="bg-cream py-5 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {pills.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:border-saffron hover:bg-orange-50 hover:text-saffron-dark text-gray-700 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 shadow-sm"
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
