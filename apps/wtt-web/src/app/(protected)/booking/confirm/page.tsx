import Link from 'next/link'

export default function ConfirmPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8 text-center">
        <div className="text-5xl mb-4">🛕</div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Your pilgrimage is booked. A WhatsApp confirmation has been sent to your mobile.
        </p>
        <Link href="/my-bookings" className="block w-full bg-saffron hover:bg-saffron-dark text-white font-semibold py-3 rounded-lg transition text-center">
          View My Bookings
        </Link>
        <Link href="/packages" className="block mt-3 text-sm text-saffron hover:underline">
          Browse more packages
        </Link>
      </div>
    </main>
  )
}
