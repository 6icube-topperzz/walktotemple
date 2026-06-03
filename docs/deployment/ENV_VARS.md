# Environment Variables â€” Walk to Temple

> Do NOT commit real values. Use Railway / .env.local only.

## Required

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | Postgres connection string | postgresql://...@.../db |
| JWT_SECRET | Auth signing secret | 64-char random string |
| NODE_ENV | Runtime environment | production |

## Optional

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | HTTP listen port | 3000 |
| LOG_LEVEL | Winston log level | info |

## Notes
_Add project-specific vars below._