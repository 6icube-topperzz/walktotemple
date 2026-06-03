# Product Standards — Walk to Temple

> Frozen decisions. Do NOT change without team sign-off.

## Product
**Name:** Walk to Temple
**Description:** Pilgrimage package booking platform — Telangana & Andhra Pradesh

## Frozen Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Drizzle ORM (NOT TypeORM) | Lightweight, type-safe, works with Neon serverless |
| 2 | Neon PostgreSQL | Serverless, generous free tier, Railway-compatible |
| 3 | pnpm workspaces monorepo | Single repo for all 3 apps + shared packages |
| 4 | Next.js 14 App Router | Server components for public pages (SEO), client for booking flow |
| 5 | NestJS REST API | Structured, modular, well-suited for booking logic |
| 6 | JWT auth (no sessions) | Stateless, easy to share across apps |
| 7 | Razorpay payments | Best UPI/card support for Indian market |
| 8 | All content admin-managed | No hardcoded data — everything in DB |
| 9 | Telugu as default language | Primary audience: Telangana pilgrims |
| 10 | Railway hosting | Simple deploy, auto-provisions Postgres if needed |

## Tech Stack
- **Runtime:** Node.js >= 20
- **Backend:** NestJS 10 (wtt-platform, port 4008)
- **Frontend:** Next.js 14 App Router
- **Database:** PostgreSQL via Neon (Drizzle ORM)
- **Auth:** JWT (passport-jwt, @nestjs/jwt)
- **Payments:** Razorpay
- **Hosting:** Railway
- **CSS:** Tailwind CSS

## Design System (wtt-web)
- Primary: `#FF9933` (saffron)
- Accent: `#FFD700` (gold)
- Hero: `#1E293B` (dark slate)
- Feel: devotional, trustworthy, warm

## Design System (wtt-admin)
- Primary: `#6366F1` (indigo)
- Clean minimal admin tables + forms

## Naming Conventions
- Routes: kebab-case
- DB columns: snake_case
- API responses: camelCase
- TypeScript interfaces: PascalCase
- File names: kebab-case
