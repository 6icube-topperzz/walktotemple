import Link from 'next/link'

export default async function DonationConfirmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="font-heading text-2xl font-semibold text-gray-900 mb-2">Donation Received</h1>
        <p className="text-gray-500 text-sm mb-1">Reference ID</p>
        <p className="font-mono text-orange-600 font-semibold text-lg mb-4">{id}</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Your donation has been recorded. A receipt and 80G certificate (if applicable) will be emailed to you within 24 hours.
        </p>
        <div className="bg-amber-50 rounded-xl p-4 mb-6 text-sm text-orange-800">
          🙏 Your seva has been accepted. May the Lord bless you and your family.
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/trusts" className="bg-saffron hover:bg-saffron-dark text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
            Make Another Donation
          </Link>
          <Link href="/" className="border border-gray-200 hover:border-orange-300 text-gray-700 py-2.5 rounded-xl transition-colors text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
