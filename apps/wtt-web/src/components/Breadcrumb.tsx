'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// CSS right-pointing micro-triangle separator
function Sep() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 0,
        height: 0,
        borderTop: '4px solid transparent',
        borderBottom: '4px solid transparent',
        borderLeft: '5px solid #D1D5DB',
        flexShrink: 0,
      }}
    />
  )
}

const LABELS: Record<string, string> = {
  // Primary sections
  temples: 'Temples',
  'pooja-store': 'Pooja Store',
  'religious-lit': 'Religious Literature',
  trusts: 'Trusts & Donations',
  gifting: 'Gifting',
  printing: 'Printing',
  packages: 'Packages',
  // Temple sub-sections
  deity: 'Deities',
  state: 'States',
  dham: 'Dham Yatras',
  type: 'Temple Type',
  festival: 'Festivals',
  duration: 'By Duration',
  group: 'By Group',
  // Deity slugs
  shiva: 'Lord Shiva',
  vishnu: 'Lord Vishnu',
  narasimha: 'Lakshmi Narasimha',
  hanuman: 'Hanuman',
  shakti: 'Shakti / Devi',
  devi: 'Devi / Shakti',
  durga: 'Durga',
  ganesha: 'Ganesha',
  murugan: 'Murugan',
  parvathi: 'Parvathi',
  rama: 'Rama',
  krishna: 'Krishna',
  dattatreya: 'Dattatreya',
  ayyappa: 'Ayyappa',
  lakshmi: 'Goddess Lakshmi',
  saraswati: 'Saraswati',
  navagraha: 'Navagraha',
  saibaba: 'Saibaba',
  padmanabha: 'Padmanabha Swamy',
  subramanya: 'Subramanya',
  kali: 'Kali',
  sita: 'Sita',
  venkateswara: 'Venkateswara',
  // States
  telangana: 'Telangana',
  'andhra-pradesh': 'Andhra Pradesh',
  'tamil-nadu': 'Tamil Nadu',
  karnataka: 'Karnataka',
  kerala: 'Kerala',
  maharashtra: 'Maharashtra',
  'uttar-pradesh': 'Uttar Pradesh',
  uttarakhand: 'Uttarakhand',
  rajasthan: 'Rajasthan',
  odisha: 'Odisha',
  gujarat: 'Gujarat',
  'west-bengal': 'West Bengal',
  'madhya-pradesh': 'Madhya Pradesh',
  'himachal-pradesh': 'Himachal Pradesh',
  punjab: 'Punjab',
  // Dhams
  'bada-char-dham': 'Bada Char Dham',
  'chota-char-dham': 'Chota Char Dham',
  'panch-kedar': 'Panch Kedar',
  'panch-badri': 'Panch Badri',
  'sapta-puri': 'Sapta Puri',
  amarnath: 'Amarnath',
  vaishnodevi: 'Vaishno Devi',
  'kailash-mansarovar': 'Kailash Mansarovar',
  jyotirlingas: '12 Jyotirlingas',
  'shakti-peethas': '51 Shakti Peethas',
  'divya-desams': '108 Divya Desams',
  'pancha-bootha': 'Pancha Bootha Sthalas',
  // Temple types
  forest: 'Forest Temples',
  beach: 'Beach Temples',
  riverside: 'Riverside Temples',
  hilltop: 'Hilltop Temples',
  cave: 'Cave Temples',
  island: 'Island Temples',
  // Duration
  'day-trips': 'Day Trips',
  weekend: 'Weekend Getaways',
  extended: 'Extended Yatras',
  // Group
  family: 'Family Packages',
  senior: 'Senior Special',
  solo: 'Solo Pilgrimage',
  corporate: 'Corporate Spiritual',
  // Festivals
  karthika: 'Karthika Masam',
  shivaratri: 'Maha Shivaratri',
  brahmotsavam: 'Brahmotsavam',
  vaikunta: 'Vaikunta Ekadashi',
  navratri: 'Navratri',
  diwali: 'Diwali Special',
  // Pooja store
  'puja-kits': 'Puja Kits',
  idols: 'Idols & Murthis',
  diyas: 'Diyas & Lamps',
  agarbatti: 'Agarbatti & Dhoop',
  samagri: 'Puja Samagri',
  threads: 'Sacred Threads',
  product: 'Product',
  // Religious lit
  books: 'Books',
  scriptures: 'Scriptures',
  audio: 'Audio & Music',
  children: "Children's Books",
  language: 'By Language',
  telugu: 'Telugu',
  tamil: 'Tamil',
  hindi: 'Hindi',
  english: 'English',
  sanskrit: 'Sanskrit',
  kannada: 'Kannada',
  malayalam: 'Malayalam',
  marathi: 'Marathi',
  // Trusts
  ttd: 'Tirumala TTD',
  srisailam: 'Srisailam',
  yadadri: 'Yadadri',
  shirdi: 'Shirdi Sai Baba',
  iskcon: 'ISKCON',
  dharmasthala: 'Dharmasthala',
  annadanam: 'Annadanam',
  confirm: 'Confirmation',
  // Gifting
  gruhapravesham: 'Gruhapravesham',
  wedding: 'Wedding Gifts',
  'new-baby': 'New Baby Gifts',
  prasadam: 'Prasadam Boxes',
  souvenir: 'Temple Souvenirs',
  birthday: 'Birthday Gifts',
  // Printing
  calendars: 'Calendars',
  diaries: 'Diaries',
  posters: 'Posters & Frames',
  invitations: 'Invitations',
  panchanga: 'Panchanga',
  customise: 'Customise',
  order: 'Order',
}

function labelFor(seg: string): string {
  return LABELS[seg] ?? seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

interface Crumb {
  label: string
  href: string
}

function buildCrumbs(pathname: string): Crumb[] {
  const segs = pathname.split('/').filter(Boolean)
  if (segs.length === 0) return []

  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }]
  let path = ''
  for (const seg of segs) {
    path += `/${seg}`
    crumbs.push({ label: labelFor(seg), href: path })
  }
  return crumbs
}

export default function Breadcrumb() {
  const pathname = usePathname()
  // Strip query string
  const cleanPath = pathname.split('?')[0]
  const crumbs = buildCrumbs(cleanPath)

  if (crumbs.length <= 1) return null

  return (
    <div className="bg-white border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 flex-wrap text-sm">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <span key={crumb.href} className="flex items-center gap-2">
              {i > 0 && <Sep />}
              {isLast ? (
                <span className="text-gray-800 font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-gray-500 hover:text-orange-600 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}
