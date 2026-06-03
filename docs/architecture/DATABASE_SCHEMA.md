# Database Schema — Walk to Temple

> Last updated: 2026-06-02
> Source of truth: `packages/contracts/src/schema.ts`

## Overview
9 tables, Drizzle ORM, PostgreSQL (Neon). No TypeORM.

## Tables

| Table | Description |
|-------|-------------|
| `users` | Customer accounts (email + mobile, roles: customer/admin) |
| `packages` | Pilgrimage packages (EN + TE names, pricing, temples) |
| `itinerary_days` | Per-day breakdown of each package |
| `departure_dates` | Scheduled trips with seat counts |
| `pickup_points` | City pickup locations per package |
| `bookings` | Customer booking records (linked to departure) |
| `travellers` | Individual traveller details per booking |
| `reviews` | Post-trip ratings (1 per booking, verified) |
| `enquiries` | Pre-booking enquiries (no account needed) |

## Key Relationships

```
packages --> itinerary_days  (1:many, ordered by day_number)
packages --> departure_dates (1:many)
packages --> pickup_points   (1:many)
packages --> reviews         (1:many via bookings)

bookings --> packages        (many:1)
bookings --> departure_dates (many:1)
bookings --> travellers      (1:many)
bookings --> reviews         (1:1, unique)
bookings --> users           (many:1)
```

## Booking Status Flow

```
pending -> confirmed (payment captured)
pending -> cancelled (user/admin cancel)
confirmed -> cancelled (eligible window)
```

## Notes
- All PKs: UUID (defaultRandom)
- Prices stored as DECIMAL(10,2) strings — parse before arithmetic
- `packages.inclusions/exclusions/highlights/templesCovered/images` are TEXT[] arrays
- `packages.isActive=false` is a soft delete
