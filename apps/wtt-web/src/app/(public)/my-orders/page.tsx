import Link from 'next/link'

export default function MyOrdersPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold text-gray-900 mb-2">My Orders</h1>
      <p className="text-sm text-gray-500 mb-8">Track your pooja items, gifts, and print orders</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="text-5xl mb-4">📦</div>
        <p className="text-gray-500 text-sm">No orders yet.</p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <Link href="/pooja-store" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
            Shop Pooja Store
          </Link>
          <Link href="/gifting" className="border border-orange-300 text-orange-600 hover:bg-orange-50 text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
            Browse Gifts
          </Link>
        </div>
      </div>
    </main>
  )
}
