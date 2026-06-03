import Link from 'next/link'

export default function LandingCTA() {
  return (
    <section className="py-20 bg-hero text-white text-center">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-4xl mb-4">🛕</div>
        <h2 className="font-heading text-5xl font-semibold mb-3">Your Sacred Journey Awaits</h2>
        <p className="text-gray-300 text-lg mb-8">Book today. Travel blessed.</p>
        <Link
          href="/pilgrimages"
          className="inline-block bg-saffron hover:bg-saffron-dark text-white font-bold text-lg px-10 py-4 rounded-full transition-all shadow-xl hover:shadow-saffron/30"
        >
          Browse All Packages →
        </Link>
        <p className="text-gray-400 text-sm mt-5">
          All packages include transport + accommodation + darshan
        </p>
      </div>
    </section>
  )
}
