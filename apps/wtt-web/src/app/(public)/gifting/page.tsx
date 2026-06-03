import Link from 'next/link'
import { giftProducts } from '@/data/gifting'

export default function GiftingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">🎁 Sacred Gifting</h1>
        <p className="text-sm text-gray-500 mt-1">Meaningful spiritual gifts for every occasion — curated with devotion</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftProducts.map(gift => (
          <div key={gift.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-6xl">
              {gift.emoji}
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-base font-semibold text-gray-900">{gift.name}</h3>
                  <p className="text-xs text-orange-600 mt-0.5">{gift.occasion}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex-1">{gift.description}</p>

              {/* Contents */}
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">What's inside</p>
                <ul className="space-y-0.5">
                  {gift.contents.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-orange-400 mt-0.5">•</span> {item}
                    </li>
                  ))}
                  {gift.contents.length > 3 && (
                    <li className="text-xs text-gray-400">+{gift.contents.length - 3} more items</li>
                  )}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">From</span>
                  <div className="font-heading text-xl font-semibold text-orange-500">₹{gift.price}</div>
                </div>
                <Link
                  href={`/gifting/${gift.category}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Order →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
