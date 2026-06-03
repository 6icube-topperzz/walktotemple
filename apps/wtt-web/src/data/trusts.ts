export interface DonationType {
  name: string
  amount: number | null
  description?: string
}

export interface Trust {
  slug: string
  name: string
  shortName: string
  location: string
  state: string
  deity: string
  emoji: string
  description: string
  donationTypes: DonationType[]
  accepts80G: boolean
  upiId?: string
}

export const trusts: Trust[] = [
  {
    slug: 'ttd',
    name: 'Tirumala Tirupati Devasthanams',
    shortName: 'TTD',
    location: 'Tirumala, Tirupati',
    state: 'Andhra Pradesh',
    deity: 'Lord Venkateswara',
    emoji: '🛕',
    description: 'TTD manages the Sri Venkateswara Temple at Tirumala — the richest and most visited temple in the world. Donations fund free annadanam (feeding), education, and healthcare.',
    donationTypes: [
      { name: 'Annadanam', amount: null, description: 'Feed pilgrims — any amount welcome' },
      { name: 'Kalyanotsavam (Wedding Ceremony)', amount: 1116 },
      { name: 'Thomala Seva', amount: 300 },
      { name: 'Suprabhatam Seva', amount: 500 },
      { name: 'Nitya Kalyanam', amount: 2000 },
      { name: 'General Donation', amount: null },
    ],
    accepts80G: true,
    upiId: 'ttd@sbi',
  },
  {
    slug: 'srisailam',
    name: 'Sri Bhramaramba Mallikarjuna Devasthanam',
    shortName: 'Srisailam Trust',
    location: 'Srisailam',
    state: 'Andhra Pradesh',
    deity: 'Lord Mallikarjuna + Devi Bhramaramba',
    emoji: '🔱',
    description: 'Manages the Srisailam Jyotirlinga temple — home to Mallikarjuna (Jyotirlinga) and Bhramaramba Devi (Shakti Peetha). One of the most sacred temples in South India.',
    donationTypes: [
      { name: 'Annadanam', amount: 500, description: 'Minimum ₹500 — feeds 10 pilgrims' },
      { name: 'Deepotsavam (Oil Lamp Festival)', amount: 1116 },
      { name: 'Abhishekam', amount: 500 },
      { name: 'General Donation', amount: null },
      { name: 'Renovation Fund', amount: null },
    ],
    accepts80G: true,
  },
  {
    slug: 'yadadri',
    name: 'Sri Lakshmi Narasimha Swamy Devasthanam',
    shortName: 'Yadadri Trust',
    location: 'Yadadri, Nalgonda',
    state: 'Telangana',
    deity: 'Lord Lakshmi Narasimha Swamy',
    emoji: '🦁',
    description: 'Manages the newly renovated Yadadri temple — one of the most powerful Vaishnavite shrines in South India. The temple complex was rebuilt at a cost of ₹1,800 crore.',
    donationTypes: [
      { name: 'Annadanam', amount: 500 },
      { name: 'Sahasra Deepotsavam', amount: 1116 },
      { name: 'Go Seva (Cow Donation)', amount: 1001 },
      { name: 'General Donation', amount: null },
    ],
    accepts80G: true,
  },
  {
    slug: 'shirdi',
    name: 'Shri Saibaba Sansthan Trust',
    shortName: 'Shirdi Sai Sansthan',
    location: 'Shirdi',
    state: 'Maharashtra',
    deity: 'Sai Baba',
    emoji: '🏠',
    description: 'Manages the Shirdi Sai Baba temple complex — one of the wealthiest trusts in India. Funds hospitals, schools, and annadanam for millions of devotees.',
    donationTypes: [
      { name: 'Annadanam', amount: null, description: 'Any amount — feeds lakhs daily' },
      { name: 'Deepotsavam', amount: 500 },
      { name: 'Abhishek Seva', amount: 1116 },
      { name: 'Palki Seva', amount: 2000 },
      { name: 'General Donation', amount: null },
    ],
    accepts80G: true,
  },
]

export function getTrust(slug: string): Trust | undefined {
  return trusts.find(t => t.slug === slug)
}

export function getAllTrusts(): Trust[] {
  return trusts
}
