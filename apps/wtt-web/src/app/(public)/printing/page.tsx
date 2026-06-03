import Link from 'next/link'
import { printProducts } from '@/data/printing'

export default function PrintingPage() {
  const categories = [
    { key: 'calendars', label: 'Calendars', emoji: '📅' },
    { key: 'diaries', label: 'Diaries', emoji: '📓' },
    { key: 'posters', label: 'Posters & Frames', emoji: '🖼️' },
    { key: 'invitations', label: 'Invitations', emoji: '📨' },
    { key: 'panchanga', label: 'Panchanga', emoji: '🌙' },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">🖨️ Printing</h1>
        <p className="text-sm text-gray-500 mt-1">Personalised calendars, diaries, posters, and invitation cards</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(c => (
          <Link key={c.key} href={`/printing/${c.key}`}
            className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-full px-4 py-2 text-sm font-medium transition-colors">
            {c.emoji} {c.label}
          </Link>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {printProducts.map(product => (
          <div key={product.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-5xl">
              {product.emoji}
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-heading text-base font-semibold text-gray-900">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1 flex-1">{product.description}</p>

              {product.customisable && product.customiseNote && (
                <div className="mt-2 bg-amber-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-orange-700">✏️ {product.customiseNote}</p>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-heading text-xl font-semibold text-orange-500">
                    ₹{product.price}
                  </span>
                  {product.priceUnit && (
                    <span className="text-xs text-gray-400 ml-1">{product.priceUnit}</span>
                  )}
                </div>
                {product.customisable ? (
                  <Link
                    href={`/printing/customise/${product.slug}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Customise →
                  </Link>
                ) : (
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                    Order →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
