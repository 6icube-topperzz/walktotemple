export interface Package {
  slug: string
  nameEn: string
  nameTe?: string
  region: string
  state: string
  deity: string
  deityIcon: string
  durationDays: number
  durationNights: number
  pricePerPerson: number
  priceChild?: number
  description: string
  templesCovered: string[]
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  coverImage: string
  rating: number
  reviewCount: number
  totalBookings: number
  isFeatured: boolean
  isActive: boolean
  tag?: string
}

export interface DepartureDate {
  id: string
  packageSlug: string
  date: string
  returnDate: string
  totalSeats: number
  bookedSeats: number
  price?: number
}

export interface PickupPoint {
  id: string
  packageSlug: string
  city: string
  location: string
  time: string
}

export const packages: Package[] = [
  {
    slug: 'yadadri-day-trip',
    nameEn: 'Yadadri Day Trip',
    nameTe: 'యాదాద్రి దినయాత్ర',
    region: 'Nalgonda',
    state: 'Telangana',
    deity: 'Vishnu',
    deityIcon: '🪷',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 899,
    priceChild: 499,
    description: 'Seek blessings of Sri Lakshmi Narasimha Swamy at the sacred Yadadri — one of the most powerful Vaishnavite shrines in South India, recently renovated in a grand new avatar.',
    templesCovered: ['Yadadri Lakshmi Narasimha Swamy Temple'],
    highlights: [
      'Special darshan arrangement — no waiting in long queues',
      'AC bus from Hyderabad with comfortable seating',
      'Breakfast + lunch at the temple town included',
      'Temple guide who explains the significance of each shrine',
      'Return by evening — one full day',
    ],
    inclusions: ['AC Bus (Hyderabad → Yadadri → Hyderabad)', 'Breakfast', 'Lunch', 'Special darshan pass', 'Temple guide'],
    exclusions: ['Personal expenses', 'Prasadam', 'Photography charges'],
    coverImage: '/images/yadadri.jpg',
    rating: 4.9,
    reviewCount: 312,
    totalBookings: 1840,
    isFeatured: true,
    isActive: true,
    tag: 'Most Popular',
  },
  {
    slug: 'srisailam-2day',
    nameEn: 'Srisailam 2 Days',
    nameTe: 'శ్రీశైలం 2 రోజులు',
    region: 'Nandyal',
    state: 'Andhra Pradesh',
    deity: 'Shiva + Devi',
    deityIcon: '🔱',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 2499,
    priceChild: 1299,
    description: 'Visit Srisailam — home to the Mallikarjuna Jyotirlinga (one of 12 in India) and Bhramaramba Devi (one of 18 Maha Shakti Peethas). A rare confluence of Shaiva and Shakta pilgrimage.',
    templesCovered: ['Mallikarjuna Jyotirlinga', 'Bhramaramba Devi Temple', 'Shikharam viewpoint', 'Sikhareswara Temple'],
    highlights: [
      '2 sacred temples in one package — Jyotirlinga + Shakti Peetha',
      'Overnight stay at comfortable guest house near the temple',
      'Early morning abhishekam darshan',
      'Scenic Krishna river valley views',
      'Guided tour of cave temples',
    ],
    inclusions: ['AC Bus', 'Accommodation (1 night)', 'Dinner + Breakfast + Lunch', 'Darshan arrangements', 'Guide'],
    exclusions: ['Personal expenses', 'Abhishekam charges'],
    coverImage: '/images/srisailam.jpg',
    rating: 4.8,
    reviewCount: 428,
    totalBookings: 2210,
    isFeatured: true,
    isActive: true,
    tag: 'Jyotirlinga',
  },
  {
    slug: 'bhadrachalam-2day',
    nameEn: 'Bhadrachalam 2 Days',
    nameTe: 'భద్రాచలం 2 రోజులు',
    region: 'Bhadradri',
    state: 'Telangana',
    deity: 'Rama',
    deityIcon: '🏹',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 2199,
    priceChild: 1099,
    description: 'Seek blessings of Sri Sita Ramachandra Swamy on the banks of the Godavari river. Bhadrachalam is considered the "Dakshin Ayodhya" — the most sacred Rama temple in South India.',
    templesCovered: ['Sri Sita Ramachandra Swamy Temple', 'Parnasala (where Sita was abducted)', 'Ramappa Lake viewpoint'],
    highlights: [
      '"Dakshin Ayodhya" — most sacred Rama temple in South India',
      'Godavari river aarti — breathtaking experience',
      'Parnasala visit — mythological significance',
      'Overnight stay with temple view',
      'Special sevas arranged',
    ],
    inclusions: ['AC Bus', 'Accommodation', 'Meals (3)', 'Guide', 'Special darshan'],
    exclusions: ['Sevas', 'Boat ride (optional ₹150)'],
    coverImage: '/images/bhadrachalam.jpg',
    rating: 4.7,
    reviewCount: 256,
    totalBookings: 1320,
    isFeatured: true,
    isActive: true,
  },
  {
    slug: 'kaleshwaram-1day',
    nameEn: 'Kaleshwaram Day Trip',
    nameTe: 'కాళేశ్వరం దినయాత్ర',
    region: 'Jayashankar Bhupalpally',
    state: 'Telangana',
    deity: 'Shiva',
    deityIcon: '🔱',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 999,
    priceChild: 549,
    description: 'Visit the sacred Triveni Sangamam — where three rivers (Pranhita, Godavari, Saraswati) meet. One of the most powerful Shiva shrines in Telangana, set in dense forest.',
    templesCovered: ['Kaleshwara Muktheshwara Swamy Temple', 'Triveni Sangamam'],
    highlights: [
      'Sacred Triveni Sangamam — confluence of 3 rivers',
      'Underground cave temple — unique experience',
      'Dense forest setting — peaceful and serene',
      'Special early-morning darshan',
    ],
    inclusions: ['AC Bus', 'Breakfast', 'Lunch', 'Darshan arrangement'],
    exclusions: ['Boat ride', 'Personal expenses'],
    coverImage: '/images/kaleshwaram.jpg',
    rating: 4.8,
    reviewCount: 189,
    totalBookings: 987,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'warangal-temples-1day',
    nameEn: 'Warangal Temples 1 Day',
    nameTe: 'వరంగల్ దేవాలయాలు',
    region: 'Warangal',
    state: 'Telangana',
    deity: 'Shiva + Devi',
    deityIcon: '🛕',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 799,
    priceChild: 399,
    description: 'Explore Warangal\'s magnificent temple heritage — Thousand Pillar Temple, Bhadrakali Lake Temple, and UNESCO-listed Ramappa Temple. History, art, and spirituality combined.',
    templesCovered: ['Thousand Pillar Temple', 'Bhadrakali Temple', 'Ramappa Temple (UNESCO)', 'Warangal Fort'],
    highlights: [
      'UNESCO World Heritage Ramappa Temple',
      'Floating stones of Warangal Fort',
      'Bhadrakali Lake — divine setting',
      'Kakatiya dynasty temple architecture',
    ],
    inclusions: ['AC Bus', 'Breakfast', 'Lunch', 'Heritage guide', 'Entry tickets'],
    exclusions: ['Personal shopping', 'Extra photo charges'],
    coverImage: '/images/warangal.jpg',
    rating: 4.7,
    reviewCount: 143,
    totalBookings: 760,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'tirupati-3day',
    nameEn: 'Tirupati 3 Days',
    nameTe: 'తిరుపతి 3 రోజులు',
    region: 'Tirupati',
    state: 'Andhra Pradesh',
    deity: 'Vishnu',
    deityIcon: '🪷',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 4999,
    priceChild: 2499,
    description: 'The ultimate Tirupati pilgrimage — Tirumala Venkateswara, Kanipakam Vinayaka, and Srikalahasti Shiva. Three of the most sacred temples in South India in one comprehensive package.',
    templesCovered: ['Tirumala Venkateswara Swamy Temple', 'Kanipakam Vinayaka Temple', 'Srikalahasti Shiva Temple', 'Padmavathi Devi Temple, Tiruchanur'],
    highlights: [
      'VIP special entry darshan — Tirumala (no long queues)',
      '3 sacred temples across 3 days',
      'Quality accommodation near Tirupati',
      'Kanipakam — one of India\'s richest temples',
      'Srikalahasti — Vayu Lingam, unique among Panchabhutas',
      'Laddu prasadam arranged',
    ],
    inclusions: ['AC Bus', 'Accommodation (2 nights)', 'All meals (6)', 'VIP darshan tickets', 'Guide', 'Tirumala queue bypass'],
    exclusions: ['Air/train tickets to Tirupati', 'Sevas', 'Personal offerings'],
    coverImage: '/images/tirupati.jpg',
    rating: 4.9,
    reviewCount: 634,
    totalBookings: 4210,
    isFeatured: true,
    isActive: true,
    tag: 'Best Seller',
  },
  {
    slug: 'vijayawada-2day',
    nameEn: 'Vijayawada 2 Days',
    nameTe: 'విజయవాడ 2 రోజులు',
    region: 'Vijayawada',
    state: 'Andhra Pradesh',
    deity: 'Devi + Shiva',
    deityIcon: '🌺',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 2799,
    priceChild: 1399,
    description: 'Seek blessings of Sri Kanaka Durga on the Indrakeeladri hill along the Krishna river, and Sri Amaralingeswara on the Shivala hill — two powerhouses of South Indian pilgrimage.',
    templesCovered: ['Kanaka Durga Temple, Indrakeeladri', 'Amaralingeswara Temple', 'Undavalli Caves', 'Mangalagiri Narasimha Temple'],
    highlights: [
      'Kanaka Durga — one of 18 Maha Shakti Peethas',
      'Krishna river ghat aarti — spectacular',
      'Cable car to Kanaka Durga (optional)',
      'Undavalli rock-cut caves (archaeological)',
    ],
    inclusions: ['AC Bus', 'Hotel accommodation', 'Meals (4)', 'Darshan arrangement', 'Guide'],
    exclusions: ['Cable car charges', 'Personal expenses'],
    coverImage: '/images/vijayawada.jpg',
    rating: 4.8,
    reviewCount: 298,
    totalBookings: 1560,
    isFeatured: true,
    isActive: true,
  },
  {
    slug: 'ahobilam-2day',
    nameEn: 'Ahobilam 2 Days',
    nameTe: 'అహోబిలం 2 రోజులు',
    region: 'Nandyal',
    state: 'Andhra Pradesh',
    deity: 'Vishnu',
    deityIcon: '🪷',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 3199,
    priceChild: 1599,
    description: 'Visit all 9 forms of Lord Narasimha Swamy at Ahobilam — a rare pilgrimage through dense forest and rocky terrain. Considered one of the most powerful Vaishnavite shrines in India.',
    templesCovered: ['9 Narasimha temples of Ahobilam', 'Lower Ahobilam', 'Upper Ahobilam (trek)'],
    highlights: [
      'Darshan of all 9 Narasimha forms — rare achievement',
      'Forest trek to upper Ahobilam',
      'Ancient rock temples in natural setting',
      'Powerful spiritual atmosphere',
    ],
    inclusions: ['AC Bus', 'Accommodation', 'Meals', 'Forest trek guide', 'Darshan arrangement'],
    exclusions: ['Trekking equipment', 'Personal expenses'],
    coverImage: '/images/ahobilam.jpg',
    rating: 4.7,
    reviewCount: 167,
    totalBookings: 890,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'annavaram-1day',
    nameEn: 'Annavaram Day Trip',
    nameTe: 'అన్నవరం దినయాత్ర',
    region: 'East Godavari',
    state: 'Andhra Pradesh',
    deity: 'Vishnu',
    deityIcon: '🪷',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 1199,
    priceChild: 599,
    description: 'Visit Sri Veera Venkata Satyanarayana Swamy Temple at Annavaram — situated on Ratnagiri hill on the banks of Pampa river. One of the most revered Satyanarayana temples in Andhra.',
    templesCovered: ['Annavaram Satyanarayana Temple', 'Pampa river ghats'],
    highlights: [
      'Hilltop temple with panoramic Godavari valley views',
      'Pampa river sacred bath',
      'Famous for Satyanarayana Vrata significance',
      'Peaceful riverside temple complex',
    ],
    inclusions: ['AC Bus', 'Breakfast', 'Lunch', 'Darshan pass', 'Guide'],
    exclusions: ['Personal sevas', 'Offerings'],
    coverImage: '/images/annavaram.jpg',
    rating: 4.6,
    reviewCount: 112,
    totalBookings: 670,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'basara-1day',
    nameEn: 'Basara Day Trip',
    nameTe: 'బాసర దినయాత్ర',
    region: 'Nirmal',
    state: 'Telangana',
    deity: 'Devi',
    deityIcon: '🌺',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 899,
    priceChild: 449,
    description: 'Visit Sri Gnana Saraswati Temple at Basara on the Godavari banks — one of the two Saraswati temples in India. The most auspicious place for Vidyarambham (starting education).',
    templesCovered: ['Gnana Saraswati Temple, Basara', 'Dattatreya Temple', 'Godavari river ghats'],
    highlights: [
      'One of only 2 Saraswati temples in India',
      'Auspicious for children starting education',
      'Godavari river sacred bath',
      'Dattatreya temple visit',
    ],
    inclusions: ['AC Bus', 'Breakfast', 'Lunch', 'Darshan arrangement'],
    exclusions: ['Aksharabhyasam ceremony costs', 'Personal expenses'],
    coverImage: '/images/basara.jpg',
    rating: 4.7,
    reviewCount: 198,
    totalBookings: 1120,
    isFeatured: false,
    isActive: true,
  },
]

export const upcomingDepartures: DepartureDate[] = [
  { id: 'd1', packageSlug: 'yadadri-day-trip', date: '2026-06-15', returnDate: '2026-06-15', totalSeats: 20, bookedSeats: 18 },
  { id: 'd2', packageSlug: 'tirupati-3day', date: '2026-06-20', returnDate: '2026-06-22', totalSeats: 20, bookedSeats: 12 },
  { id: 'd3', packageSlug: 'srisailam-2day', date: '2026-06-22', returnDate: '2026-06-23', totalSeats: 25, bookedSeats: 10 },
  { id: 'd4', packageSlug: 'bhadrachalam-2day', date: '2026-06-28', returnDate: '2026-06-29', totalSeats: 20, bookedSeats: 7 },
  { id: 'd5', packageSlug: 'vijayawada-2day', date: '2026-07-04', returnDate: '2026-07-05', totalSeats: 22, bookedSeats: 5 },
]

export const pickupPoints: PickupPoint[] = [
  { id: 'p1', packageSlug: 'yadadri-day-trip', city: 'Hyderabad', location: 'Miyapur Metro Station', time: '05:30 AM' },
  { id: 'p2', packageSlug: 'yadadri-day-trip', city: 'Hyderabad', location: 'MGBS Bus Stand', time: '06:00 AM' },
  { id: 'p3', packageSlug: 'yadadri-day-trip', city: 'Hyderabad', location: 'LB Nagar Metro', time: '06:30 AM' },
  { id: 'p4', packageSlug: 'tirupati-3day', city: 'Hyderabad', location: 'Uppal Metro', time: '07:00 PM' },
  { id: 'p5', packageSlug: 'tirupati-3day', city: 'Hyderabad', location: 'MGBS', time: '07:30 PM' },
]

export function getPackage(slug: string): Package | undefined {
  return packages.find(p => p.slug === slug)
}

export function getFeatured(): Package[] {
  return packages.filter(p => p.isFeatured && p.isActive)
}

export function getByDeity(deity: string): Package[] {
  return packages.filter(p => p.deity.toLowerCase().includes(deity.toLowerCase()) && p.isActive)
}

export function getByRegion(state: string): Package[] {
  return packages.filter(p => p.state.toLowerCase().includes(state.toLowerCase()) && p.isActive)
}

export function getDepartures(slug: string): DepartureDate[] {
  return upcomingDepartures.filter(d => d.packageSlug === slug)
}

export function getPickupPoints(slug: string): PickupPoint[] {
  return pickupPoints.filter(p => p.packageSlug === slug)
}
