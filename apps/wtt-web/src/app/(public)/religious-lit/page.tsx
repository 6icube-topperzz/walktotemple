import Link from 'next/link'
import { litProducts } from '@/data/literature'

export default function ReligiousLitPage() {
  const categories = [
    { key: 'books', label: 'Books', emoji: '📗' },
    { key: 'scriptures', label: 'Scriptures', emoji: '📜' },
    { key: 'audio', label: 'Audio / Music', emoji: '🎵' },
    { key: 'childrens', label: "Children's", emoji: '🧒' },
  ]

  const languages = ['Telugu', 'Tamil', 'Kannada', 'Hindi', 'Sanskrit', 'English', 'Malayalam', 'Marathi']

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-gray-900">📖 Religious Literature</h1>
        <p className="text-sm text-gray-500 mt-1">Sacred books, scriptures, and devotional audio</p>
      </div>

      {/* Category links */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(c => (
          <Link key={c.key} href={`/religious-lit/${c.key}`}
            className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-full px-4 py-2 text-sm font-medium transition-colors">
            {c.emoji} {c.label}
          </Link>
        ))}
      </div>

      {/* By language */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Browse by Language</h2>
        <div className="flex flex-wrap gap-2">
          {languages.map(lang => (
            <Link key={lang} href={`/religious-lit/language/${lang.toLowerCase()}`}
              className="px-3 py-1.5 bg-white border border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-700 rounded-full text-sm transition-colors">
              {lang}
            </Link>
          ))}
        </div>
      </div>

      {/* All products */}
      <h2 className="font-heading text-xl font-semibold text-gray-800 mb-4">All Titles</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {litProducts.map(product => (
          <div key={product.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center text-5xl">
              {product.emoji}
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-gray-900 leading-tight">{product.name}</h3>
              {product.language && (
                <span className="text-xs text-orange-600 mt-0.5 capitalize">{product.language}</span>
              )}
              <p className="text-xs text-gray-500 mt-1 flex-1 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span className="font-heading text-base font-semibold text-orange-500">₹{product.price}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
