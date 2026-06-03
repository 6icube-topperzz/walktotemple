import Link from 'next/link'
import { getAllTrusts } from '@/data/trusts'

export default function TrustsPage() {
  const trusts = getAllTrusts()

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">🏛️ Trusts & Donations</h1>
        <p className="text-sm text-gray-500 mt-1">Donate to verified temple trusts. 80G certificates auto-generated. UPI + Cards accepted.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {trusts.map(trust => (
          <div key={trust.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{trust.emoji}</div>
              <div className="flex-1 min-w-0">
                <h2 className="font-heading text-lg font-semibold text-gray-900">{trust.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">📍 {trust.location}, {trust.state}</p>
                <p className="text-sm text-orange-600 mt-0.5">🙏 {trust.deity}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{trust.description}</p>

                {/* Donation types preview */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {trust.donationTypes.slice(0, 3).map(dt => (
                    <span key={dt.name} className="text-xs bg-orange-50 text-orange-700 border border-orange-100 rounded-full px-2.5 py-1">
                      {dt.name}{dt.amount ? ` — ₹${dt.amount.toLocaleString()}` : ''}
                    </span>
                  ))}
                  {trust.donationTypes.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-1">+{trust.donationTypes.length - 3} more</span>
                  )}
                </div>

                {trust.accepts80G && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    ✓ 80G certificate auto-generated
                  </p>
                )}

                <Link
                  href={`/trusts/${trust.slug}`}
                  className="mt-4 inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
                >
                  Donate Now →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-10 bg-amber-50 rounded-2xl p-6 flex flex-wrap gap-6 items-center justify-center text-center">
        <div>
          <div className="text-2xl font-bold text-orange-500">₹2.4 Cr+</div>
          <div className="text-xs text-gray-500 mt-0.5">Donated via WalkToTemple</div>
        </div>
        <div className="w-px h-8 bg-orange-200 hidden sm:block" />
        <div>
          <div className="text-2xl font-bold text-orange-500">4</div>
          <div className="text-xs text-gray-500 mt-0.5">Verified temple trusts</div>
        </div>
        <div className="w-px h-8 bg-orange-200 hidden sm:block" />
        <div>
          <div className="text-2xl font-bold text-orange-500">100%</div>
          <div className="text-xs text-gray-500 mt-0.5">Goes to the trust</div>
        </div>
        <div className="w-px h-8 bg-orange-200 hidden sm:block" />
        <div>
          <div className="text-2xl font-bold text-orange-500">80G</div>
          <div className="text-xs text-gray-500 mt-0.5">Tax benefit on all donations</div>
        </div>
      </div>
    </main>
  )
}
