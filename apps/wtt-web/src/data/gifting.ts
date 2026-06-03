export interface GiftProduct {
  slug: string
  name: string
  category: string
  occasion: string
  price: number
  emoji: string
  description: string
  contents: string[]
  isAvailable: boolean
  isFeatured?: boolean
}

export const giftProducts: GiftProduct[] = [
  {
    slug: 'gruhapravesham-hamper',
    name: 'Gruhapravesham Hamper',
    category: 'gruhapravesham',
    occasion: 'Gruhapravesham',
    price: 999,
    emoji: '🏠',
    description: 'Complete housewarming blessing kit — everything needed for the griha pravesham ceremony.',
    contents: ['Brass Kalash Set', 'Ganesh Idol (4 inch)', 'Puja Samagri Kit', 'Agarbatti Bundle', 'Camphor + Kumkum Set'],
    isAvailable: true,
    isFeatured: true,
  },
  {
    slug: 'wedding-blessing-box',
    name: 'Wedding Blessing Box',
    category: 'wedding',
    occasion: 'Wedding',
    price: 1499,
    emoji: '💍',
    description: 'Sacred wedding gift — bless the new couple with divine grace.',
    contents: ['Lakshmi-Ganesha Idol (6 inch, brass)', 'Complete Puja Kit', 'Flower Mala', 'Sweets Box', 'Sacred Thread Set'],
    isAvailable: true,
    isFeatured: true,
  },
  {
    slug: 'new-baby-arrival-kit',
    name: 'New Baby Arrival Kit',
    category: 'new-baby',
    occasion: 'New Baby',
    price: 799,
    emoji: '👶',
    description: 'Welcome a new soul with sacred blessings. Everything for the naming ceremony.',
    contents: ['Silver Anklets', 'Children\'s Prayer Book', 'Namakarana (Naming Ceremony) Guide', 'Kumkum + Haldi Set', 'Prasadam Box'],
    isAvailable: true,
  },
  {
    slug: 'diwali-spiritual-hamper',
    name: 'Diwali Spiritual Hamper',
    category: 'festival',
    occasion: 'Diwali',
    price: 599,
    emoji: '🪔',
    description: 'Light up Diwali with divine grace — a complete festive spiritual gift.',
    contents: ['Brass Diya Set (5 pieces)', 'Agarbatti Bundle', 'Lakshmi Idol (4 inch)', 'Kumkum + Haldi Set', 'Premium Sweets Box'],
    isAvailable: true,
    isFeatured: true,
  },
  {
    slug: 'prasadam-box-curated',
    name: 'Prasadam Box (Curated)',
    category: 'prasadam',
    occasion: 'All occasions',
    price: 399,
    emoji: '🙏',
    description: 'Send blessings from sacred temples — curated prasadam from major temples.',
    contents: ['Tirumala Laddoo (4 pcs)', 'Vibhuti (sacred ash)', 'Kumkum', 'Tulasi Mala', 'Temple Blessing Card'],
    isAvailable: true,
  },
  {
    slug: 'temple-souvenir-set',
    name: 'Temple Souvenir Set',
    category: 'souvenir',
    occasion: 'Temple Visit',
    price: 299,
    emoji: '🛕',
    description: 'Take the divine home — a curated souvenir from your temple journey.',
    contents: ['Temple Photo Frame (A5)', 'Prasadam', 'Tulasi / Rudraksha Mala', 'Sacred Ash', 'Pilgrimage Certificate'],
    isAvailable: true,
  },
]

export function getGiftByCategory(category: string): GiftProduct[] {
  if (category === 'all') return giftProducts
  return giftProducts.filter(g => g.category === category)
}

export function getGiftProduct(slug: string): GiftProduct | undefined {
  return giftProducts.find(g => g.slug === slug)
}

export function getFeaturedGifts(): GiftProduct[] {
  return giftProducts.filter(g => g.isFeatured && g.isAvailable)
}
