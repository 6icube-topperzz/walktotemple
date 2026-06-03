'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ── CSS triangle — inherits text color, rotates when open ─────────────────────
function Triangle({ isOpen }: { isOpen: boolean }) {
  return (
    <span style={{
      display: 'inline-block',
      width: 0,
      height: 0,
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '5px solid currentColor',
      marginLeft: '5px',
      verticalAlign: 'middle',
      flexShrink: 0,
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 150ms ease',
    }} />
  )
}

// ── Right-pointing arrow for "View All" links ─────────────────────────────────
function ArrowRight() {
  return (
    <span style={{
      display: 'inline-block',
      width: 0,
      height: 0,
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderLeft: '5px solid currentColor',
      marginLeft: '4px',
    }} />
  )
}

// ── Dropdown section header ───────────────────────────────────────────────────
function SH({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 mt-4 first:mt-0 px-2">
      {children}
    </p>
  )
}

// ── Dropdown link ─────────────────────────────────────────────────────────────
function DLink({ href, children, soon }: { href: string; children: React.ReactNode; soon?: boolean }) {
  if (soon) {
    return (
      <span className="flex items-center px-2 py-1.5 text-sm text-gray-300 cursor-not-allowed select-none">
        {children}
        <span className="ml-1.5 text-xs">(soon)</span>
      </span>
    )
  }
  return (
    <Link
      href={href}
      className="block px-2 py-1.5 text-sm text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  )
}

// ── "View All" footer row ─────────────────────────────────────────────────────
function ViewAll({ href, label }: { href: string; label: string }) {
  return (
    <div className="border-t border-gray-100 mt-3 pt-3">
      <Link href={href} className="flex items-center px-2 py-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
        {label} <ArrowRight />
      </Link>
    </div>
  )
}

// ── Desktop hover-dropdown wrapper ────────────────────────────────────────────
function NavDropdown({
  name, label, active, openMenu, setOpenMenu, children,
}: {
  name: string
  label: string
  active?: boolean
  openMenu: string | null
  setOpenMenu: (v: string | null) => void
  children: React.ReactNode
}) {
  const isOpen = openMenu === name
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(name)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
          isOpen || active
            ? 'text-orange-500 border-orange-500'
            : 'text-gray-600 border-transparent hover:text-orange-500 hover:border-orange-200'
        }`}
      >
        {label}
        <Triangle isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-0 bg-white rounded-2xl shadow-xl border border-gray-100">
          {children}
        </div>
      )}
    </div>
  )
}

// ── TEMPLES ───────────────────────────────────────────────────────────────────
function TemplesMenu() {
  return (
    <div className="p-5 w-[640px]">
      <div className="grid grid-cols-3 gap-x-6">

        {/* Col 1 — Deities */}
        <div>
          <SH>By Deity</SH>
          <DLink href="/temples/deity/shiva">🔱 Lord Shiva</DLink>
          <DLink href="/temples/deity/vishnu">🪷 Lord Vishnu</DLink>
          <DLink href="/temples/deity/narasimha">🦁 Narasimha</DLink>
          <DLink href="/temples/deity/ganesha">🐘 Ganesha</DLink>
          <DLink href="/temples/deity/devi">🌺 Shakti / Devi</DLink>
          <DLink href="/temples/deity/durga">⚡ Durga</DLink>
          <DLink href="/temples/deity/hanuman">🙏 Hanuman</DLink>
          <DLink href="/temples/deity/rama">🏹 Rama</DLink>
          <DLink href="/temples/deity/krishna">🪈 Krishna</DLink>
          <DLink href="/temples/deity/saibaba">🏠 Saibaba</DLink>
          <ViewAll href="/temples/deity" label="All Deities" />
        </div>

        {/* Col 2 — States + Dhams */}
        <div>
          <SH>By State</SH>
          <DLink href="/temples/state/telangana">Telangana</DLink>
          <DLink href="/temples/state/andhra-pradesh">Andhra Pradesh</DLink>
          <DLink href="/temples/state/tamil-nadu">Tamil Nadu</DLink>
          <DLink href="/temples/state/karnataka">Karnataka</DLink>
          <DLink href="/temples/state/kerala">Kerala</DLink>
          <DLink href="/temples/state/uttar-pradesh">Uttar Pradesh</DLink>
          <ViewAll href="/temples/state" label="All States" />

          <SH>Dham Yatras</SH>
          <DLink href="/temples/dham/bada-char-dham">Bada Char Dham</DLink>
          <DLink href="/temples/dham/amarnath">Amarnath</DLink>
          <DLink href="/temples/dham/vaishnodevi">Vaishno Devi</DLink>
          <DLink href="/temples/dham/jyotirlingas">12 Jyotirlingas</DLink>
          <ViewAll href="/temples/dham" label="All Dhams" />
        </div>

        {/* Col 3 — Type + More */}
        <div>
          <SH>By Temple Type</SH>
          <DLink href="/temples/type/hilltop">⛰️ Hilltop Temples</DLink>
          <DLink href="/temples/type/forest">🌲 Forest Temples</DLink>
          <DLink href="/temples/type/riverside">💧 Riverside Temples</DLink>
          <DLink href="/temples/type/beach">🌊 Beach Temples</DLink>
          <DLink href="/temples/type/cave">🕳️ Cave Temples</DLink>

          <SH>Plan Your Trip</SH>
          <DLink href="/temples/festival">🎉 Festival Packages</DLink>
          <DLink href="/temples/duration/day-trips">☀️ Day Trips</DLink>
          <DLink href="/temples/duration/weekend">🌙 Weekend Getaways</DLink>
          <DLink href="/temples/duration/extended">🗓️ Extended Yatras</DLink>
          <DLink href="/temples/group/family">👨‍👩‍👧 Family Packages</DLink>
          <DLink href="/temples/group/senior">👴 Senior Special</DLink>
          <DLink href="/temples/group/solo">🧘 Solo Pilgrimage</DLink>
        </div>
      </div>

      <ViewAll href="/temples" label="Browse All Temple Packages" />
    </div>
  )
}

// ── POOJA STORE ───────────────────────────────────────────────────────────────
function PoojaMenu() {
  return (
    <div className="p-5 w-[440px]">
      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <SH>Shop by Category</SH>
          <DLink href="/pooja-store/puja-kits">🪔 Puja Kits</DLink>
          <DLink href="/pooja-store/idols">🐘 Idols & Murthis</DLink>
          <DLink href="/pooja-store/diyas">🕯️ Diyas & Lamps</DLink>
          <DLink href="/pooja-store/agarbatti">🌿 Agarbatti & Dhoop</DLink>
          <DLink href="/pooja-store/samagri">🏺 Puja Samagri</DLink>
          <DLink href="/pooja-store/threads">🧵 Sacred Threads</DLink>
        </div>
        <div>
          <SH>By Deity</SH>
          <DLink href="/pooja-store/deity/shiva">🔱 Shiva Puja Kit</DLink>
          <DLink href="/pooja-store/deity/vishnu">🪷 Vishnu Puja Kit</DLink>
          <DLink href="/pooja-store/deity/lakshmi">💰 Lakshmi Puja Kit</DLink>
          <DLink href="/pooja-store/deity/ganesha">🐘 Ganesha Puja Kit</DLink>
          <DLink href="/pooja-store/deity/saraswati">📚 Saraswati Kit</DLink>
          <DLink href="/pooja-store/deity/hanuman">🙏 Hanuman Kit</DLink>
          <DLink href="/pooja-store/deity/navratri">🌺 Navratri Kit</DLink>
        </div>
      </div>
      <ViewAll href="/pooja-store" label="View All Pooja Products" />
    </div>
  )
}

// ── RELIGIOUS LITERATURE ──────────────────────────────────────────────────────
function LitMenu() {
  return (
    <div className="p-5 w-[400px]">
      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <SH>Browse by Type</SH>
          <DLink href="/religious-lit/books">📗 Books</DLink>
          <DLink href="/religious-lit/scriptures">📜 Scriptures</DLink>
          <DLink href="/religious-lit/audio">🎵 Audio & Music</DLink>
          <DLink href="/religious-lit/children">🧒 Children&apos;s Books</DLink>

          <SH>By Deity</SH>
          <DLink href="/religious-lit/deity/shiva">🔱 Shiva</DLink>
          <DLink href="/religious-lit/deity/vishnu">🪷 Vishnu</DLink>
          <DLink href="/religious-lit/deity/rama">🏹 Rama</DLink>
          <DLink href="/religious-lit/deity/hanuman">🙏 Hanuman</DLink>
        </div>
        <div>
          <SH>By Language</SH>
          <DLink href="/religious-lit/language/telugu">Telugu</DLink>
          <DLink href="/religious-lit/language/tamil">Tamil</DLink>
          <DLink href="/religious-lit/language/hindi">Hindi</DLink>
          <DLink href="/religious-lit/language/kannada">Kannada</DLink>
          <DLink href="/religious-lit/language/sanskrit">Sanskrit</DLink>
          <DLink href="/religious-lit/language/english">English</DLink>
          <DLink href="/religious-lit/language/malayalam">Malayalam</DLink>
          <DLink href="/religious-lit/language/marathi">Marathi</DLink>
        </div>
      </div>
      <ViewAll href="/religious-lit" label="View All Literature" />
    </div>
  )
}

// ── TRUSTS & DONATIONS ────────────────────────────────────────────────────────
function TrustsMenu() {
  return (
    <div className="p-5 w-[260px]">
      <SH>Donate To</SH>
      <DLink href="/trusts/ttd">🛕 TTD Tirumala</DLink>
      <DLink href="/trusts/srisailam">🔱 Srisailam Trust</DLink>
      <DLink href="/trusts/yadadri">🦁 Yadadri Trust</DLink>
      <DLink href="/trusts/shirdi">🏠 Shirdi Sai Baba</DLink>
      <DLink href="/trusts/iskcon">🪷 ISKCON</DLink>
      <DLink href="/trusts/dharmasthala">🌿 Dharmasthala</DLink>
      <DLink href="/trusts/annadanam">🍽️ Annadanam</DLink>
      <ViewAll href="/trusts" label="All Trusts & Donations" />
    </div>
  )
}

// ── GIFTING ───────────────────────────────────────────────────────────────────
function GiftingMenu() {
  return (
    <div className="p-5 w-[250px]">
      <SH>Shop by Occasion</SH>
      <DLink href="/gifting/gruhapravesham">🏠 Gruhapravesham</DLink>
      <DLink href="/gifting/wedding">💍 Wedding Gifts</DLink>
      <DLink href="/gifting/new-baby">👶 New Baby Gifts</DLink>
      <DLink href="/gifting/festival">🎉 Festival Hampers</DLink>
      <DLink href="/gifting/prasadam">🙏 Prasadam Boxes</DLink>
      <DLink href="/gifting/souvenir">🛕 Temple Souvenirs</DLink>
      <DLink href="/gifting/birthday">🎂 Birthday Gifts</DLink>
      <ViewAll href="/gifting" label="View All Gifts" />
    </div>
  )
}

// ── PRINTING ──────────────────────────────────────────────────────────────────
function PrintingMenu() {
  return (
    <div className="p-5 w-[250px]">
      <SH>Print Products</SH>
      <DLink href="/printing/calendars">📅 Calendars 2027</DLink>
      <DLink href="/printing/diaries">📓 Spiritual Diaries</DLink>
      <DLink href="/printing/posters">🖼️ Deity Posters & Frames</DLink>
      <DLink href="/printing/invitations">📨 Religious Invitations</DLink>
      <DLink href="/printing/panchanga">🌙 Panchanga Calendar</DLink>
      <ViewAll href="/printing" label="View All Print Products" />
    </div>
  )
}

// ── Mobile accordion data ─────────────────────────────────────────────────────
const MOBILE_MENUS = [
  {
    key: 'temples',
    label: '🛕 Temples',
    href: '/temples',
    sections: [
      {
        title: 'By Deity',
        items: [
          { label: '🔱 Lord Shiva', href: '/temples/deity/shiva' },
          { label: '🪷 Lord Vishnu', href: '/temples/deity/vishnu' },
          { label: '🦁 Narasimha', href: '/temples/deity/narasimha' },
          { label: '🐘 Ganesha', href: '/temples/deity/ganesha' },
          { label: '🌺 Shakti / Devi', href: '/temples/deity/devi' },
          { label: '🙏 Hanuman', href: '/temples/deity/hanuman' },
          { label: '🏹 Rama', href: '/temples/deity/rama' },
          { label: '🪈 Krishna', href: '/temples/deity/krishna' },
          { label: '→ All Deities', href: '/temples/deity' },
        ],
      },
      {
        title: 'By State',
        items: [
          { label: 'Telangana', href: '/temples/state/telangana' },
          { label: 'Andhra Pradesh', href: '/temples/state/andhra-pradesh' },
          { label: 'Tamil Nadu', href: '/temples/state/tamil-nadu' },
          { label: 'Karnataka', href: '/temples/state/karnataka' },
          { label: 'Kerala', href: '/temples/state/kerala' },
          { label: '→ All States', href: '/temples/state' },
        ],
      },
      {
        title: 'Dham Yatras',
        items: [
          { label: 'Bada Char Dham', href: '/temples/dham/bada-char-dham' },
          { label: 'Chota Char Dham', href: '/temples/dham/chota-char-dham' },
          { label: 'Amarnath Yatra', href: '/temples/dham/amarnath' },
          { label: 'Vaishno Devi', href: '/temples/dham/vaishnodevi' },
          { label: '12 Jyotirlingas', href: '/temples/dham/jyotirlingas' },
          { label: '→ All Dhams', href: '/temples/dham' },
        ],
      },
      {
        title: 'By Type',
        items: [
          { label: '⛰️ Hilltop Temples', href: '/temples/type/hilltop' },
          { label: '🌲 Forest Temples', href: '/temples/type/forest' },
          { label: '💧 Riverside Temples', href: '/temples/type/riverside' },
          { label: '🌊 Beach Temples', href: '/temples/type/beach' },
          { label: '🕳️ Cave Temples', href: '/temples/type/cave' },
        ],
      },
      {
        title: 'Plan Your Yatra',
        items: [
          { label: '🎉 Festival Packages', href: '/temples/festival' },
          { label: '☀️ Day Trips', href: '/temples/duration/day-trips' },
          { label: '🌙 Weekend Getaways', href: '/temples/duration/weekend' },
          { label: '👨‍👩‍👧 Family Packages', href: '/temples/group/family' },
          { label: '👴 Senior Special', href: '/temples/group/senior' },
        ],
      },
    ],
  },
  {
    key: 'pooja',
    label: '🪔 Pooja Store',
    href: '/pooja-store',
    sections: [
      {
        title: 'By Category',
        items: [
          { label: '🪔 Puja Kits', href: '/pooja-store/puja-kits' },
          { label: '🐘 Idols & Murthis', href: '/pooja-store/idols' },
          { label: '🕯️ Diyas & Lamps', href: '/pooja-store/diyas' },
          { label: '🌿 Agarbatti & Dhoop', href: '/pooja-store/agarbatti' },
          { label: '🏺 Samagri', href: '/pooja-store/samagri' },
          { label: '🧵 Sacred Threads', href: '/pooja-store/threads' },
        ],
      },
      {
        title: 'By Deity',
        items: [
          { label: '🔱 Shiva Kit', href: '/pooja-store/deity/shiva' },
          { label: '🪷 Vishnu Kit', href: '/pooja-store/deity/vishnu' },
          { label: '💰 Lakshmi Kit', href: '/pooja-store/deity/lakshmi' },
          { label: '🐘 Ganesha Kit', href: '/pooja-store/deity/ganesha' },
        ],
      },
    ],
  },
  {
    key: 'lit',
    label: '📖 Religious Lit',
    href: '/religious-lit',
    sections: [
      {
        title: 'Browse by Type',
        items: [
          { label: '📗 Books', href: '/religious-lit/books' },
          { label: '📜 Scriptures', href: '/religious-lit/scriptures' },
          { label: '🎵 Audio & Music', href: '/religious-lit/audio' },
          { label: "🧒 Children's Books", href: '/religious-lit/children' },
        ],
      },
      {
        title: 'By Language',
        items: [
          { label: 'Telugu', href: '/religious-lit/language/telugu' },
          { label: 'Tamil', href: '/religious-lit/language/tamil' },
          { label: 'Hindi', href: '/religious-lit/language/hindi' },
          { label: 'Sanskrit', href: '/religious-lit/language/sanskrit' },
          { label: 'English', href: '/religious-lit/language/english' },
        ],
      },
    ],
  },
  {
    key: 'trusts',
    label: '🏛️ Trusts & Donations',
    href: '/trusts',
    sections: [
      {
        title: 'Donate To',
        items: [
          { label: '🛕 TTD Tirumala', href: '/trusts/ttd' },
          { label: '🔱 Srisailam Trust', href: '/trusts/srisailam' },
          { label: '🦁 Yadadri Trust', href: '/trusts/yadadri' },
          { label: '🏠 Shirdi Sai Baba', href: '/trusts/shirdi' },
          { label: '🪷 ISKCON', href: '/trusts/iskcon' },
          { label: '🌿 Dharmasthala', href: '/trusts/dharmasthala' },
          { label: '🍽️ Annadanam', href: '/trusts/annadanam' },
        ],
      },
    ],
  },
  {
    key: 'gifting',
    label: '🎁 Gifting',
    href: '/gifting',
    sections: [
      {
        title: 'By Occasion',
        items: [
          { label: '🏠 Gruhapravesham', href: '/gifting/gruhapravesham' },
          { label: '💍 Wedding Gifts', href: '/gifting/wedding' },
          { label: '👶 New Baby Gifts', href: '/gifting/new-baby' },
          { label: '🎉 Festival Hampers', href: '/gifting/festival' },
          { label: '🙏 Prasadam Boxes', href: '/gifting/prasadam' },
          { label: '🛕 Temple Souvenirs', href: '/gifting/souvenir' },
        ],
      },
    ],
  },
  {
    key: 'printing',
    label: '🖨️ Printing',
    href: '/printing',
    sections: [
      {
        title: 'Print Products',
        items: [
          { label: '📅 Calendars 2027', href: '/printing/calendars' },
          { label: '📓 Spiritual Diaries', href: '/printing/diaries' },
          { label: '🖼️ Deity Posters & Frames', href: '/printing/posters' },
          { label: '📨 Religious Invitations', href: '/printing/invitations' },
          { label: '🌙 Panchanga Calendar', href: '/printing/panchanga' },
        ],
      },
    ],
  },
]

const TRENDING = ['Tirupati', 'Yadadri', 'Srisailam', 'Kedarnath', 'Varanasi', 'Amarnath']

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Close everything on route change
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  function toggleMobileMenu(key: string) {
    setOpenMenu(prev => (prev === key ? null : key))
  }

  // Highlight primary nav item if on that section
  function isActive(prefix: string) {
    return pathname.startsWith(prefix)
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">

      {/* ROW 1 — Top announcement bar */}
      <div className="bg-saffron text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 flex-wrap">
          <span>🚌 Free pickup from major city points</span>
          <span className="hidden sm:block">·</span>
          <span className="hidden sm:block">🙏 Verified darshans guaranteed</span>
          <span className="hidden sm:block">·</span>
          <span>📞 WhatsApp: <a href="https://wa.me/919876543210" className="underline font-medium">+91 98765 43210</a></span>
        </div>
      </div>

      {/* ROW 2 — Logo + Search + Auth */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🛕</span>
            <div>
              <div className="font-heading text-xl font-semibold text-gray-900 leading-none">WalkToTemple</div>
              <div className="text-xs text-saffron font-medium leading-none mt-0.5">Sacred Journeys. Simplified.</div>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-auto relative">
            <div className={`flex items-center border-2 rounded-full px-4 py-2 bg-gray-50 transition-all ${searchOpen ? 'border-saffron bg-white shadow-md' : 'border-gray-200'}`}>
              <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search temples, packages, deities..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              />
            </div>
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map(t => (
                    <Link key={t} href={`/temples?q=${t}`}
                      className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full hover:bg-saffron hover:text-white transition-colors">
                      🛕 {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link href="/my-bookings" className="text-sm text-gray-600 hover:text-saffron px-3 py-2 font-medium transition-colors whitespace-nowrap">
              My Bookings
            </Link>
            <Link href="/auth/login" className="text-sm border border-gray-300 hover:border-saffron text-gray-700 hover:text-saffron px-4 py-1.5 rounded-full transition-colors whitespace-nowrap">
              Login
            </Link>
            <Link href="/temples" className="text-sm bg-saffron hover:bg-saffron-dark text-white font-semibold px-5 py-2 rounded-full transition-colors flex items-center gap-1 whitespace-nowrap">
              Book Now <span>→</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(v => !v)}>
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* ROW 3 — Desktop primary nav with hover dropdowns */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-center">

          <NavDropdown name="temples" label="🛕 Temples" active={isActive('/temples')} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <TemplesMenu />
          </NavDropdown>

          <NavDropdown name="pooja" label="🪔 Pooja Store" active={isActive('/pooja-store')} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <PoojaMenu />
          </NavDropdown>

          <NavDropdown name="lit" label="📖 Religious Lit" active={isActive('/religious-lit')} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <LitMenu />
          </NavDropdown>

          <NavDropdown name="trusts" label="🏛️ Trusts & Donations" active={isActive('/trusts')} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <TrustsMenu />
          </NavDropdown>

          <NavDropdown name="gifting" label="🎁 Gifting" active={isActive('/gifting')} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <GiftingMenu />
          </NavDropdown>

          <NavDropdown name="printing" label="🖨️ Printing" active={isActive('/printing')} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <PrintingMenu />
          </NavDropdown>

        </nav>
      </div>

      {/* ─── MOBILE MENU — accordion, one section open at a time ──────────────── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">

          {MOBILE_MENUS.map(menu => (
            <div key={menu.key} className="border-b border-gray-100 last:border-0">
              {/* Accordion trigger */}
              <button
                onClick={() => toggleMobileMenu(menu.key)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>{menu.label}</span>
                <Triangle isOpen={openMenu === menu.key} />
              </button>

              {/* Accordion body */}
              {openMenu === menu.key && (
                <div className="px-5 pb-4 bg-gray-50">
                  {/* "View all" link at top of expanded section */}
                  <Link
                    href={menu.href}
                    className="block py-2.5 text-sm font-semibold text-orange-600 border-b border-gray-200 mb-2"
                  >
                    View All {menu.label.replace(/^[^\s]+\s/, '')} →
                  </Link>

                  {menu.sections.map(sec => (
                    <div key={sec.title} className="mt-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {sec.title}
                      </p>
                      <div className="space-y-0.5">
                        {sec.items.map(item => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block py-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Auth row */}
          <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
            <Link href="/auth/login" className="flex-1 text-center border border-saffron text-saffron py-2.5 rounded-full text-sm font-medium">
              Login
            </Link>
            <Link href="/temples" className="flex-1 text-center bg-saffron text-white py-2.5 rounded-full text-sm font-semibold">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
