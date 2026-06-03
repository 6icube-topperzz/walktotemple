import { getPoojaByCategory } from '@/data/poojaStore'

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  'puja-kits': { label: 'Puja Kits', emoji: '🪔' },
  'idols': { label: 'Idols & Murthis', emoji: '🐘' },
  'diyas': { label: 'Diyas & Lamps', emoji: '🕯️' },
  'agarbatti': { label: 'Agarbatti & Dhoop', emoji: '🌿' },
  'samagri': { label: 'Samagri', emoji: '🏺' },
  'threads': { label: 'Sacred Threads', emoji: '🧵' },
  'festival': { label: 'Festival Specials', emoji: '🎉' },
  'all': { label: 'All Products', emoji: '🪔' },
}

export default async function PoojaStoreCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const info = CATEGORY_LABELS[category] ?? { label: category.charAt(0).toUpperCase() + category.slice(1), emoji: '🪔' }
  const products = getPoojaByCategory(category)
  const display = products.length > 0 ? products : getPoojaByCategory('all')

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">
          <a href="/pooja-store" className="hover:text-orange-500">Pooja Store</a> · {info.label}
        </p>
        <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.emoji} {info.label}</h1>
        <p className="text-sm text-gray-500 mt-1">{display.length} products</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {display.map(product => (
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
