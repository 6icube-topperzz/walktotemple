import { notFound } from 'next/navigation'
import { getTrust, trusts as allTrusts } from '@/data/trusts'
import Link from 'next/link'

export async function generateStaticParams() {
  return allTrusts.map(t => ({ slug: t.slug }))
}

export default async function TrustPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const trust = getTrust(slug)
  if (!trust) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-400 mb-4">
        <Link href="/trusts" className="hover:text-orange-500">Trusts & Donations</Link> · {trust.shortName}
      </p>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{trust.emoji}</span>
          <div>
            <h1 className="font-heading text-2xl font-semibold text-gray-900">{trust.name}</h1>
            <p className="text-sm text-gray-500 mt-1">📍 {trust.location}, {trust.state}</p>
            <p className="text-sm text-orange-600 mt-0.5">🙏 {trust.deity}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">{trust.description}</p>
        {trust.accepts80G && (
          <div className="mt-3 bg-green-50 rounded-lg px-4 py-2 text-sm text-green-700 flex items-center gap-2">
            ✓ 80G Certificate — tax benefit up to 50% of donation
          </div>
        )}
      </div>

      <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">Choose Donation</h2>
      <div className="space-y-3">
        {trust.donationTypes.map(dt => (
          <div key={dt.name} className="bg-white rounded-xl border border-gray-200 hover:border-orange-300 p-4 flex items-center justify-between transition-colors group">
            <div>
              <p className="text-sm font-semibold text-gray-900">{dt.name}</p>
              {dt.description && <p className="text-xs text-gray-500 mt-0.5">{dt.description}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-semibold text-orange-500">
                {dt.amount ? `₹${dt.amount.toLocaleString()}` : 'Any amount'}
              </span>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-1.5 rounded-xl transition-colors">
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-amber-50 rounded-2xl p-5 text-sm text-center text-orange-800">
        💳 UPI · Net Banking · Debit / Credit Card accepted. Receipt emailed instantly.
        {trust.accepts80G && ' 80G certificate within 24 hours.'}
      </div>
    </main>
  )
}
