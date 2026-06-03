const signals = [
  {
    icon: '🛕',
    title: 'Temple-Verified Darshans',
    desc: 'We coordinate directly with temple trusts for confirmed darshan slots. No unexpected queuing.',
  },
  {
    icon: '🚌',
    title: 'Comfortable Transport',
    desc: 'AC sleeper/seater buses for overnight journeys. GPS-tracked. Experienced drivers.',
  },
  {
    icon: '🏨',
    title: 'Quality Accommodation',
    desc: 'Pre-inspected dharamshalas and hotels. Clean, safe, and close to the temples.',
  },
  {
    icon: '📞',
    title: '24/7 Trip Support',
    desc: 'WhatsApp support throughout the journey. Emergency assistance always available.',
  },
]

export default function TrustSignals() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">Why WalkToTemple?</h2>
          <p className="text-gray-500">Everything arranged. Nothing left to chance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((s, i) => (
            <div key={i} className="text-center p-6 bg-cream rounded-2xl hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm group-hover:bg-saffron group-hover:scale-110 transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 bg-hero rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '4.9★', label: 'Average Rating' },
            { num: '5,000+', label: 'Happy Pilgrims' },
            { num: '50+', label: 'Sacred Temples' },
            { num: '5 States', label: 'Across India' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-heading text-2xl font-semibold text-saffron">{stat.num}</div>
              <div className="text-gray-400 text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
