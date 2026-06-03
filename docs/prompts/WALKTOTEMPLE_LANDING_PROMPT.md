# WalkToTemple — Rich Landing Page + Navbar
## Repo: C:\dev\walktotemple\apps\wtt-web\
## Install: pnpm add framer-motion

---

## DESIGN PHILOSOPHY

```
WalkToTemple = sacred pilgrimage journeys made simple
Feel: spiritual, peaceful, trustworthy, devotional
Colors: Saffron #FF9933 + Gold #FFD700 + Deep Maroon #8B0000
        + White + Warm Cream #FFF8F0
NOT: corporate, cold, generic travel agency

Better than:
  MakeMyTrip (generic, commercial)
  IRCTC tourism (dated UI)
  
WalkToTemple:
  Curated packages — not aggregator
  Temple-first experience
  South India focus (Telangana + AP + Tamil Nadu)
  Devotional, warm, trustworthy
```

---

## NAVBAR (3 ROWS)

### ROW 1 — Top Bar (saffron background)
```
🚌 Free pickup from major city points  ·  
🙏 Verified temple darshans guaranteed  ·  
📞 WhatsApp: +91 98765 43210
```

### ROW 2 — Logo + Search + Auth
```
LEFT:   Logo 🛕 WalkToTemple
        Tagline: "Sacred Journeys. Simplified."

CENTER: Search bar (40% width, rounded)
        Placeholder: "Search temples, pilgrimages, destinations..."
        On focus shows:
          Trending: Tirupati · Yadadri · Srisailam · 
                    Bhadrachalam · Varanasi · Kedarnath

RIGHT:  [My Bookings]
        [Login]
        [Book Now →] ← saffron filled button
```

### ROW 3 — Category Nav (centered, cream bg #FFF8F0)
```
Pilgrimages ▾
  ── BY DURATION ──
  Day Trips (1 Day)        → /pilgrimages/day-trips
  Weekend Journeys (2-3D)  → /pilgrimages/weekend
  Extended (4+ Days)       → /pilgrimages/extended
  ── BY GROUP ──
  Solo Pilgrimage          → /pilgrimages/solo
  Family Package           → /pilgrimages/family
  Group (20+ people)       → /pilgrimages/group
  Senior Special           → /pilgrimages/senior
  Corporate Spiritual      → /pilgrimages/corporate

By Deity ▾
  Lord Shiva               → /deity/shiva
  Lord Vishnu              → /deity/vishnu
  Lord Venkateswara        → /deity/venkateswara
  Goddess / Devi           → /deity/devi
  Lord Ganesha             → /deity/ganesha
  Lord Hanuman             → /deity/hanuman
  Lord Murugan             → /deity/murugan
  Lord Rama                → /deity/rama
  Lord Krishna             → /deity/krishna

By Region ▾
  ── SOUTH INDIA ──
  Telangana                → /region/telangana
  Andhra Pradesh           → /region/andhra-pradesh
  Tamil Nadu               → /region/tamil-nadu
  Karnataka                → /region/karnataka
  Kerala                   → /region/kerala
  ── NORTH INDIA ──
  Uttar Pradesh            → /region/uttar-pradesh
  Uttarakhand              → /region/uttarakhand
  Rajasthan                → /region/rajasthan
  Maharashtra              → /region/maharashtra
  ── EAST INDIA ──
  Odisha                   → /region/odisha
  West Bengal              → /region/west-bengal

Jyotirlingas               → /jyotirlingas (12 temples)
Char Dham                  → /char-dham (4 dhams)
Shakti Peethas             → /shakti-peethas (51 temples)
Divya Desams               → /divya-desams (108 Vishnu)

Festival Pilgrimages ▾
  Karthika Masam           → /festival/karthika
  Maha Shivaratri          → /festival/shivaratri
  Vaikunta Ekadashi        → /festival/vaikunta
  Brahmotsavam             → /festival/brahmotsavam
  Navratri                 → /festival/navratri
  Diwali Special           → /festival/diwali

Village Experiences        → /village-experiences
Plan My Trip               → /plan-trip (custom builder)
```

---

## LANDING PAGE SECTIONS

### SECTION 1 — HERO CAROUSEL (5 slides)

```
Slide 1 — Main hero:
  Background: dark slate #1E293B with saffron glow
  Tag: "Curated Pilgrimage Packages"
  H1: "Sacred Journeys.
       Beautifully Organized."
  Sub: "From Yadadri day trips to Tirupati 3-day packages.
        Transport + Darshan + Accommodation — all arranged."
  CTA: [Explore Packages →] [View All Temples]
  Right: Floating temple silhouette illustration

Slide 2 — South India focus:
  Background: deep maroon gradient
  Tag: "Telangana & Andhra Pradesh"
  H1: "Yadadri. Srisailam.
       Bhadrachalam. Tirupati."
  Sub: "5 curated packages across sacred Telangana
        and Andhra temples. Starting ₹899."
  CTA: [Explore South India Packages →]
  Right: Map illustration with temple markers

Slide 3 — Jyotirlingas:
  Background: orange-gold gradient
  Tag: "12 Jyotirlinga Yatra"
  H1: "Embark on the
       Sacred Jyotirlinga Journey."
  Sub: "Visit all 12 abodes of Lord Shiva.
        We plan each leg. You focus on the divine."
  CTA: [Plan My Jyotirlinga Yatra →]

Slide 4 — Festival pilgrimages:
  Background: deep purple
  Tag: "Karthika Masam Special"
  H1: "Make This Karthika
       Truly Sacred."
  Sub: "Special Karthika Masam packages to
        Srisailam, Kaleshwaram, Yadadri.
        Book early — limited seats."
  CTA: [Book Karthika Package →]

Slide 5 — Char Dham:
  Background: Himalayan blue-white gradient
  Tag: "Char Dham Yatra 2026"
  H1: "Kedarnath. Badrinath.
       Gangotri. Yamunotri."
  Sub: "Complete Char Dham yatra organized for you.
        Helicopters, accommodation, darshan — all included."
  CTA: [Explore Char Dham →]
```

### SECTION 2 — QUICK CATEGORY PILLS

```
Horizontally scrollable pills:
  🛕 All Packages
  ☀️ Day Trips
  🌙 Weekend
  📅 Extended
  🔱 Shiva Temples
  🪷 Vishnu Temples
  🌺 Devi Temples
  🐘 Ganesha
  🏔️ Char Dham
  ⚡ Jyotirlingas
  🎉 Festival Special
  👨‍👩‍👧 Family
  👴 Senior Special
```

### SECTION 3 — FEATURED PACKAGES (carousel)

```
Title: "Popular Pilgrimages from Hyderabad"
Subtitle: "Most booked packages this month"

CAROUSEL (3 cards, ← → arrows on sides):

PACKAGE CARD:
┌──────────────────────────────────────┐
│ [Temple photo / illustration]        │
│ ⭐ Featured                          │
│                                      │
│ Tirupati 3 Days                      │
│ 🛕 Tirumala + Kanipakam + Srikalahasti│
│ ★★★★★ 4.9 (234 reviews)            │
│                                      │
│ 📅 3 Days · 2 Nights                 │
│ 🚌 AC Bus + Accommodation            │
│ 🎫 Darshan tickets included          │
│                                      │
│ From ₹4,999 per person              │
│ Next: 15 Jun · 8 seats left 🔥       │
│                                      │
│ [View Details →]  [Book Now]         │
└──────────────────────────────────────┘

Show 8 packages in carousel
```

### SECTION 4 — BY DEITY (interactive tabs)

```
Title: "Find Temples by Your Deity"
Subtitle: "Every deity has sacred abodes across India.
           Find yours."

DEITY TABS (with icons, centered):
  🔱 Lord Shiva   🪷 Lord Vishnu   🌺 Goddess Devi
  🐘 Lord Ganesha  🙏 Lord Hanuman  🎺 Lord Murugan
  🏹 Lord Rama    🪈 Lord Krishna

Each tab shows 4 package cards:

Lord Shiva tab:
  Srisailam (Mallikarjuna Jyotirlinga)
  Kaleshwaram (Triveni Sangamam)
  Bhadrachalam (Godavari banks)
  Mahakaleshwar, Ujjain

Lord Vishnu tab:
  Tirupati (Venkateswara)
  Yadadri (Lakshmi Narasimha)
  Ahobilam (9 Narasimha forms)
  Mantralayam (Raghavendra)

Goddess Devi tab:
  Kanaka Durga, Vijayawada
  Bhramaramba, Srisailam
  Gnana Saraswati, Basara
  Mahalakshmi, Kolhapur
```

### SECTION 5 — BY REGION (map-style cards)

```
Title: "Explore Sacred India by Region"
Subtitle: "Every state has temples that have been
           blessed by millions of devotees"

TWO COLUMN LAYOUT:

LEFT (35%) — Static:
  Illustrated India map
  Sacred locations marked with 🛕
  Highlight: South India region
  Text: "We currently operate in South India
         with pan-India packages coming soon"

RIGHT (65%) — Region cards carousel:
  ← → arrows on sides

  TELANGANA 🔱
    Yadadri, Srisailam, Bhadrachalam,
    Kaleshwaram, Warangal temples
    12 packages · Starting ₹699
    [Explore →]

  ANDHRA PRADESH 🪷
    Tirupati, Kanipakam, Srikalahasti,
    Vijayawada, Annavaram, Ahobilam
    18 packages · Starting ₹899
    [Explore →]

  TAMIL NADU 🎺
    Madurai Meenakshi, Rameswaram,
    Kanchipuram, Tiruvannamalai
    Coming soon — join waitlist

  KARNATAKA 🐘
    Dharmasthala, Kukke Subramanya,
    Udupi Krishna, Kollur Mookambika
    Coming soon

  UTTARAKHAND 🏔️
    Char Dham Yatra, Haridwar,
    Rishikesh, Kedarnath
    Premium packages

  UTTAR PRADESH 🙏
    Varanasi, Ayodhya, Mathura,
    Vrindavan, Prayagraj
    Coming soon
```

### SECTION 6 — JYOTIRLINGAS STRIP

```
Background: dark maroon #4A0010
Title: "12 Jyotirlingas — The Sacred Journey of a Lifetime"
Subtitle: "Visit all 12 abodes of Lord Shiva.
           We plan every leg."

Infinite scroll strip with 12 Jyotirlinga names + state:
  Somnath (Gujarat)
  Mallikarjuna/Srisailam (AP) ← we have this
  Mahakaleshwar (MP)
  Omkareshwar (MP)
  Kedarnath (Uttarakhand)
  Bhimashankar (Maharashtra)
  Vishwanath/Kashi (UP)
  Trimbakeshwar (Maharashtra)
  Vaidyanath (Jharkhand)
  Nageshwar (Gujarat)
  Rameshwaram (Tamil Nadu)
  Grishneshwar (Maharashtra)

Progress tracker:
  "Start your Jyotirlinga journey — 
   We cover 3 of 12. More coming."
  [Srisailam ✅] [11 more →]

CTA: [Start My Jyotirlinga Yatra →]
```

### SECTION 7 — HOW IT WORKS

```
3 steps:
1️⃣ Choose Your Package
   "Browse by deity, region, or duration.
    Filter by budget and group size."

2️⃣ We Arrange Everything
   "AC transport · Accommodation · 
    Darshan tickets · Local guide · Meals"

3️⃣ Focus on the Divine
   "You pray. We handle the rest.
    WhatsApp updates at every step."
```

### SECTION 8 — FESTIVAL PILGRIMAGES

```
Background: warm saffron gradient
Title: "Upcoming Festival Pilgrimages 🎉"
Subtitle: "Special darshans during auspicious occasions"

Festival cards (carousel):

KARTHIKA MASAM (Nov 2026):
  Srisailam Karthika Special
  Kaleshwaram Karthika Deepotsavam
  Yadadri Karthika Darshan
  ⏰ Booking opens: Sept 2026

MAHA SHIVARATRI (Feb 2027):
  Srisailam overnight special
  Pan-India Jyotirlinga circuit
  
BRAHMOTSAVAM (Sept 2026):
  Tirupati Brahmotsavam darshan
  Special accommodation arranged
  Advance booking required

Each card: festival name + date + packages count + [View →]
```

### SECTION 9 — UPCOMING DEPARTURES (urgency)

```
Title: "Upcoming Departures — Book Fast 🔥"
Subtitle: "Limited seats per trip"

Table-style cards:

┌──────────────────────────────────────────────────┐
│ Yadadri Day Trip          15 Jun · Sun           │
│ 🚌 From Hyderabad · 1 Day · ₹899               │
│ ████████████░░ 18/20 seats    [Book →]           │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Tirupati 3 Days           20 Jun · Fri           │
│ 🚌 From Hyderabad · 3D · ₹4,999                │
│ ████████░░░░░░ 12/20 seats    [Book →]           │
└──────────────────────────────────────────────────┘

Show 5 upcoming departures
[View All Departures →]
```

### SECTION 10 — TRUST SIGNALS

```
4 cards:

🛕 Temple-Verified Darshans
   "We coordinate directly with temple trusts
    for confirmed darshan slots. No queuing."

🚌 Comfortable Transport
   "AC sleeper/seater buses for overnight.
    GPS-tracked. Experienced drivers."

🏨 Quality Accommodation
   "Pre-inspected dharamshalas and hotels.
    Clean, safe, close to temples."

📞 24/7 Trip Support
   "WhatsApp support throughout the journey.
    Emergency assistance always available."
```

### SECTION 11 — REVIEWS

```
Title: "What Pilgrims Say 🙏"

3 review cards:
  Photo + name + city
  ★★★★★ rating
  Review text
  Package taken
  "Verified Pilgrim ✅"

Stats: 4.9★ avg · 5,000+ pilgrims · 15 temples · 5 states
```

### SECTION 12 — VILLAGE EXPERIENCES TEASER

```
Background: earthy green
Title: "Beyond the Temple — Village Experiences"
Subtitle: "Stay in temple villages. Meet artisans.
           Experience living heritage."

2 cards (coming soon):
  Temple village stay
  Heritage walk + local crafts

[Join Waitlist →]
```

### SECTION 13 — CTA

```
Background: dark slate #1E293B
Title: "Your Sacred Journey Awaits"
Sub: "Book today. Travel blessed."
CTA: [Browse All Packages →]
Small: "All packages include transport + accommodation + darshan"
```

### SECTION 14 — FOOTER

```
Logo + tagline

COLUMNS:
  PILGRIMAGES:
    Day Trips | Weekend | Extended
    Family | Senior Special | Group
    
  BY DEITY:
    Shiva Temples | Vishnu Temples
    Devi Temples | Ganesha | Hanuman
    
  SACRED CIRCUITS:
    12 Jyotirlingas | Char Dham
    Shakti Peethas | Divya Desams
    
  REGIONS:
    Telangana | Andhra Pradesh
    Tamil Nadu | Karnataka | UP
    
  COMPANY:
    About | Contact | Privacy | Terms
    Become a Tour Partner

Bottom: "🛕 Connecting devotees to their sacred temples"
        "A 6icube product"
        Payments: UPI · Razorpay · COD
```

---

## ALL ROUTES

```
/                           → Landing page
/pilgrimages                → All packages
/pilgrimages/day-trips      → 1-day packages
/pilgrimages/weekend        → 2-3 day packages
/pilgrimages/extended       → 4+ day packages
/pilgrimages/family         → Family packages
/pilgrimages/senior         → Senior friendly
/pilgrimages/group          → Group (20+)
/pilgrimages/corporate      → Corporate spiritual
/deity/shiva                → Shiva temples
/deity/vishnu               → Vishnu temples
/deity/venkateswara         → Tirupati + Narasimha
/deity/devi                 → Goddess temples
/deity/ganesha              → Ganesha temples
/deity/hanuman              → Hanuman temples
/deity/murugan              → Murugan temples
/deity/rama                 → Rama temples
/deity/krishna              → Krishna temples
/region/telangana           → Telangana packages
/region/andhra-pradesh      → AP packages
/region/tamil-nadu          → TN packages
/region/karnataka           → Karnataka packages
/region/kerala              → Kerala packages
/region/uttar-pradesh       → UP packages
/region/uttarakhand         → Uttarakhand packages
/region/maharashtra         → Maharashtra packages
/jyotirlingas               → 12 Jyotirlinga yatra
/char-dham                  → Char Dham yatra
/shakti-peethas             → 51 Shakti Peethas
/divya-desams               → 108 Divya Desams
/festival/karthika          → Karthika Masam
/festival/shivaratri        → Maha Shivaratri
/festival/brahmotsavam      → Brahmotsavam
/festival/vaikunta          → Vaikunta Ekadashi
/festival/navratri          → Navratri
/village-experiences        → Village stays
/plan-trip                  → Custom trip builder
/packages/[slug]            → Package detail page
/booking/[slug]             → Booking form
/my-bookings                → My bookings
/auth/login
/auth/register
```

---

## PACKAGE DETAIL PAGE /packages/[slug]

```
LAYOUT:
  LEFT (35%): Booking sidebar (sticky)
  RIGHT (65%): Package details

LEFT SIDEBAR:
  Package name
  Price per person
  
  SELECT DEPARTURE:
    Date cards (next 4 available)
    Seats available indicator
    
  SELECT PERSONS:
    Adults: [−] 2 [+]
    Children (5-12): [−] 0 [+]
    Senior (60+): [−] 0 [+]
    
  PRICE BREAKDOWN:
    Adults: 2 × ₹4,999 = ₹9,998
    Children: 0 × ₹2,499 = ₹0
    Total: ₹9,998
    
  PICKUP POINT:
    Select from dropdown
    (Miyapur Metro, LB Nagar, etc.)
    
  [Proceed to Book →]
  [Enquire on WhatsApp]
  
  INCLUDES badges:
    ✅ AC Transport
    ✅ Accommodation
    ✅ Darshan tickets
    ✅ Breakfast
    ✅ Local guide

RIGHT:
  Photo gallery (4 temple photos)
  Package name + duration + rating
  Day-wise itinerary (expandable)
  Temples covered (with descriptions)
  Inclusions / Exclusions
  Pickup points + timings
  Reviews
  Similar packages
```

---

## PASTE INTO CLAUDE CODE

```
Repo: C:\dev\walktotemple\apps\wtt-web\

Install: pnpm add framer-motion

Build the WalkToTemple rich landing page.
Make it as rich as CrunchBasket but spiritual/devotional.

NAVBAR (3 rows):
  Row 1: Top bar (saffron bg) — delivery + support info
  Row 2: Logo + Search (40%) + Auth buttons
  Row 3: Category nav (centered, cream bg #FFF8F0)
    Full dropdowns for:
    Pilgrimages ▾ (by duration + group type)
    By Deity ▾ (9 deities)
    By Region ▾ (11 regions, 2 columns)
    Jyotirlingas, Char Dham, Shakti Peethas, Divya Desams
    Festival Pilgrimages ▾ (6 festivals)
    Village Experiences
    Plan My Trip

LANDING PAGE (14 sections):
  1. Hero carousel (5 slides, dark/saffron themes)
  2. Quick category pills (horizontal scroll)
  3. Featured packages carousel (← → arrows)
  4. By Deity (interactive tabs, 8 deities)
  5. By Region (left: map, right: region cards)
  6. Jyotirlingas strip (dark bg, infinite scroll)
  7. How it works (3 steps)
  8. Festival pilgrimages carousel
  9. Upcoming departures (with seat count)
  10. Trust signals (4 cards)
  11. Pilgrim reviews
  12. Village experiences teaser
  13. Final CTA
  14. Footer

PACKAGE DETAIL PAGE /packages/[slug]:
  Two-panel: LEFT booking sidebar + RIGHT details
  Booking sidebar: date selection, persons, 
                   pickup point, price breakdown
  Details: gallery, itinerary, temples, reviews

TEMPLE/PACKAGE DATA (use this real data):

TELANGANA PACKAGES:
  yadadri-day-trip:
    Yadadri (Lakshmi Narasimha Swamy)
    1 day, ₹899, deity: Vishnu
    
  srisailam-2day:
    Srisailam (Mallikarjuna + Bhramaramba)
    2 days, ₹2,499, deity: Shiva + Devi
    
  bhadrachalam-2day:
    Bhadrachalam (Sita Ramachandra Swamy)
    2 days, ₹2,199, deity: Rama
    
  kaleshwaram-1day:
    Kaleshwaram (Triveni Sangamam)
    1 day, ₹999, deity: Shiva
    
  warangal-temples-1day:
    Thousand Pillar Temple + Bhadrakali + Ramappa
    1 day, ₹799, deity: Shiva + Devi

ANDHRA PACKAGES:
  tirupati-3day:
    Tirumala + Kanipakam + Srikalahasti
    3 days, ₹4,999, deity: Vishnu + Ganesha + Shiva
    
  vijayawada-2day:
    Kanaka Durga + Amaralingeswara
    2 days, ₹2,799, deity: Devi + Shiva
    
  ahobilam-2day:
    9 forms of Narasimha Swamy
    2 days, ₹3,199, deity: Vishnu
    
  annavaram-1day:
    Satyanarayana Swamy
    1 day, ₹1,199, deity: Vishnu
    
  basara-1day:
    Gnana Saraswati Temple
    1 day, ₹899, deity: Devi

DESIGN:
  Primary: #FF9933 (saffron)
  Secondary: #FFD700 (gold)  
  Maroon: #8B0000 (deep)
  Background: #FFF8F0 (warm cream)
  Dark sections: #1E293B
  
  Font: Crimson Text or Playfair Display
        for headings (classical, devotional)
  Body: Plus Jakarta Sans
  
  Carousel arrows: left side ← and right side →
  All text in sections: center aligned
  Cards: white with warm shadow

pnpm run dev → verify at http://localhost:3003
pnpm run build → 0 errors
```
