# Database Setup Notes

## Prerequisites

- Node.js 20+
- Backend dependencies installed (`npm install` in `backend/`)

## Initial setup

```bash
cd backend
cp .env.example .env
```

Set in `.env`:
```
DATABASE_URL="file:./dev.db"
```

## Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Apply schema to SQLite (development)
npx prisma db push

# Seed users and sample tickets
npx prisma db seed

# Open Prisma Studio (optional GUI)
npx prisma studio
```

## Migrations

Migration files live in `backend/prisma/migrations/`. For development, `db push` is used. For production teams, prefer `prisma migrate deploy`.

## Test database

Integration tests use `file:./test.db` (set in `tests/setup-env.ts`). Created fresh per test run via `initializeTestDatabase()`.

## Troubleshooting

| Issue | Fix |
| --- | --- |
| `JWT_SECRET is required` | Add to `backend/.env` |
| Login fails after seed change | `npx prisma db seed` |
| `dev.db` locked | Stop running backend server |
| Prisma client out of date | `npx prisma generate` |

## Files (gitignored)

- `backend/dev.db`
- `backend/test.db`
- `*-journal` WAL files
