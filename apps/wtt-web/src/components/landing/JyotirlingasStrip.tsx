'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const jyotirlingas = [
  { name: 'Somnath', state: 'Gujarat', available: false },
  { name: 'Mallikarjuna (Srisailam)', state: 'Andhra Pradesh', available: true },
  { name: 'Mahakaleshwar', state: 'Madhya Pradesh', available: false },
  { name: 'Omkareshwar', state: 'Madhya Pradesh', available: false },
  { name: 'Kedarnath', state: 'Uttarakhand', available: true },
  { name: 'Bhimashankar', state: 'Maharashtra', available: false },
  { name: 'Vishwanath (Kashi)', state: 'Uttar Pradesh', available: false },
  { name: 'Trimbakeshwar', state: 'Maharashtra', available: false },
  { name: 'Vaidyanath', state: 'Jharkhand', available: false },
  { name: 'Nageshwar', state: 'Gujarat', available: false },
  { name: 'Rameshwaram', state: 'Tamil Nadu', available: false },
  { name: 'Grishneshwar', state: 'Maharashtra', available: false },
]

export default function JyotirlingasStrip() {
  return (
    <section className="bg-[#1a0008] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-xs font-bold tracking-widest text-maroon/60 uppercase">12 Sacred Abodes of Lord Shiva</span>
        <h2 className="font-heading text-4xl font-semibold text-white mt-1 mb-2">12 Jyotirlingas — The Journey of a Lifetime</h2>
        <p className="text-gray-400">Visit all 12 abodes of Lord Shiva. We plan every leg.</p>
      </div>

      {/* Infinite scroll strip */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-4 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...jyotirlingas, ...jyotirlingas].map((j, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center rounded-2xl px-6 py-4 min-w-[180px] border ${
                j.available
                  ? 'bg-maroon/40 border-maroon/60 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              <span className="text-xl mb-1">{j.available ? '🔱' : '🔲'}</span>
              <span className={`text-sm font-semibold text-center leading-tight ${j.available ? 'text-white' : 'text-gray-400'}`}>
                {j.name}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">{j.state}</span>
              {j.available && (
                <span className="mt-1.5 text-xs bg-saffron text-white px-2 py-0.5 rounded-full font-medium">Available ✓</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress + CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-10 text-center">
        <div className="inline-flex items-center gap-4 bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
          <div className="flex gap-2">
            {jyotirlingas.map((j, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${j.available ? 'bg-saffron' : 'bg-white/20'}`}
                title={j.name}
              />
            ))}
          </div>
          <p className="text-sm text-gray-300">
            <span className="text-saffron font-bold">2 of 12</span> Jyotirlingas covered
          </p>
        </div>
        <div className="mt-6">
          <Link href="/jyotirlingas"
            className="inline-block bg-maroon hover:bg-maroon-light text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Start My Jyotirlinga Yatra →
          </Link>
        </div>
      </div>
    </section>
  )
}
