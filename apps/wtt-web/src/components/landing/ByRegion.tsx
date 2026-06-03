import Link from 'next/link'

const regions = [
  {
    name: 'Telangana', icon: '🔱', href: '/region/telangana',
    temples: 'Yadadri, Srisailam, Bhadrachalam, Kaleshwaram, Warangal',
    packages: 12, startingPrice: 699, available: true,
  },
  {
    name: 'Andhra Pradesh', icon: '🪷', href: '/region/andhra-pradesh',
    temples: 'Tirupati, Kanipakam, Srikalahasti, Vijayawada, Annavaram, Ahobilam',
    packages: 18, startingPrice: 899, available: true,
  },
  {
    name: 'Tamil Nadu', icon: '🎺', href: '/region/tamil-nadu',
    temples: 'Madurai Meenakshi, Rameswaram, Kanchipuram, Tiruvannamalai',
    packages: 0, startingPrice: 0, available: false, comingSoon: true,
  },
  {
    name: 'Karnataka', icon: '🐘', href: '/region/karnataka',
    temples: 'Dharmasthala, Kukke Subramanya, Udupi Krishna, Kollur Mookambika',
    packages: 0, startingPrice: 0, available: false, comingSoon: true,
  },
  {
    name: 'Uttarakhand', icon: '🏔️', href: '/region/uttarakhand',
    temples: 'Char Dham Yatra, Haridwar, Rishikesh, Kedarnath',
    packages: 3, startingPrice: 8999, available: true,
  },
  {
    name: 'Uttar Pradesh', icon: '🙏', href: '/region/uttar-pradesh',
    temples: 'Varanasi, Ayodhya, Mathura, Vrindavan, Prayagraj',
    packages: 0, startingPrice: 0, available: false, comingSoon: true,
  },
]

export default function ByRegion() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">Explore Sacred India by Region</h2>
          <p className="text-gray-500">Every state has temples blessed by millions of devotees</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Map (decorative) */}
          <div className="lg:w-[35%] flex flex-col items-center justify-center bg-orange-50 rounded-2xl p-8 text-center min-h-[300px]">
            <div className="text-8xl mb-4">🗺️</div>
            <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">Sacred India</h3>
            <p className="text-sm text-gray-500 mb-4">
              Currently operating in South India with pan-India packages expanding
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Telangana ✅', 'AP ✅', 'Tamil Nadu 🔜', 'Karnataka 🔜'].map(t => (
                <span key={t} className="text-xs bg-white px-2.5 py-1 rounded-full border border-orange-200 text-gray-600">{t}</span>
              ))}
            </div>
          </div>

          {/* Region cards */}
          <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {regions.map(r => (
              <div key={r.name} className={`rounded-2xl border p-5 transition-all ${r.available ? 'hover:shadow-md hover:border-saffron/50 cursor-pointer' : 'opacity-70'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{r.icon}</span>
                    <h3 className="font-semibold text-gray-900">{r.name}</h3>
                  </div>
                  {r.comingSoon ? (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Coming Soon</span>
                  ) : (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ Available</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{r.temples}</p>
                <div className="flex items-center justify-between">
                  {r.available ? (
                    <>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{r.packages} packages</span> · From <span className="text-saffron font-semibold">₹{r.startingPrice.toLocaleString()}</span>
                      </div>
                      <Link href={r.href} className="text-xs text-saffron hover:text-saffron-dark font-semibold">
                        Explore →
                      </Link>
                    </>
                  ) : (
                    <Link href="/plan-trip" className="text-xs text-saffron hover:underline">
                      Join waitlist →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
