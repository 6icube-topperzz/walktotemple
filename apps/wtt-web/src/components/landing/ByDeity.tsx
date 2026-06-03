'use client'
import { useState } from 'react'
import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import type { Package } from '@/data/packages'

const deities = [
  { key: 'Vishnu', label: 'Lord Vishnu', icon: '🪷' },
  { key: 'Shiva', label: 'Lord Shiva', icon: '🔱' },
  { key: 'Devi', label: 'Goddess Devi', icon: '🌺' },
  { key: 'Rama', label: 'Lord Rama', icon: '🏹' },
  { key: 'Ganesha', label: 'Lord Ganesha', icon: '🐘' },
  { key: 'Hanuman', label: 'Lord Hanuman', icon: '🙏' },
  { key: 'Murugan', label: 'Lord Murugan', icon: '🎺' },
  { key: 'Krishna', label: 'Lord Krishna', icon: '🪈' },
]

interface Props { packages: Package[] }

export default function ByDeity({ packages }: Props) {
  const [active, setActive] = useState('Vishnu')

  const filtered = packages.filter(p => p.deity.toLowerCase().includes(active.toLowerCase()))

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">Find Temples by Your Deity</h2>
          <p className="text-gray-500">Every deity has sacred abodes across India. Find yours.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {deities.map(d => (
            <button
              key={d.key}
              onClick={() => setActive(d.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === d.key
                  ? 'bg-saffron text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-saffron hover:text-saffron'
              }`}
            >
              <span>{d.icon}</span> {d.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.slice(0, 4).map(pkg => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">
              {deities.find(d => d.key === active)?.icon}
            </div>
            <p className="text-gray-500">Packages coming soon!</p>
            <Link href="/plan-trip" className="mt-3 inline-block text-saffron hover:underline text-sm font-medium">
              Request a custom package →
            </Link>
          </div>
        )}

        <div className="text-center mt-8">
          <Link href={`/deity/${active.toLowerCase()}`}
            className="text-saffron hover:text-saffron-dark font-medium text-sm inline-flex items-center gap-1">
            View all {deities.find(d => d.key === active)?.label} packages →
          </Link>
        </div>
      </div>
    </section>
  )
}
