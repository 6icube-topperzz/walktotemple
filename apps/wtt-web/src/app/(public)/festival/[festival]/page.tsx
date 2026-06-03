const festivalNames: Record<string, string> = {
  karthika: '🪔 Karthika Masam Packages',
  shivaratri: '🔱 Maha Shivaratri Packages',
  vaikunta: '🪷 Vaikunta Ekadashi Packages',
  brahmotsavam: '🪷 Brahmotsavam Packages',
  navratri: '🌺 Navratri Packages',
  diwali: '✨ Diwali Special Packages',
}

export default async function FestivalPage({ params }: { params: Promise<{ festival: string }> }) {
  const { festival } = await params
  const title = festivalNames[festival] || `${festival} Packages`

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <div className="text-5xl mb-4">{title.split(' ')[0]}</div>
      <h1 className="font-heading text-4xl font-semibold text-gray-900 mb-3">{title}</h1>
      <p className="text-gray-500 mb-6 max-w-xl mx-auto">
        Festival pilgrimage packages are being curated. Register your interest and we will notify you when bookings open.
      </p>
      <a href="/plan-trip" className="inline-block bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3 rounded-full transition-colors">
        Notify Me When Available →
      </a>
    </div>
  )
}
