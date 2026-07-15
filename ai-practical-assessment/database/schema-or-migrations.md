# Schema and Migrations

## Canonical schema

**File:** `backend/prisma/schema.prisma`

## Migrations

| Migration | Description |
| --- | --- |
| `20260714122243_init` | Initial User, Ticket, Comment tables |
| `20260714123411_update_user_roles` | UserRole enum updates |

**Path:** `backend/prisma/migrations/`

**Lock file:** `backend/prisma/migrations/migration_lock.toml` (provider: sqlite)

## Apply schema

```bash
cd backend
npx prisma db push        # development
npx prisma migrate deploy # production with migrations
```

## Prisma config

**File:** `backend/prisma.config.ts`

- Schema path: `prisma/schema.prisma`
- Seed command: `tsx prisma/seed.ts`
- Datasource URL from `DATABASE_URL` env var

## Generator

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/infrastructure/prisma/generated"
}
```

Client is committed to `backend/src/infrastructure/prisma/generated/` for clone-and-run without immediate generate (still run `npx prisma generate` after schema changes).

See [data-model.md](../data-model.md) for entity details.
