'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function PrintingOrderPage() {
  const params = useParams()
  const slug = params?.slug as string ?? ''
  const productName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const [step, setStep] = useState<'details' | 'upload' | 'confirm'>('details')
  const [qty, setQty] = useState(50)
  const [file, setFile] = useState<string | null>(null)

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-semibold text-gray-900 mb-1">Order: {productName}</h1>
      <p className="text-sm text-gray-500 mb-6">Custom spiritual printing — delivered to your door</p>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {(['details', 'upload', 'confirm'] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === s ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}>{i + 1}</div>
            <span className={`text-sm ${step === s ? 'text-orange-600 font-medium' : 'text-gray-400'}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
            {i < 2 && <span className="text-gray-200 mx-1">—</span>}
          </div>
        ))}
      </div>

      {step === 'details' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity</label>
            <div className="flex gap-2 flex-wrap">
              {[25, 50, 100, 250, 500].map(q => (
                <button key={q} onClick={() => setQty(q)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    qty === q ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 text-gray-700 hover:border-orange-300'
                  }`}>
                  {q} pcs
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Paper / Material</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400">
              <option>Art paper (130 GSM) — standard</option>
              <option>Gloss coated (170 GSM) — premium</option>
              <option>Matt finish (150 GSM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery address</label>
            <textarea rows={3} placeholder="Full delivery address with PIN code"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 resize-none" />
          </div>
          <button onClick={() => setStep('upload')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
            Next: Upload Design →
          </button>
        </div>
      )}

      {step === 'upload' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload your design file</label>
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-orange-300 transition-colors"
              onClick={() => setFile('sample-design.pdf')}
            >
              {file ? (
                <p className="text-sm text-green-600 font-medium">✓ {file} uploaded</p>
              ) : (
                <>
                  <p className="text-2xl mb-2">📄</p>
                  <p className="text-sm text-gray-500">Click to select PDF, AI, PSD or PNG (min 300 DPI)</p>
                  <p className="text-xs text-gray-400 mt-1">Max 50 MB</p>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400">Don&apos;t have a design? <Link href="/printing" className="text-orange-500 hover:underline">Browse our templates</Link></p>
          <div className="flex gap-3">
            <button onClick={() => setStep('details')}
              className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm">
              Back
            </button>
            <button onClick={() => setStep('confirm')} disabled={!file}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
              Review Order →
            </button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold text-gray-900">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between"><span>Product</span><span className="font-medium text-gray-900">{productName}</span></div>
            <div className="flex justify-between"><span>Quantity</span><span className="font-medium text-gray-900">{qty} pcs</span></div>
            <div className="flex justify-between"><span>Design file</span><span className="font-medium text-green-600">✓ Uploaded</span></div>
            <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
              <span className="font-semibold text-gray-900">Estimated total</span>
              <span className="font-bold text-orange-500">₹{(qty * 8).toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Final price confirmed after design review. Delivery 5–7 working days.</p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
            Place Order & Pay
          </button>
          <button onClick={() => setStep('upload')}
            className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm">
            Edit Order
          </button>
        </div>
      )}
    </main>
  )
}
