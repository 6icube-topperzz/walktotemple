'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    bg: 'from-[#1E293B] via-[#1E293B] to-[#2d1a0e]',
    glow: 'bg-saffron/10',
    tag: 'Curated Pilgrimage Packages',
    tagColor: 'bg-saffron/20 text-saffron border border-saffron/30',
    h1: ['Sacred Journeys.', 'Beautifully Organized.'],
    sub: 'From Yadadri day trips to Tirupati 3-day packages. Transport + Darshan + Accommodation — all arranged.',
    cta1: { label: 'Explore Packages →', href: '/pilgrimages' },
    cta2: { label: 'View All Temples', href: '/jyotirlingas' },
    emoji: '🛕',
  },
  {
    id: 2,
    bg: 'from-maroon via-[#6B0000] to-[#3d0000]',
    glow: 'bg-red-500/10',
    tag: 'Telangana & Andhra Pradesh',
    tagColor: 'bg-gold/20 text-gold border border-gold/30',
    h1: ['Yadadri. Srisailam.', 'Bhadrachalam. Tirupati.'],
    sub: '5 curated packages across sacred Telangana and Andhra temples. Starting ₹899.',
    cta1: { label: 'Explore South India Packages →', href: '/region/telangana' },
    cta2: null,
    emoji: '🗺️',
  },
  {
    id: 3,
    bg: 'from-[#7C2D12] via-[#9A3412] to-[#c2500a]',
    glow: 'bg-orange-400/10',
    tag: '12 Jyotirlinga Yatra',
    tagColor: 'bg-white/20 text-white border border-white/30',
    h1: ['Embark on the', 'Sacred Jyotirlinga Journey.'],
    sub: 'Visit all 12 abodes of Lord Shiva. We plan each leg. You focus on the divine.',
    cta1: { label: 'Plan My Jyotirlinga Yatra →', href: '/jyotirlingas' },
    cta2: null,
    emoji: '🔱',
  },
  {
    id: 4,
    bg: 'from-[#1a1035] via-[#2d1b69] to-[#1a1035]',
    glow: 'bg-purple-500/10',
    tag: 'Karthika Masam Special',
    tagColor: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
    h1: ['Make This Karthika', 'Truly Sacred.'],
    sub: 'Special Karthika Masam packages to Srisailam, Kaleshwaram, Yadadri. Book early — limited seats.',
    cta1: { label: 'Book Karthika Package →', href: '/festival/karthika' },
    cta2: null,
    emoji: '🪔',
  },
  {
    id: 5,
    bg: 'from-[#0c2340] via-[#0f3460] to-[#1a4a7a]',
    glow: 'bg-blue-400/10',
    tag: 'Char Dham Yatra 2026',
    tagColor: 'bg-sky-400/20 text-sky-300 border border-sky-400/30',
    h1: ['Kedarnath. Badrinath.', 'Gangotri. Yamunotri.'],
    sub: 'Complete Char Dham yatra organized for you. Helicopters, accommodation, darshan — all included.',
    cta1: { label: 'Explore Char Dham →', href: '/char-dham' },
    cta2: null,
    emoji: '🏔️',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => go((current + 1) % slides.length), [current, go])
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go])

  useEffect(() => {
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Glow overlay */}
      <div className={`absolute inset-0 ${slide.glow}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex items-center min-h-[520px]">
        <div className="flex-1 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Tag */}
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${slide.tagColor}`}>
                {slide.tag}
              </span>

              {/* Heading */}
              <h1 className="font-heading text-5xl md:text-6xl font-semibold text-white leading-tight mb-4">
                {slide.h1[0]}<br />
                <span className="text-saffron">{slide.h1[1]}</span>
              </h1>

              {/* Sub */}
              <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">{slide.sub}</p>

              {/* CTAs */}
              <div className="flex gap-4 flex-wrap">
                <Link href={slide.cta1.href}
                  className="bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3 rounded-full transition-all shadow-lg hover:shadow-saffron/30">
                  {slide.cta1.label}
                </Link>
                {slide.cta2 && (
                  <Link href={slide.cta2.href}
                    className="border-2 border-white/50 hover:border-white text-white px-7 py-3 rounded-full transition-colors font-medium">
                    {slide.cta2.label}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Emoji illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`emoji-${slide.id}`}
              className="text-[160px] opacity-20 select-none"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {slide.emoji}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
        ←
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-saffron' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}
