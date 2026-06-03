export interface PoojaProduct {
  slug: string
  name: string
  category: string
  deity?: string
  price: number
  priceUnit?: string
  description: string
  emoji: string
  isAvailable: boolean
}

export const poojaProducts: PoojaProduct[] = [
  {
    slug: 'puja-samagri-kit',
    name: 'Puja Samagri Complete Kit',
    category: 'puja-kits',
    price: 299,
    description: 'Everything needed for daily puja — kumkum, haldi, vibhuti, flowers, incense, camphor, and more.',
    emoji: '🪔',
    isAvailable: true,
  },
  {
    slug: 'brass-diya-set',
    name: 'Brass Diya Set (5 pieces)',
    category: 'diyas',
    price: 199,
    description: 'Hand-crafted brass diyas, perfect for daily aarti and festival decoration.',
    emoji: '🕯️',
    isAvailable: true,
  },
  {
    slug: 'agarbatti-bundle',
    name: 'Agarbatti Bundle (Sandal + Rose + Jasmine)',
    category: 'agarbatti',
    price: 149,
    description: '3 premium fragrance packs — sandalwood, rose, and jasmine. 120 sticks each.',
    emoji: '🌿',
    isAvailable: true,
  },
  {
    slug: 'ganesha-brass-idol',
    name: 'Ganesha Brass Idol (6 inch)',
    category: 'idols',
    deity: 'ganesha',
    price: 599,
    description: 'Hand-crafted brass Ganesha idol, 6 inch. Ideal for home puja room or gifting.',
    emoji: '🐘',
    isAvailable: true,
  },
  {
    slug: 'shiva-lingam-marble',
    name: 'Shiva Lingam (marble, 4 inch)',
    category: 'idols',
    deity: 'shiva',
    price: 449,
    description: 'White marble Shiva Lingam, 4 inch, polished finish. Sacred for daily abhishekam.',
    emoji: '🔱',
    isAvailable: true,
  },
  {
    slug: 'kalash-set-brass',
    name: 'Kalash Set (brass, complete)',
    category: 'puja-kits',
    price: 349,
    description: 'Complete brass kalash set with coconut holder, mango leaves and kalava. For griha pravesham and all major rituals.',
    emoji: '🏺',
    isAvailable: true,
  },
  {
    slug: 'kumkum-haldi-vibhuti-set',
    name: 'Kumkum + Haldi + Vibhuti Set',
    category: 'samagri',
    price: 99,
    description: 'Pure kumkum (sindhoor), turmeric powder (haldi), and sacred ash (vibhuti) in ornamental containers.',
    emoji: '🌸',
    isAvailable: true,
  },
  {
    slug: 'sacred-thread-yagnopaveetham',
    name: 'Sacred Thread (Yagnopaveetham)',
    category: 'threads',
    price: 49,
    description: 'Traditional yagnopaveetham (janeu / sacred thread) — pack of 6. Used in Upanayanam and daily rituals.',
    emoji: '🧵',
    isAvailable: true,
  },
  {
    slug: 'camphor-kapoor-100g',
    name: 'Camphor (Kapoor) 100g',
    category: 'samagri',
    price: 79,
    description: 'Premium puja camphor, 100g. Fast-burning, no residue. Essential for aarti.',
    emoji: '✨',
    isAvailable: true,
  },
  {
    slug: 'puja-thali-brass',
    name: 'Puja Thali (brass, complete)',
    category: 'puja-kits',
    price: 499,
    description: 'Complete brass puja thali set with diya, bell, incense holder, kumkum bowl, and aarti plate.',
    emoji: '🪔',
    isAvailable: true,
  },
  {
    slug: 'tulasi-mala',
    name: 'Tulasi Mala',
    category: 'threads',
    deity: 'vishnu',
    price: 99,
    description: 'Authentic tulasi wood prayer mala, 108 beads. For Vishnu devotees and daily japa.',
    emoji: '🌿',
    isAvailable: true,
  },
  {
    slug: 'rudraksha-mala',
    name: 'Rudraksha Mala',
    category: 'threads',
    deity: 'shiva',
    price: 299,
    description: 'Certified 5-mukhi rudraksha mala, 108 beads. Sacred for Shiva devotees and meditation.',
    emoji: '🔱',
    isAvailable: true,
  },
]

export function getPoojaByCategory(category: string): PoojaProduct[] {
  if (category === 'all') return poojaProducts
  return poojaProducts.filter(p => p.category === category)
}

export function getPoojaByDeity(deity: string): PoojaProduct[] {
  return poojaProducts.filter(p => p.deity === deity)
}

export function getPoojaProduct(slug: string): PoojaProduct | undefined {
  return poojaProducts.find(p => p.slug === slug)
}
