# Package Management — Walk to Temple

> Last updated: 2026-06-02

## Package Manager
**pnpm** (workspace monorepo)

## Monorepo Layout
```
walktotemple/
  apps/
    wtt-web/       Next.js 14, port 3003, customer app
    wtt-platform/  NestJS 10, port 4008, REST API
    wtt-admin/     Next.js 14, port 3004, admin panel
  packages/
    auth/          JWT guards + decorators (shared NestJS)
    contracts/     Drizzle schema + DB client (shared)
```

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^14.2 | Customer + admin frontends |
| @nestjs/core | ^10 | Backend framework |
| drizzle-orm | ^0.30 | ORM |
| @neondatabase/serverless | ^0.9 | Neon DB driver |
| drizzle-kit | ^0.21 | Migrations |
| @nestjs/jwt | ^10 | JWT auth |
| passport-jwt | ^4 | JWT strategy |
| bcryptjs | ^2.4 | Password hashing |
| tailwindcss | ^3.4 | Styling |
| turbo | ^2 | Monorepo task runner |

## Scripts (from root)

```bash
pnpm install             # install all workspaces
pnpm dev                 # start all 3 apps in dev mode
pnpm build               # build all 3 apps
pnpm db:generate         # generate Drizzle migrations
pnpm db:migrate          # run migrations
pnpm db:push             # push schema directly (dev only)
```

## Dev Ports
- wtt-web: http://localhost:3003
- wtt-platform: http://localhost:4008
- wtt-admin: http://localhost:3004
