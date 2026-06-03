const steps = [
  {
    step: '1️⃣',
    title: 'Choose Your Package',
    desc: 'Browse by deity, region, or duration. Filter by budget and group size. Find your perfect pilgrimage.',
    detail: 'Day trips, weekend journeys, extended yatras, family packages — we have it all.',
  },
  {
    step: '2️⃣',
    title: 'We Arrange Everything',
    desc: 'AC transport, accommodation, darshan tickets, local guide, and meals — all arranged for you.',
    detail: 'No coordination stress. No queue nightmares. No last-minute surprises.',
  },
  {
    step: '3️⃣',
    title: 'Focus on the Divine',
    desc: 'You pray. We handle the rest. WhatsApp updates at every step of the journey.',
    detail: '24/7 trip support. Emergency assistance always available.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-semibold text-gray-900 mb-2">How WalkToTemple Works</h2>
          <p className="text-gray-500">Three simple steps to your sacred journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-saffron group-hover:scale-110 transition-all duration-300">
                {s.step}
              </div>
              {/* Connector */}
              {i < 2 && (
                <div className="hidden md:block absolute mt-[-32px] ml-[180px] text-gray-200 text-2xl">→</div>
              )}
              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">{s.desc}</p>
              <p className="text-xs text-gray-400 italic">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
