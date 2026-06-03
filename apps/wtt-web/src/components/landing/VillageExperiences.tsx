import Link from 'next/link'

export default function VillageExperiences() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-900 to-green-800 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">Coming Soon</span>
        <h2 className="font-heading text-4xl font-semibold mt-1 mb-3">Beyond the Temple — Village Experiences 🌿</h2>
        <p className="text-green-200 text-lg mb-10 max-w-2xl mx-auto">
          Stay in temple villages. Meet artisans. Experience living heritage. Sacred tourism done differently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
          {[
            { icon: '🏡', title: 'Temple Village Stay', desc: 'Overnight stay in traditional homes near sacred temples. Home-cooked meals, local rituals.' },
            { icon: '🎨', title: 'Heritage Walk + Crafts', desc: 'Walk with local artisans. Learn about temple art forms — kalamkari, brass casting, stone carving.' },
          ].map((e, i) => (
            <div key={i} className="bg-white/10 rounded-2xl p-5 text-left border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-2xl mb-2">{e.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{e.title}</h3>
              <p className="text-green-200 text-sm">{e.desc}</p>
              <div className="mt-3 text-xs bg-white/20 text-white px-2.5 py-1 rounded-full inline-block">Coming Soon</div>
            </div>
          ))}
        </div>

        <Link href="/plan-trip"
          className="inline-block bg-white text-emerald-800 hover:bg-green-50 font-semibold px-8 py-3 rounded-full transition-colors">
          Join Waitlist →
        </Link>
      </div>
    </section>
  )
}
