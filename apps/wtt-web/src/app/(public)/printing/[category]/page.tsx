import Link from 'next/link'
import { getPrintByCategory } from '@/data/printing'

const LABELS: Record<string, { label: string; emoji: string }> = {
  calendars: { label: 'Calendars', emoji: '📅' },
  diaries: { label: 'Diaries', emoji: '📓' },
  posters: { label: 'Posters & Frames', emoji: '🖼️' },
  invitations: { label: 'Invitations', emoji: '📨' },
  panchanga: { label: 'Panchanga', emoji: '🌙' },
  custom: { label: 'Custom Printing', emoji: '🖨️' },
}

export default async function PrintingCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const info = LABELS[category] ?? { label: category, emoji: '🖨️' }
  const products = getPrintByCategory(category)
  const display = products.length > 0 ? products : getPrintByCategory('all')

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">
          <Link href="/printing" className="hover:text-orange-500">Printing</Link> · {info.label}
        </p>
        <h1 className="font-heading text-3xl font-semibold text-gray-900">{info.emoji} {info.label}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {display.map(product => (
          <div key={product.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-5xl">{product.emoji}</div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-heading text-base font-semibold text-gray-900">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1 flex-1">{product.description}</p>
              {product.customisable && product.customiseNote && (
                <div className="mt-2 bg-amber-50 rounded-lg px-3 py-1.5">
                  <p className="text-xs text-orange-700">✏️ {product.customiseNote}</p>
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="font-heading text-xl font-semibold text-orange-500">
                  ₹{product.price}{product.priceUnit ? ` ${product.priceUnit}` : ''}
                </span>
                {product.customisable ? (
                  <Link href={`/printing/customise/${product.slug}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                    Customise →
                  </Link>
                ) : (
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">Order →</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
