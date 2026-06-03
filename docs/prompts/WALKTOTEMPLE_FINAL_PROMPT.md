# WalkToTemple — Complete Scaffold Prompt
## Repo: C:\dev\walktotemple\
## Includes: Public pages + Protected dashboards + Admin

---

## CONTEXT

WalkToTemple MVP:
  5 pilgrimage packages in Telangana
  Package booking + payment
  Admin manages all content (no hardcoded data)
  Customer books pilgrimages
  
Local setup:
  PORT=4008 (platform)
  DATABASE_URL=<neon-walktotemple-poc-url>?sslmode=require
  NODE_ENV=development
  AUTH_SERVICE_URL=http://localhost:4001
  NOTIFY_SERVICE_URL=http://localhost:4002
  PAYMENTS_SERVICE_URL=http://localhost:4003
  Use Drizzle (NOT TypeORM)

---

## REPO STRUCTURE

```
walktotemple/
  apps/
    wtt-web/           (Next.js — customer app, port 3003)
    wtt-platform/      (NestJS — backend, port 4008)
    wtt-admin/         (Next.js — admin panel, port 3004)
  packages/
    auth/
    contracts/
  docs/
    architecture/
    prompts/
    constitution/
    session-registry/
    deployment/
    api/
```

---

## DATABASE SCHEMA (Drizzle)

```typescript
// packages/contracts/src/schema.ts

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  mobile: varchar('mobile', { length: 15 }).unique().notNull(),
  mobileVerified: boolean('mobile_verified').default(false),
  passwordHash: varchar('password_hash', { length: 255 }),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  role: varchar('role', { length: 20 }).default('customer'),
  preferredLanguage: varchar('preferred_language', { length: 10 }).default('te'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const packages = pgTable('packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 200 }).unique().notNull(),
  nameEn: varchar('name_en', { length: 300 }).notNull(),
  nameTe: varchar('name_te', { length: 300 }),
  nameHi: varchar('name_hi', { length: 300 }),
  descriptionEn: text('description_en').notNull(),
  descriptionTe: text('description_te'),
  region: varchar('region', { length: 100 }).notNull(),
  startCity: varchar('start_city', { length: 100 }).notNull(),
  durationDays: integer('duration_days').notNull(),
  durationNights: integer('duration_nights').notNull(),
  pricePerPerson: decimal('price_per_person', { precision: 10, scale: 2 }).notNull(),
  priceChild: decimal('price_child', { precision: 10, scale: 2 }),
  minPersons: integer('min_persons').default(1),
  maxPersons: integer('max_persons').default(50),
  inclusions: text('inclusions').array(),
  exclusions: text('exclusions').array(),
  highlights: text('highlights').array(),
  templesCovered: text('temples_covered').array(),
  coverImageUrl: varchar('cover_image_url', { length: 500 }),
  images: text('images').array(),
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  totalBookings: integer('total_bookings').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const itineraryDays = pgTable('itinerary_days', {
  id: uuid('id').primaryKey().defaultRandom(),
  packageId: uuid('package_id').references(() => packages.id),
  dayNumber: integer('day_number').notNull(),
  titleEn: varchar('title_en', { length: 300 }).notNull(),
  titleTe: varchar('title_te', { length: 300 }),
  descriptionEn: text('description_en').notNull(),
  descriptionTe: text('description_te'),
  activities: text('activities').array(),
  breakfast: boolean('breakfast').default(false),
  lunch: boolean('lunch').default(false),
  dinner: boolean('dinner').default(false),
  overnightStay: varchar('overnight_stay', { length: 200 }),
  templesVisited: text('temples_visited').array(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const departureDates = pgTable('departure_dates', {
  id: uuid('id').primaryKey().defaultRandom(),
  packageId: uuid('package_id').references(() => packages.id),
  departureDate: date('departure_date').notNull(),
  returnDate: date('return_date').notNull(),
  totalSeats: integer('total_seats').notNull(),
  bookedSeats: integer('booked_seats').default(0),
  priceOverride: decimal('price_override', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 20 }).default('available'),
  notes: varchar('notes', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const pickupPoints = pgTable('pickup_points', {
  id: uuid('id').primaryKey().defaultRandom(),
  packageId: uuid('package_id').references(() => packages.id),
  city: varchar('city', { length: 100 }).notNull(),
  locationName: varchar('location_name', { length: 200 }).notNull(),
  pickupTime: time('pickup_time').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingNumber: varchar('booking_number', { length: 20 }).unique().notNull(),
  userId: uuid('user_id').references(() => users.id),
  packageId: uuid('package_id').references(() => packages.id),
  departureDateId: uuid('departure_date_id').references(() => departureDates.id),
  adults: integer('adults').notNull().default(1),
  children: integer('children').default(0),
  pricePerAdult: decimal('price_per_adult', { precision: 10, scale: 2 }).notNull(),
  pricePerChild: decimal('price_per_child', { precision: 10, scale: 2 }).default('0'),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxes: decimal('taxes', { precision: 10, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending'),
  paymentStatus: varchar('payment_status', { length: 20 }).default('pending'),
  razorpayOrderId: varchar('razorpay_order_id', { length: 100 }),
  razorpayPaymentId: varchar('razorpay_payment_id', { length: 100 }),
  contactName: varchar('contact_name', { length: 200 }).notNull(),
  contactMobile: varchar('contact_mobile', { length: 15 }).notNull(),
  contactEmail: varchar('contact_email', { length: 255 }),
  pickupPoint: varchar('pickup_point', { length: 200 }),
  specialRequirements: text('special_requirements'),
  confirmedAt: timestamp('confirmed_at'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const travellers = pgTable('travellers', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingId: uuid('booking_id').references(() => bookings.id),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  age: integer('age').notNull(),
  gender: varchar('gender', { length: 10 }),
  idType: varchar('id_type', { length: 20 }),
  idNumber: varchar('id_number', { length: 50 }),
  isLead: boolean('is_lead').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingId: uuid('booking_id').references(() => bookings.id).unique(),
  userId: uuid('user_id').references(() => users.id),
  packageId: uuid('package_id').references(() => packages.id),
  rating: integer('rating').notNull(),
  title: varchar('title', { length: 200 }),
  reviewText: text('review_text'),
  images: text('images').array(),
  isVerified: boolean('is_verified').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export const enquiries = pgTable('enquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  packageId: uuid('package_id').references(() => packages.id),
  name: varchar('name', { length: 200 }).notNull(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  email: varchar('email', { length: 255 }),
  persons: integer('persons').default(1),
  preferredDate: date('preferred_date'),
  message: text('message'),
  status: varchar('status', { length: 20 }).default('new'),
  createdAt: timestamp('created_at').defaultNow(),
})
```

---

## BACKEND — wtt-platform

```
NestJS app on port 4008.
Copy auth from packages/auth.
Use Drizzle for all DB operations.

Modules to create:
  src/packages/     → package CRUD
  src/bookings/     → booking lifecycle
  src/departures/   → departure management
  src/pickup/       → pickup points
  src/travellers/   → traveller details
  src/reviews/      → ratings
  src/enquiries/    → pre-booking enquiries
  src/admin/        → admin operations
  src/health/       → health check
  src/auth/         → import from packages/auth

KEY API ENDPOINTS:

PUBLIC:
GET  /api/v1/packages
GET  /api/v1/packages/featured
GET  /api/v1/packages/:slug
GET  /api/v1/packages/:slug/itinerary
GET  /api/v1/packages/:slug/departures
GET  /api/v1/packages/:slug/pickup-points
GET  /api/v1/packages/:slug/reviews
POST /api/v1/enquiries

AUTH:
POST /api/v1/auth/register
POST /api/v1/auth/verify-email
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me

PROTECTED:
POST /api/v1/bookings/initiate
POST /api/v1/bookings/confirm
GET  /api/v1/bookings (my bookings)
GET  /api/v1/bookings/:id
PUT  /api/v1/bookings/:id/cancel
POST /api/v1/reviews

ADMIN (protected, admin role):
GET  /api/v1/admin/packages
POST /api/v1/admin/packages
PUT  /api/v1/admin/packages/:id
DELETE /api/v1/admin/packages/:id
POST /api/v1/admin/packages/:id/itinerary
POST /api/v1/admin/departures
PUT  /api/v1/admin/departures/:id
GET  /api/v1/admin/bookings
GET  /api/v1/admin/enquiries
GET  /api/v1/admin/stats

HEALTH:
GET  /api/v1/health
```

---

## FRONTEND — wtt-web (Customer App)

```
Next.js on port 3003
Telugu default language
Saffron + gold design theme

PUBLIC PAGES:

app/(public)/
  page.tsx                    → Landing page
  packages/page.tsx           → Browse packages
  packages/[slug]/page.tsx    → Package detail
  auth/login/page.tsx
  auth/register/page.tsx
  auth/verify-email/page.tsx  → OTP entry screen

LANDING PAGE:
  Hero (dark #1E293B):
    "పవిత్ర యాత్రలు — సులభంగా"
    (Sacred journeys — made simple)
    English: "Pilgrimage Made Simple"
    CTA: [Browse Packages] [Login]
  
  Featured packages (4 cards)
  Browse by region: Telangana | Andhra Pradesh
  Browse by duration: 1 Day | 2 Days | 3+ Days
  Why WalkToTemple (trust signals)
  Upcoming departures (filling fast)
  Footer

PACKAGE LISTING PAGE:
  Filter: Region | Duration | Price range
  Sort: Newest | Price low-high | Rating
  Package cards grid

PACKAGE DETAIL PAGE:
  Cover image gallery
  Name + duration + price per person
  Highlights (temples covered)
  Upcoming departures with seats
  [Book Now] CTA
  Day-wise itinerary (expandable)
  Inclusions / Exclusions
  Pickup points + timings
  Reviews section
  Enquiry form

PROTECTED PAGES:

app/(protected)/
  booking/[slug]/page.tsx     → Booking form
  booking/payment/page.tsx    → Razorpay payment
  booking/confirm/page.tsx    → Confirmation
  my-bookings/page.tsx        → My bookings list
  my-bookings/[id]/page.tsx   → Booking detail
  profile/page.tsx            → Customer profile

BOOKING FORM (multi-step):
  Step 1: Select departure + persons + accommodation
  Step 2: Traveller details (name, age, ID)
  Step 3: Pickup point selection
  Step 4: Review + Pay (Razorpay)
  Step 5: Confirmation + WhatsApp notification

MY BOOKINGS PAGE:
  List of all bookings
  Status badge: Confirmed / Pending / Cancelled
  Each booking:
    Package name + date
    Booking number
    Total amount
    [View Details] [Cancel] (if eligible)

BOOKING DETAIL PAGE:
  Full booking info
  Traveller list
  Pickup point + time
  Contact details
  Payment receipt
  [Download PDF] (future)
  [Write Review] (after trip)
```

---

## ADMIN APP — wtt-admin

```
Next.js on port 3004
Admin login required
Simple, functional UI

PAGES:

app/
  page.tsx (redirect to /dashboard)
  auth/login/page.tsx

app/dashboard/
  page.tsx                    → Stats overview
  packages/page.tsx           → Package list
  packages/add/page.tsx       → Add new package
  packages/[id]/page.tsx      → Edit package
  packages/[id]/itinerary/    → Manage itinerary
  packages/[id]/departures/   → Manage dates + seats
  packages/[id]/pickups/      → Pickup points
  bookings/page.tsx           → All bookings
  bookings/[id]/page.tsx      → Booking detail
  enquiries/page.tsx          → Enquiries
  reviews/page.tsx            → Moderate reviews

DASHBOARD STATS:
  Total bookings this month
  Revenue this month
  Upcoming trips (next 7 days)
  Seats available across all trips
  Pending enquiries

ADD PACKAGE FORM:
  Package details (name EN + TE, description, region)
  Duration + pricing
  Inclusions / Exclusions (tag input)
  Highlights + temples covered (tag input)
  Cover image upload (Cloudflare R2)
  Multiple images upload

ADD ITINERARY:
  Per day: title + description + activities
  Meals: breakfast/lunch/dinner checkboxes
  Overnight stay
  Temples visited today

MANAGE DEPARTURES:
  Add departure date + return date
  Set total seats
  Price override (optional)
  Status: available/filling_fast/full/cancelled

BOOKINGS TABLE:
  All bookings with filters
  Status: pending/confirmed/cancelled
  Export to CSV (future)
```

---

## DESIGN STANDARDS

```
wtt-web (customer):
  Primary: #FF9933 (saffron)
  Secondary: #FFD700 (gold)
  Background: white
  Hero: #1E293B (dark slate)
  Font: warm, readable
  Feel: devotional, trustworthy, simple

wtt-admin:
  Clean minimal admin UI
  Primary: #6366F1 (indigo)
  White background
  Simple tables + forms
```

---

## DONE CONDITIONS

```
[ ] Drizzle schema created (9 tables)
[ ] Migrations run on Neon poc
[ ] wtt-platform starts on port 4008
[ ] All API endpoints working
[ ] wtt-web starts on port 3003
[ ] Landing page loads (Telugu + English)
[ ] Package listing + detail pages
[ ] Booking flow (4 steps)
[ ] My Bookings page
[ ] wtt-admin starts on port 3004
[ ] Admin can add package + itinerary
[ ] Admin can manage departures
[ ] Admin bookings table
[ ] Health endpoint → { status: 'healthy' }
[ ] pnpm run build → 0 errors (all 3 apps)

FIRST DEMO FLOW:
  Admin: Add "Yadadri Day Trip" package
         Add itinerary (1 day)
         Add departure date + 20 seats
  Customer: Browse → see package
            Book → pay (Razorpay test)
            Receive WhatsApp confirmation
            View in My Bookings
```

---

## PASTE INTO CLAUDE CODE

```
Working directory: C:\dev\walktotemple\
(repo initialized with all branches)

WalkToTemple MVP — pilgrimage package booking.

Setup:
  wtt-platform: port 4008, Neon poc DB, Drizzle
  wtt-web: port 3003, customer booking app
  wtt-admin: port 3004, admin content management

CRITICAL: Use Drizzle NOT TypeORM
CRITICAL: Copy .env.example → .env, set Neon poc URL
CRITICAL: All content managed via admin (no hardcoded data)
CRITICAL: Add docs/ folder structure

Build in order:
  1. Drizzle schema + migrations
  2. wtt-platform NestJS backend
  3. wtt-web public pages (landing + packages)
  4. wtt-web protected pages (booking + my-bookings)
  5. wtt-admin dashboard

Design:
  wtt-web: saffron (#FF9933) + gold (#FFD700) theme
  Telugu as default language option
  Dark hero → white content sections
  Simple, devotional, trustworthy feel

pnpm install → 0 errors
pnpm run build (all 3 apps) → 0 errors
GET /api/v1/health → { status: 'healthy' }
```
