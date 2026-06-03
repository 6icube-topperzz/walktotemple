import Link from 'next/link'
import type { Package } from '@/data/packages'

interface Props {
  pkg: Package
  nextDate?: string
  seatsLeft?: number
}

export default function PackageCard({ pkg, nextDate, seatsLeft }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-amber-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">🛕</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {pkg.tag && (
          <div className="absolute top-3 left-3 bg-saffron text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {pkg.tag}
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {pkg.deityIcon} {pkg.deity}
          </span>
          <span className="bg-white/90 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            📅 {pkg.durationDays}D{pkg.durationNights > 0 ? `/${pkg.durationNights}N` : ''}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-gray-900 group-hover:text-saffron transition-colors leading-tight">
          {pkg.nameEn}
        </h3>
        {pkg.nameTe && <p className="text-xs text-gray-500 mt-0.5">{pkg.nameTe}</p>}

        <p className="text-xs text-gray-500 mt-1 mb-2">📍 {pkg.state}</p>

        {/* Temples */}
        <div className="flex flex-wrap gap-1 mb-3">
          {pkg.templesCovered.slice(0, 2).map((t, i) => (
            <span key={i} className="text-xs bg-orange-50 text-saffron-dark px-2 py-0.5 rounded-full">
              🛕 {t.split(',')[0]}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(pkg.rating) ? 'text-amber-400' : 'text-gray-200'}`}>{s}</span>
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">{pkg.rating}</span>
          <span className="text-xs text-gray-400">({pkg.reviewCount.toLocaleString()})</span>
        </div>

        {/* Next departure */}
        {nextDate && seatsLeft !== undefined && (
          <div className="flex items-center justify-between text-xs mb-3 bg-orange-50 rounded-lg px-2.5 py-1.5">
            <span className="text-gray-600">Next: {new Date(nextDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            <span className={`font-semibold ${seatsLeft <= 5 ? 'text-red-500' : 'text-green-600'}`}>
              {seatsLeft} seats left {seatsLeft <= 5 ? '🔥' : ''}
            </span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400">From</span>
            <div className="font-heading text-xl font-semibold text-saffron">
              ₹{pkg.pricePerPerson.toLocaleString()}
              <span className="text-xs text-gray-400 font-normal font-body"> / person</span>
            </div>
          </div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="bg-saffron hover:bg-saffron-dark text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  )
}
