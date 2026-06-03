import Link from 'next/link'
import { poojaProducts } from '@/data/poojaStore'

export default function PoojaStorePage() {
  const categories = [
    { key: 'puja-kits', label: 'Puja Kits', emoji: '🪔' },
    { key: 'idols', label: 'Idols & Murthis', emoji: '🐘' },
    { key: 'diyas', label: 'Diyas & Lamps', emoji: '🕯️' },
    { key: 'agarbatti', label: 'Agarbatti & Dhoop', emoji: '🌿' },
    { key: 'samagri', label: 'Samagri', emoji: '🏺' },
    { key: 'threads', label: 'Sacred Threads', emoji: '🧵' },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">🪔 Pooja Store</h1>
        <p className="text-sm text-gray-500 mt-1">Sacred items for your daily puja and special ceremonies</p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(c => (
          <Link
            key={c.key}
            href={`/pooja-store/${c.key}`}
            className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            {c.emoji} {c.label}
          </Link>
        ))}
      </div>

      {/* All products */}
      <h2 className="font-heading text-xl font-semibold text-gray-800 mb-4">All Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {poojaProducts.map(product => (
          <div key={product.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-5xl">
              {product.emoji}
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-gray-900 leading-tight">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1 flex-1 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span className="font-heading text-base font-semibold text-orange-500">₹{product.price}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
