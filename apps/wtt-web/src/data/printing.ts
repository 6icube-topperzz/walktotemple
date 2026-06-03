export interface PrintProduct {
  slug: string
  name: string
  category: string
  price: number
  priceUnit?: string
  emoji: string
  description: string
  customisable: boolean
  customiseNote?: string
  isAvailable: boolean
  isFeatured?: boolean
}

export const printProducts: PrintProduct[] = [
  {
    slug: 'deity-calendar-2027',
    name: 'Personalised Deity Calendar 2027',
    category: 'calendars',
    price: 299,
    emoji: '📅',
    description: 'Upload your family photo, choose your deity — we print a personalised 2027 calendar with your family blessing.',
    customisable: true,
    customiseNote: 'Upload photo + choose deity + add family name',
    isAvailable: true,
    isFeatured: true,
  },
  {
    slug: 'temple-photos-calendar-2027',
    name: 'Temple Photos Calendar 2027',
    category: 'calendars',
    price: 199,
    emoji: '🛕',
    description: 'Pre-designed A3 calendar featuring 12 stunning photographs of India\'s major temples. Ready to print.',
    customisable: false,
    isAvailable: true,
    isFeatured: true,
  },
  {
    slug: 'panchanga-calendar-2027',
    name: 'Panchanga Calendar 2027',
    category: 'panchanga',
    price: 149,
    emoji: '🌙',
    description: 'Complete 2027 panchanga with tithi, nakshatra, festival dates, and auspicious timings. Telugu / Tamil / Kannada / Hindi.',
    customisable: true,
    customiseNote: 'Choose language: Telugu / Tamil / Kannada / Hindi',
    isAvailable: true,
  },
  {
    slug: 'spiritual-diary-2027',
    name: '2027 Spiritual Diary',
    category: 'diaries',
    price: 249,
    emoji: '📓',
    description: 'A5 daily diary with festival dates, daily shlokas, and sacred verse for each month. 365 pages.',
    customisable: false,
    isAvailable: true,
  },
  {
    slug: 'deity-poster-custom',
    name: 'Deity Poster (Custom Size)',
    category: 'posters',
    price: 149,
    priceUnit: 'onwards',
    emoji: '🖼️',
    description: 'Choose your deity, add custom text (family name, gotram, mantra). A4 to A0 sizes available.',
    customisable: true,
    customiseNote: 'Choose deity + size + add text / mantra',
    isAvailable: true,
    isFeatured: true,
  },
  {
    slug: 'gruhapravesham-invitation',
    name: 'Gruhapravesham Invitation',
    category: 'invitations',
    price: 49,
    priceUnit: 'per 50 cards',
    emoji: '📨',
    description: 'Traditional gruhapravesham invitation cards with customisable names, date, venue, and muhurtham.',
    customisable: true,
    customiseNote: 'Customise: names, date, venue, muhurtham time',
    isAvailable: true,
  },
]

export function getPrintByCategory(category: string): PrintProduct[] {
  if (category === 'all') return printProducts
  return printProducts.filter(p => p.category === category)
}

export function getPrintProduct(slug: string): PrintProduct | undefined {
  return printProducts.find(p => p.slug === slug)
}

export function getFeaturedPrints(): PrintProduct[] {
  return printProducts.filter(p => p.isFeatured && p.isAvailable)
}
