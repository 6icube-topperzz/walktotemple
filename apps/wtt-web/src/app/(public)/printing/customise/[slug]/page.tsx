'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { getPrintProduct } from '@/data/printing'

export default function CustomisePrintPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getPrintProduct(slug)

  const [familyName, setFamilyName] = useState('')
  const [deity, setDeity] = useState('Ganesha')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!product || !product.customisable) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link href="/printing" className="mt-4 inline-block text-orange-500 hover:underline">← Back to Printing</Link>
      </main>
    )
  }

  const deities = ['Ganesha', 'Shiva', 'Vishnu', 'Lakshmi', 'Durga', 'Hanuman', 'Saraswati', 'Murugan']

  if (submitted) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="font-heading text-2xl font-semibold text-gray-900">Order Placed!</h1>
        <p className="text-gray-500 mt-2">Your personalised {product.name} is confirmed. We&apos;ll send a preview within 24 hours.</p>
        <Link href="/printing" className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
          Back to Printing
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-400 mb-4">
        <Link href="/printing" className="hover:text-orange-500">Printing</Link> · Customise
      </p>
      <h1 className="font-heading text-2xl font-semibold text-gray-900 mb-1">{product.emoji} {product.name}</h1>
      <p className="text-sm text-gray-500 mb-6">{product.customiseNote}</p>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Family / Person Name</label>
          <input
            type="text"
            value={familyName}
            onChange={e => setFamilyName(e.target.value)}
            placeholder="e.g. Sri Rama Family"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Choose Deity</label>
          <select
            value={deity}
            onChange={e => setDeity(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
          >
            {deities.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Message (optional)</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Gotram, nakshatra, or a personal blessing message"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-gray-400">Total</span>
            <div className="font-heading text-2xl font-semibold text-orange-500">
              ₹{product.price}{product.priceUnit ? ` ${product.priceUnit}` : ''}
            </div>
          </div>
          <button
            onClick={() => setSubmitted(true)}
            disabled={!familyName}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Place Order →
          </button>
        </div>
      </div>
    </main>
  )
}
