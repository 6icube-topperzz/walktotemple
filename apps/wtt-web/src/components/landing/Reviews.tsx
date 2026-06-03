const reviews = [
  {
    name: 'Ramesh Kumar',
    city: 'Hyderabad',
    rating: 5,
    text: 'The Tirupati 3-day package was absolutely divine. VIP darshan, comfortable AC bus, clean hotel — everything was perfect. No stress at all. Will book again for Char Dham!',
    package: 'Tirupati 3 Days',
    avatar: 'RK',
  },
  {
    name: 'Sudha Rani',
    city: 'Secunderabad',
    rating: 5,
    text: 'Took the Yadadri day trip with my family. The special darshan arrangement saved us hours of waiting. The guide was knowledgeable. Highly recommend for families.',
    package: 'Yadadri Day Trip',
    avatar: 'SR',
  },
  {
    name: 'Venkat Reddy',
    city: 'Warangal',
    rating: 5,
    text: 'Srisailam 2-day trip was a blessed experience. Mallikarjuna abhishekam at dawn — something I will remember forever. The accommodation was clean and well-located.',
    package: 'Srisailam 2 Days',
    avatar: 'VR',
  },
]

export default function Reviews() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">What Pilgrims Say 🙏</h2>
          <p className="text-gray-500">Real experiences from verified pilgrims</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.text}"</p>

              {/* Package */}
              <div className="text-xs bg-orange-50 text-saffron-dark px-2.5 py-1 rounded-full inline-block mb-4">
                🛕 {r.package}
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center text-sm font-bold text-saffron-dark">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    {r.city} · <span className="text-green-600">Verified Pilgrim ✅</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
