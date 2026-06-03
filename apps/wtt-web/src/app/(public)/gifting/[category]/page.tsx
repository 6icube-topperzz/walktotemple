import Link from 'next/link'
import { getGiftByCategory } from '@/data/gifting'

const LABELS: Record<string, string> = {
  gruhapravesham: 'Gruhapravesham',
  wedding: 'Wedding',
  'new-baby': 'New Baby',
  festival: 'Festival',
  prasadam: 'Prasadam Box',
  souvenir: 'Temple Souvenir',
  birthday: 'Birthday',
  custom: 'Custom',
}

export default async function GiftingCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const label = LABELS[category] ?? category
  const products = getGiftByCategory(category)
  const display = products.length > 0 ? products : getGiftByCategory('all')

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">
          <Link href="/gifting" className="hover:text-orange-500">Gifting</Link> · {label}
        </p>
        <h1 className="font-heading text-3xl font-semibold text-gray-900">🎁 {label} Gifts</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {display.map(gift => (
          <div key={gift.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-6xl">{gift.emoji}</div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-heading text-base font-semibold text-gray-900">{gift.name}</h3>
              <p className="text-xs text-gray-500 mt-1 flex-1">{gift.description}</p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="font-heading text-xl font-semibold text-orange-500">₹{gift.price}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">Order →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
