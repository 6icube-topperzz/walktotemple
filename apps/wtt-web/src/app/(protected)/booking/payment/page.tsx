'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { api } from '@/lib/api'

function PaymentContent() {
  const params = useSearchParams()
  const router = useRouter()
  const bookingId = params.get('bookingId') || ''
  const amount = params.get('amount') || '0'

  async function handlePay() {
    const token = localStorage.getItem('wtt_token')
    if (!token) return

    // Razorpay integration placeholder
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      amount: Math.round(parseFloat(amount) * 100),
      currency: 'INR',
      name: 'WalkToTemple',
      description: 'Pilgrimage booking',
      handler: async (response: any) => {
        await api.post('/bookings/confirm', {
          bookingId,
          razorpayPaymentId: response.razorpay_payment_id,
        }, token)
        router.push(`/booking/confirm?bookingId=${bookingId}`)
      },
    }

    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } else {
      // Test mode: skip Razorpay
      await api.post('/bookings/confirm', { bookingId, razorpayPaymentId: 'test_' + Date.now() }, token)
      router.push(`/booking/confirm?bookingId=${bookingId}`)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8 text-center">
        <div className="text-4xl mb-4">💳</div>
        <h1 className="text-2xl font-bold mb-2">Complete Payment</h1>
        <p className="text-gray-500 text-sm mb-6">Amount: <span className="text-saffron font-bold text-lg">₹{parseFloat(amount).toFixed(2)}</span></p>
        <button
          onClick={handlePay}
          className="w-full bg-saffron hover:bg-saffron-dark text-white font-semibold py-3 rounded-lg transition"
        >
          Pay Now
        </button>
        <p className="text-xs text-gray-400 mt-3">Secured by Razorpay</p>
      </div>
    </main>
  )
}

export default function PaymentPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}><PaymentContent /></Suspense>
}
