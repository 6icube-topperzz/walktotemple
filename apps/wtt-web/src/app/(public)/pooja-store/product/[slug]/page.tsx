import { notFound } from 'next/navigation'
import { getPoojaProduct, poojaProducts } from '@/data/poojaStore'
import Link from 'next/link'

export async function generateStaticParams() {
  return poojaProducts.map(p => ({ slug: p.slug }))
}

export default async function PoojaProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getPoojaProduct(slug)
  if (!product) notFound()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-400 mb-4">
        <Link href="/pooja-store" className="hover:text-orange-500">Pooja Store</Link> · {product.name}
      </p>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-8xl">
          {product.emoji}
        </div>
        <div className="p-6">
          <h1 className="font-heading text-2xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          <div className="flex items-center justify-between mt-6">
            <div>
              <span className="text-xs text-gray-400">Price</span>
              <div className="font-heading text-3xl font-semibold text-orange-500">₹{product.price}</div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
