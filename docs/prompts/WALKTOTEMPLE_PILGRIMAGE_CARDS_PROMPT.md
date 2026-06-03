# WalkToTemple — Pilgrimage Card Design + Itinerary Page
## Repo: C:\dev\walktotemple\apps\wtt-web\
## Add to existing landing page + new routes

---

## PILGRIMAGE CARD DESIGN — DYNAMIC SIZING

```
Card size scales with duration + temple count:

1 DAY  (1-2 temples):  SMALL card   — compact
2 DAYS (2-4 temples):  MEDIUM card  — standard
3 DAYS (4-6 temples):  LARGE card   — expanded
4+ DAYS (6+ temples):  XL card      — full feature
```

---

## CARD COMPONENTS

### SMALL CARD (1 Day, 1-2 temples)

```
Width: standard grid card
Height: ~280px

┌──────────────────────────────────┐
│ [Temple illustration/icon]       │
│ ● 1 Day  ● 1 Temple             │
│                                  │
│ Yadadri Day Trip                 │
│ Lakshmi Narasimha Swamy         │
│ ★★★★★ 4.8 · 340 pilgrims       │
│                                  │
│ 🚌 AC Bus  📍 Yadadri           │
│                                  │
│ From ₹899/person                 │
│ Next: 15 Jun · 18 seats left    │
│                                  │
│ [View] ──────────── [Book Now]   │
└──────────────────────────────────┘
```

### MEDIUM CARD (2 Days, 2-4 temples)

```
Width: standard grid card
Height: ~360px

┌──────────────────────────────────┐
│ [Larger temple illustration]     │
│ ● 2 Days · 1 Night  ● 3 Temples │
│                                  │
│ Tirupati Weekend Package         │
│ Tirumala · Kanipakam · Srikalahasti│
│ ★★★★★ 4.9 · 890 pilgrims       │
│                                  │
│ DAY 1: Tirumala darshan          │
│ DAY 2: Kanipakam + Srikalahasti  │
│                                  │
│ 🚌 AC Bus  🏨 Hotel  🎫 Darshan  │
│                                  │
│ From ₹3,499/person               │
│ Next: 20 Jun · 12 seats left    │
│                                  │
│ [View Itinerary] [Book Now]      │
└──────────────────────────────────┘
```

### LARGE CARD (3 Days, 4-6 temples)

```
Width: spans 2 grid columns (wider)
Height: ~420px

┌──────────────────────────────────────────────┐
│ [Wide temple photo banner]                   │
│ 🔥 Popular  ● 3 Days · 2 Nights  ● 5 Temples│
│                                              │
│ Tirupati 3-Day Complete Package              │
│                                              │
│ TEMPLES COVERED:                             │
│ 🛕 Tirumala  🛕 Kanipakam                   │
│ 🛕 Srikalahasti  🛕 Padmavathi              │
│ 🛕 Kalahasti                                 │
│                                              │
│ QUICK ITINERARY:                             │
│ Day 1 → Tirumala darshan + overnight         │
│ Day 2 → Kanipakam + Srikalahasti            │
│ Day 3 → Padmavathi + return                  │
│                                              │
│ ✅ AC Bus  ✅ 2-night hotel                  │
│ ✅ All darshan tickets  ✅ Breakfast          │
│                                              │
│ From ₹4,999/person                          │
│ Next: 22 Jun · 8 seats left 🔥              │
│                                              │
│ [View Full Itinerary →]    [Book Now]        │
└──────────────────────────────────────────────┘
```

### XL CARD (4+ Days, 6+ temples) — TELANGANA EXAMPLE

```
Width: full width OR spans 3 columns
Height: ~520px

┌──────────────────────────────────────────────────────┐
│ [Full-width collage: Sammakka · Kaleshwaram ·        │
│  Kotilingalu · Dharmapuri · Kondagattu]              │
│                                                      │
│ ⭐ FEATURED  🔥 BESTSELLER  4 Days · 3 Nights       │
│                                                      │
│ Telangana Sacred Circuit                             │
│ "The Complete Telangana Pilgrimage"                  │
│                                                      │
│ 7 SACRED TEMPLES:                                    │
│ 🛕 Sammakka Sarakka (Medaram)                       │
│ 🛕 Kaleshwaram (Triveni Sangamam)                   │
│ 🛕 Kotilingalu (1 Crore Shivalingas)               │
│ 🛕 Dharmapuri (Narasimha Swamy)                     │
│ 🛕 Kondagattu (Anjaneya Swamy)                      │
│ 🛕 Vemulawada (Raja Rajeshwara Swamy)               │
│ 🛕 Komuravelli Mallanna (Forest deity)              │
│                                                      │
│ 4-DAY OVERVIEW:                                      │
│ Day 1 → Sammakka Sarakka + Kotilingalu              │
│ Day 2 → Kaleshwaram + Dharmapuri                    │
│ Day 3 → Kondagattu + Vemulawada                     │
│ Day 4 → Komuravelli Mallanna + Return               │
│                                                      │
│ INCLUDES:                                            │
│ ✅ AC Sleeper Bus  ✅ 3-night accommodation          │
│ ✅ All darshan tickets  ✅ Daily breakfast           │
│ ✅ Local guide  ✅ WhatsApp updates                  │
│                                                      │
│ From ₹6,999/person                                  │
│ Next: 28 Jun · 6 seats left 🔥                      │
│                                                      │
│ [View Full Day-wise Itinerary →]    [Book Now]      │
└──────────────────────────────────────────────────────┘
```

---

## CARD SIZE LOGIC (TypeScript)

```tsx
// Determine card size based on duration + temples

type CardSize = 'sm' | 'md' | 'lg' | 'xl'

function getCardSize(durationDays: number, templeCount: number): CardSize {
  if (durationDays === 1 && templeCount <= 2) return 'sm'
  if (durationDays <= 2 && templeCount <= 4) return 'md'
  if (durationDays === 3 || templeCount <= 6) return 'lg'
  return 'xl'  // 4+ days or 6+ temples
}

// Grid column span based on size
const colSpan = {
  sm: 'col-span-1',
  md: 'col-span-1',
  lg: 'col-span-2',
  xl: 'col-span-3',
}

// Card height based on size
const cardHeight = {
  sm: 'h-[280px]',
  md: 'h-[360px]',
  lg: 'h-[420px]',
  xl: 'h-auto',  // flexible for many temples
}
```

---

## GRID LAYOUT

```tsx
// Mixed card sizes in a responsive grid
// Small + medium cards share rows
// Large cards span 2 columns
// XL cards span full width

<div className="grid grid-cols-3 gap-6">
  {packages.map(pkg => (
    <PilgrimageCard
      key={pkg.id}
      package={pkg}
      size={getCardSize(pkg.durationDays, pkg.temples.length)}
    />
  ))}
</div>

// Example grid layout:
// [SM: Yadadri 1D] [SM: Warangal 1D] [SM: Kondagattu 1D]
// [MD: Srisailam 2D          ] [MD: Vijayawada 2D    ]
// [LG: Tirupati 3D                              ] [SM]
// [XL: Telangana Circuit 4D — full width            ]
```

---

## PACKAGE DETAIL PAGE — DAY-WISE ITINERARY

### Route: /packages/[slug]

```tsx
// Example: /packages/telangana-sacred-circuit-4day

PAGE LAYOUT:
  LEFT (35%): Booking sidebar (sticky)
  RIGHT (65%): Full itinerary + details

BOOKING SIDEBAR:
  Package name
  Duration badge
  Price per person
  
  SELECT DEPARTURE DATE:
    Calendar or date cards
    Next 4 available dates shown
    Seats left indicator per date
    
  TRAVELLER COUNT:
    Adults [−] 2 [+]
    Children (5-12) [−] 0 [+]
    Senior (60+) [−] 0 [+]
    
  PRICE BREAKDOWN:
    2 Adults × ₹6,999 = ₹13,998
    GST (5%): ₹700
    Total: ₹14,698
    
  PICKUP POINT:
    ○ Miyapur Metro (5:00 AM)
    ○ LB Nagar (5:30 AM)
    ○ Uppal (5:45 AM)
    ○ Secunderabad (6:00 AM)
    
  INCLUDES:
    ✅ AC Sleeper Bus
    ✅ 3-night accommodation
    ✅ All darshan tickets
    ✅ Daily breakfast
    ✅ Local guide
    ✅ WhatsApp support
    
  [Book This Trip →]
  [Enquire on WhatsApp 📱]

RIGHT SECTION — FULL DETAILS:

HEADER:
  Photo gallery (5 temple photos, carousel)
  
  Package title: "Telangana Sacred Circuit"
  Subtitle: "4 Days · 3 Nights · 7 Sacred Temples"
  
  STATS ROW:
    ★★★★★ 4.9 · 124 pilgrims
    📅 4 Days  🛕 7 Temples
    🚌 AC Bus  🏨 3 Nights

TEMPLES COVERED (visual chips):
  🛕 Sammakka Sarakka
  🛕 Kaleshwaram
  🛕 Kotilingalu
  🛕 Dharmapuri
  🛕 Kondagattu
  🛕 Vemulawada
  🛕 Komuravelli Mallanna

DAY-WISE ITINERARY (expandable, Framer Motion):

  DAY 1 — Sammakka Sarakka + Kotilingalu
  ┌─────────────────────────────────────────────────┐
  │ 📅 Day 1                                        │
  │ "Journey begins. Two powerful shrines."         │
  ├─────────────────────────────────────────────────┤
  │ 05:00 AM  Pickup from Hyderabad                 │
  │           (Miyapur → LB Nagar → Uppal)         │
  │                                                 │
  │ 10:00 AM  🛕 Sammakka Sarakka Temple            │
  │           Medaram, Jayashankar Bhupalpally      │
  │           "The tribal goddess festival site.    │
  │            Sammakka and Sarakka are worshipped  │
  │            by millions. Sacred offering:        │
  │            Belamu (jaggery) as gold."           │
  │           ⏱ 2-3 hours                          │
  │                                                 │
  │ 01:30 PM  🍽️ Lunch (included)                  │
  │                                                 │
  │ 03:00 PM  🛕 Kotilingalu Temple                 │
  │           "1 crore Shivalingas on the banks     │
  │            of Godavari. Unique in India."       │
  │           ⏱ 1.5 hours                          │
  │                                                 │
  │ 07:00 PM  🏨 Check-in at Dharmapuri             │
  │           ☕ Dinner                             │
  │                                                 │
  │ 🌙 Overnight: Dharmapuri                       │
  └─────────────────────────────────────────────────┘

  DAY 2 — Kaleshwaram + Dharmapuri
  ┌─────────────────────────────────────────────────┐
  │ 📅 Day 2                                        │
  │ "Where rivers meet. Where Shiva dwells."        │
  ├─────────────────────────────────────────────────┤
  │ 07:00 AM  🌅 Breakfast at hotel                 │
  │                                                 │
  │ 08:30 AM  🛕 Kaleshwaram Temple                 │
  │           Dakshina Triveni Sangamam             │
  │           "Lord Shiva's abode where Godavari    │
  │            and Pranahita rivers meet.           │
  │            Sacred Karthika darshan."            │
  │           ⏱ 2 hours                            │
  │                                                 │
  │ 12:00 PM  🍽️ Lunch                             │
  │                                                 │
  │ 02:00 PM  🛕 Dharmapuri Narasimha Swamy         │
  │           "On the banks of Dakshina Vahini      │
  │            Godavari. Lord Vishnu as Narasimha.  │
  │            One of 9 Narasimha Kshetrams."       │
  │           ⏱ 1.5 hours                          │
  │                                                 │
  │ 07:00 PM  🏨 Return to hotel                    │
  │ 🌙 Overnight: Same location                    │
  └─────────────────────────────────────────────────┘

  DAY 3 — Kondagattu + Vemulawada
  ┌─────────────────────────────────────────────────┐
  │ 📅 Day 3                                        │
  │ "Hanuman's forest shrine. Shiva's royal abode." │
  ├─────────────────────────────────────────────────┤
  │ 07:00 AM  🌅 Breakfast                          │
  │                                                 │
  │ 09:00 AM  🛕 Kondagattu Anjaneya Swamy          │
  │           "Hanuman temple in forest hills.      │
  │            Thousands visit on Saturdays.        │
  │            Special lemon offerings."            │
  │           ⏱ 1.5 hours                          │
  │                                                 │
  │ 12:00 PM  🍽️ Lunch                             │
  │                                                 │
  │ 02:30 PM  🛕 Vemulawada Raja Rajeshwara         │
  │           "Known as Dakshina Kashi.             │
  │            Lord Shiva as Raja Rajeshwara.       │
  │            One of the most visited temples      │
  │            in Telangana."                       │
  │           ⏱ 2 hours                            │
  │                                                 │
  │ 07:00 PM  🏨 Check-in Karimnagar               │
  │ 🌙 Overnight: Karimnagar                       │
  └─────────────────────────────────────────────────┘

  DAY 4 — Komuravelli Mallanna + Return
  ┌─────────────────────────────────────────────────┐
  │ 📅 Day 4                                        │
  │ "The forest god. The journey home."             │
  ├─────────────────────────────────────────────────┤
  │ 07:00 AM  🌅 Breakfast + Checkout               │
  │                                                 │
  │ 09:00 AM  🛕 Komuravelli Mallanna Temple        │
  │           "Telangana's beloved forest deity.    │
  │            Medaram jatara connection.           │
  │            Sacred turmeric offerings."          │
  │           ⏱ 1.5 hours                          │
  │                                                 │
  │ 12:00 PM  🍽️ Lunch en route                    │
  │                                                 │
  │ 06:00 PM  🏠 Return to Hyderabad               │
  │           (Uppal → LB Nagar → Miyapur)         │
  └─────────────────────────────────────────────────┘

INCLUSIONS / EXCLUSIONS:
  ✅ Includes: AC bus, 3 nights hotel,
     daily breakfast, all darshan tickets,
     local guide at each temple, WhatsApp support
     
  ❌ Excludes: Lunch & dinner (except Day 1),
     personal donations, shopping,
     camera fees at temples

IMPORTANT NOTES:
  🙏 Dress code: Traditional attire preferred
  📱 Carry Aadhaar card for darshan booking
  🧳 Pack light — 1 bag per person
  ⏰ Be at pickup point 10 mins early

REVIEWS:
  3 review cards
  "Verified Pilgrim ✅"

SIMILAR PACKAGES:
  4 cards — other Telangana multi-day packages
```

---

## ADDITIONAL TELANGANA PACKAGES TO ADD

```
Based on real temples:

PACKAGE 1 — "Telangana Sacred Circuit 4D"
  Sammakka Sarakka + Kaleshwaram + 
  Kotilingalu + Dharmapuri + 
  Kondagattu + Vemulawada + Komuravelli
  4 Days · ₹6,999 · XL card

PACKAGE 2 — "Karimnagar Cluster 2D"
  Vemulawada + Kondagattu + Dharmapuri
  2 Days · ₹2,799 · MD card

PACKAGE 3 — "North Telangana Shiva Trail 3D"
  Kaleshwaram + Kotilingalu + 
  Basara Saraswati + Komuravelli
  3 Days · ₹4,499 · LG card

PACKAGE 4 — "Warangal Temples 1D"
  Thousand Pillar + Bhadrakali + Ramappa
  1 Day · ₹799 · SM card

PACKAGE 5 — "Hyderabad Day Yatra 1D"
  Yadadri + Yadagirigutta hills
  1 Day · ₹899 · SM card

PACKAGE 6 — "Godavari Sacred Trail 2D"
  Bhadrachalam + Parnasala + 
  Gundala (Godavari banks)
  2 Days · ₹2,499 · MD card
```

---

## PASTE INTO CLAUDE CODE

```
Repo: C:\dev\walktotemple\apps\wtt-web\

Build dynamic pilgrimage card system + itinerary pages.

PART 1 — PILGRIMAGE CARD COMPONENT:

Create: components/PilgrimageCard.tsx

Card sizes based on duration + temple count:
  SM (1D, ≤2 temples): compact 280px card
  MD (2D, ≤4 temples): standard 360px card  
  LG (3D, ≤6 temples): wide 420px, spans 2 cols
  XL (4D+, 6+ temples): full-width, flexible height

SM card shows: photo, duration, name, 1 temple, price, CTA
MD card shows: photo, duration, name, temples, day preview, price, CTA
LG card shows: banner, all temples listed, full day overview, price, CTA
XL card shows: collage, all temples with icons, 4-day overview, 
               all includes, price, seat urgency, full CTA

Grid: 3-column responsive
  SM + MD: col-span-1
  LG: col-span-2
  XL: col-span-3

PART 2 — PACKAGE DETAIL PAGE:

Route: /packages/[slug]

Two-panel layout:
  LEFT (35%, sticky): Booking sidebar
    Date selection (next 4 departures)
    Traveller count (adults/children/senior)
    Live price calculation
    Pickup point selection
    Includes badges
    [Book Now] + [WhatsApp Enquiry]
  
  RIGHT (65%): Full details
    Photo gallery (5 photos carousel)
    Package stats (days, temples, rating)
    Temple chips (all temples covered)
    
    DAY-WISE ITINERARY:
    Each day is an expandable accordion card:
      Day number + title + tagline
      Timeline of activities with times
      Temple descriptions (2-3 lines each)
      Meals included
      Overnight location
      
    Framer Motion: smooth expand/collapse
    Active day: highlighted, auto-expanded
    
    Inclusions / Exclusions
    Important notes (dress code, what to carry)
    Reviews section
    Similar packages

PART 3 — SEED DATA:

Create mock data for these Telangana packages:

1. telangana-sacred-circuit-4day (XL)
   7 temples: Sammakka Sarakka, Kaleshwaram,
   Kotilingalu, Dharmapuri, Kondagattu,
   Vemulawada, Komuravelli Mallanna
   4 days, ₹6,999

2. karimnagar-cluster-2day (MD)
   3 temples: Vemulawada, Kondagattu, Dharmapuri
   2 days, ₹2,799

3. north-telangana-shiva-3day (LG)
   4 temples: Kaleshwaram, Kotilingalu,
   Basara, Komuravelli
   3 days, ₹4,499

4. warangal-temples-1day (SM)
   3 temples: Thousand Pillar, Bhadrakali, Ramappa
   1 day, ₹799

5. yadadri-day-trip (SM)
   1 temple: Yadadri Narasimha
   1 day, ₹899

6. tirupati-3day (LG)
   5 temples: Tirumala, Kanipakam,
   Srikalahasti, Padmavathi, Kalahasti
   3 days, ₹4,999

Use this as /packages listing page grid.
Cards should be different sizes based on duration.
Clicking any card → /packages/[slug] detail page.

pnpm run dev → verify at http://localhost:3003
Grid shows mixed card sizes
Itinerary page shows day-wise expandable timeline
```
