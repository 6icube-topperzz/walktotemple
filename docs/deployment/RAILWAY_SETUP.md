# Railway Setup â€” Walk to Temple

> Last updated: 2026-06-02

## Services
_List Railway services here (web, worker, db, redis...)._

## Deploy Steps
1. Push to main triggers auto-deploy.
2. Railway builds via Nixpacks / Dockerfile.
3. Health check at /health.

## Custom Domains
_Add custom domain config here._

## Notes
- Set all env vars before first deploy.
- Railway PostgreSQL URL is injected automatically as DATABASE_URL.