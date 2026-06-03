# Session 01 — WalkToTemple Complete Scaffold

**Date:** 2026-06-02
**Project:** Walk to Temple (Pilgrimage package booking)

---

## Context

WalkToTemple MVP:
- 5 pilgrimage packages in Telangana
- Package booking + payment
- Admin manages all content (no hardcoded data)
- Customer books pilgrimages

Local setup:
- PORT=4008 (platform)
- DATABASE_URL=<neon-walktotemple-poc-url>?sslmode=require
- NODE_ENV=development
- AUTH_SERVICE_URL=http://localhost:4001
- NOTIFY_SERVICE_URL=http://localhost:4002
- PAYMENTS_SERVICE_URL=http://localhost:4003
- Use Drizzle (NOT TypeORM)

---

## Repo Structure

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

## Database Schema (Drizzle)

9 tables: users, packages, itinerary_days, departure_dates, pickup_points, bookings, travellers, reviews, enquiries

---

## Build Order

1. Drizzle schema + migrations
2. wtt-platform NestJS backend
3. wtt-web public pages (landing + packages)
4. wtt-web protected pages (booking + my-bookings)
5. wtt-admin dashboard

---

## Done Conditions

- [ ] Drizzle schema created (9 tables)
- [ ] Migrations run on Neon poc
- [ ] wtt-platform starts on port 4008
- [ ] All API endpoints working
- [ ] wtt-web starts on port 3003
- [ ] Landing page loads (Telugu + English)
- [ ] Package listing + detail pages
- [ ] Booking flow (4 steps)
- [ ] My Bookings page
- [ ] wtt-admin starts on port 3004
- [ ] Admin can add package + itinerary
- [ ] Admin can manage departures
- [ ] Admin bookings table
- [ ] Health endpoint -> { status: 'healthy' }
- [ ] pnpm run build -> 0 errors (all 3 apps)

---

## First Demo Flow

Admin: Add "Yadadri Day Trip" package -> Add itinerary (1 day) -> Add departure date + 20 seats
Customer: Browse -> see package -> Book -> pay (Razorpay test) -> Receive WhatsApp confirmation -> View in My Bookings

---

## Full Scaffold Prompt

Working directory: C:\dev\walktotemple\

WalkToTemple MVP — pilgrimage package booking.

Setup:
  wtt-platform: port 4008, Neon poc DB, Drizzle
  wtt-web: port 3003, customer booking app
  wtt-admin: port 3004, admin content management

CRITICAL: Use Drizzle NOT TypeORM
CRITICAL: Copy .env.example -> .env, set Neon poc URL
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
  Dark hero -> white content sections
  Simple, devotional, trustworthy feel

pnpm install -> 0 errors
pnpm run build (all 3 apps) -> 0 errors
GET /api/v1/health -> { status: 'healthy' }
