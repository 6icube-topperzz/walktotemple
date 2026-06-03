'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import type { Package, DepartureDate } from '@/data/packages'

interface Props {
  packages: Package[]
  departures: DepartureDate[]
}

export default function FeaturedPackages({ packages, departures }: Props) {
  const [start, setStart] = useState(0)
  const visible = 3
  const canPrev = start > 0
  const canNext = start + visible < packages.length

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">Popular Pilgrimages from Hyderabad</h2>
          <p className="text-gray-500">Most booked packages this month</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {canPrev && (
            <button
              onClick={() => setStart(s => Math.max(0, s - 1))}
              className="carousel-arrow left-[-20px]"
            >
              ←
            </button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
            {packages.slice(start, start + visible).map(pkg => {
              const dep = departures.find(d => d.packageSlug === pkg.slug)
              return (
                <PackageCard
                  key={pkg.slug}
                  pkg={pkg}
                  nextDate={dep?.date}
                  seatsLeft={dep ? dep.totalSeats - dep.bookedSeats : undefined}
                />
              )
            })}
          </div>

          {canNext && (
            <button
              onClick={() => setStart(s => Math.min(packages.length - visible, s + 1))}
              className="carousel-arrow right-[-20px]"
            >
              →
            </button>
          )}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link href="/pilgrimages"
            className="inline-flex items-center gap-2 border-2 border-saffron text-saffron hover:bg-saffron hover:text-white font-semibold px-8 py-3 rounded-full transition-all">
            View All Packages →
          </Link>
        </div>
      </div>
    </section>
  )
}
