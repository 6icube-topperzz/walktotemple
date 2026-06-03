import { getLitByCategory } from '@/data/literature'

const LABELS: Record<string, { label: string; emoji: string }> = {
  books: { label: 'Books', emoji: '📗' },
  scriptures: { label: 'Scriptures', emoji: '📜' },
  audio: { label: 'Audio / Music', emoji: '🎵' },
  childrens: { label: "Children's", emoji: '🧒' },
}

export default async function LitCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const info = LABELS[category] ?? { label: category, emoji: '📖' }
  const products = getLitByCategory(category)
  const display = products.length > 0 ? products : getLitByCategory('all')

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">
          <a href="/religious-lit" className="hover:text-orange-500">Religious Lit</a> · {info.label}
        </p>
        <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.emoji} {info.label}</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {display.map(product => (
          <div key={product.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center text-5xl">
              {product.emoji}
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-gray-900 leading-tight">{product.name}</h3>
              {product.language && <span className="text-xs text-orange-600 capitalize mt-0.5">{product.language}</span>}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 mt-3">
                <span className="font-heading text-base font-semibold text-orange-500">₹{product.price}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
