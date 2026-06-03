export interface LitProduct {
  slug: string
  name: string
  category: 'books' | 'scriptures' | 'audio' | 'childrens'
  language?: string
  deity?: string
  price: number
  priceUnit?: string
  description: string
  emoji: string
  isAvailable: boolean
}

export const litProducts: LitProduct[] = [
  {
    slug: 'bhagavad-gita-telugu',
    name: 'Bhagavad Gita (Telugu)',
    category: 'scriptures',
    language: 'telugu',
    deity: 'krishna',
    price: 149,
    description: 'Complete Bhagavad Gita with Telugu translation and commentary. Pocket size, hard cover.',
    emoji: '📖',
    isAvailable: true,
  },
  {
    slug: 'ramayana-illustrated-children',
    name: 'Ramayana (Illustrated, Children)',
    category: 'childrens',
    language: 'english',
    deity: 'rama',
    price: 199,
    description: 'Beautifully illustrated Ramayana for children (ages 6–12). Simple language with full-color art.',
    emoji: '📚',
    isAvailable: true,
  },
  {
    slug: 'vishnu-sahasranamam-audio-cd',
    name: 'Vishnu Sahasranamam (Audio CD)',
    category: 'audio',
    deity: 'vishnu',
    price: 99,
    description: 'M.S. Subbulakshmi rendition of Vishnu Sahasranamam. Original recording, high quality audio.',
    emoji: '🎵',
    isAvailable: true,
  },
  {
    slug: 'suprabhatam-mp3-download',
    name: 'Suprabhatam MP3 Download',
    category: 'audio',
    deity: 'vishnu',
    price: 49,
    description: 'Sri Venkateswara Suprabhatam — the divine wake-up hymn of Tirumala. 12 tracks, high quality.',
    emoji: '🎶',
    isAvailable: true,
  },
  {
    slug: 'hanuman-chalisa-booklet',
    name: 'Hanuman Chalisa Booklet',
    category: 'books',
    language: 'hindi',
    deity: 'hanuman',
    price: 29,
    description: 'Hanuman Chalisa with Hindi, Telugu, and English transliteration. Compact pocket size.',
    emoji: '📗',
    isAvailable: true,
  },
  {
    slug: '108-names-ganesha',
    name: '108 Names of Ganesha',
    category: 'books',
    deity: 'ganesha',
    price: 39,
    description: 'Ashtottara Shatanamavali of Ganesha — 108 names with meaning and pronunciation guide.',
    emoji: '📕',
    isAvailable: true,
  },
  {
    slug: 'ashtadasha-puranas-set',
    name: 'Ashtadasha Puranas Set',
    category: 'scriptures',
    language: 'sanskrit',
    price: 1299,
    description: 'Complete set of 18 Puranas in Sanskrit with transliteration. 6 volumes, deluxe edition.',
    emoji: '📜',
    isAvailable: true,
  },
  {
    slug: 'divya-prabandham-tamil-english',
    name: 'Divya Prabandham (Tamil + English)',
    category: 'scriptures',
    language: 'tamil',
    deity: 'vishnu',
    price: 299,
    description: '4000 Divya Prabandham verses of the Alvar saints with Tamil text and English translation.',
    emoji: '📜',
    isAvailable: true,
  },
]

export function getLitByCategory(category: string): LitProduct[] {
  if (category === 'all') return litProducts
  return litProducts.filter(p => p.category === category)
}

export function getLitByLanguage(language: string): LitProduct[] {
  return litProducts.filter(p => p.language === language)
}

export function getLitByDeity(deity: string): LitProduct[] {
  return litProducts.filter(p => p.deity === deity)
}

export function getLitProduct(slug: string): LitProduct | undefined {
  return litProducts.find(p => p.slug === slug)
}
