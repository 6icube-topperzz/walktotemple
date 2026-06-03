import { notFound } from 'next/navigation'
import { getPackage, getDepartures, getPickupPoints, packages as allPackages } from '@/data/packages'
import PackageCard from '@/components/PackageCard'
import BookingPanel from './BookingPanel'

export async function generateStaticParams() {
  return allPackages.map(p => ({ slug: p.slug }))
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = getPackage(slug)
  if (!pkg) notFound()

  const departures = getDepartures(slug)
  const pickups = getPickupPoints(slug)
  const similar = allPackages.filter(p => p.slug !== slug && p.deity === pkg.deity && p.isActive).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-orange-100 px-6 py-3">
        <div className="max-w-7xl mx-auto text-sm text-gray-500">
          <a href="/" className="hover:text-saffron">Home</a> ·{' '}
          <a href="/pilgrimages" className="hover:text-saffron">Pilgrimages</a> ·{' '}
          <span className="text-gray-900">{pkg.nameEn}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT — Package details */}
          <div className="flex-1 min-w-0">
            {/* Cover */}
            <div className="relative h-72 bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
              <div className="text-[120px] opacity-20">🛕</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <h1 className="font-heading text-4xl font-semibold text-white">{pkg.nameEn}</h1>
                {pkg.nameTe && <p className="text-gold text-lg">{pkg.nameTe}</p>}
                <div className="flex items-center gap-3 mt-2 text-white/80 text-sm">
                  <span>📍 {pkg.state}</span>
                  <span>·</span>
                  <span>📅 {pkg.durationDays}D{pkg.durationNights > 0 ? `/${pkg.durationNights}N` : ''}</span>
                  <span>·</span>
                  <span>{pkg.deityIcon} {pkg.deity}</span>
                </div>
              </div>
              {pkg.tag && (
                <div className="absolute top-4 right-4 bg-saffron text-white text-xs font-bold px-3 py-1 rounded-full">{pkg.tag}</div>
              )}
            </div>

            {/* Rating bar */}
            <div className="flex items-center gap-4 mb-6 bg-white rounded-xl p-4 shadow-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-xl ${i < Math.floor(pkg.rating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <span className="font-bold text-gray-900 text-lg">{pkg.rating}</span>
              <span className="text-gray-500 text-sm">({pkg.reviewCount.toLocaleString()} reviews)</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500 text-sm">{pkg.totalBookings.toLocaleString()} bookings</span>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 mb-5 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-3">About This Package</h2>
              <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 mb-5 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Highlights</h2>
              <ul className="space-y-2">
                {pkg.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-saffron mt-1 shrink-0">✓</span>
                    <span className="text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Temples covered */}
            <div className="bg-white rounded-2xl p-6 mb-5 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Temples Covered</h2>
              <div className="flex flex-wrap gap-2">
                {pkg.templesCovered.map((t, i) => (
                  <span key={i} className="bg-orange-50 text-saffron-dark text-sm px-4 py-2 rounded-xl border border-orange-200">
                    🛕 {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-xs">✓</span>
                  Inclusions
                </h3>
                <ul className="space-y-1.5">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">✕</span>
                  Exclusions
                </h3>
                <ul className="space-y-1.5">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-300 rounded-full shrink-0" />
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pickup points */}
            {pickups.length > 0 && (
              <div className="bg-white rounded-2xl p-6 mb-5 shadow-sm">
                <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Pickup Points</h2>
                <div className="space-y-2">
                  {pickups.map((p, i) => (
                    <div key={i} className="flex items-center justify-between bg-cream rounded-lg px-4 py-2.5">
                      <span className="text-sm text-gray-700">🚌 {p.city} — {p.location}</span>
                      <span className="text-sm font-semibold text-saffron">{p.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar packages */}
            {similar.length > 0 && (
              <div className="mt-8">
                <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-5">Similar Packages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map(p => <PackageCard key={p.slug} pkg={p} />)}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Booking sidebar */}
          <div className="lg:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-24">
              <BookingPanel pkg={pkg} departures={departures} pickupPoints={pickups} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
