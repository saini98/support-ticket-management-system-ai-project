# Cursor Rules & Instructions

Persistent guidance for AI-assisted development on this project. Reference this file (and `project-context.md`, `spec.md`) at the start of Cursor sessions.

## How to use this folder

| File | When to read |
| --- | --- |
| `project-context.md` | Architecture, stack, folder layout, conventions |
| `spec.md` | API contracts, roles, routes, data model |
| `tasks.md` | What's done vs. remaining |
| `acceptance-criteria.md` | Definition of done for features |
| `cursor-rules-or-instructions.md` | Coding rules for the agent (this file) |

**Suggested Cursor prompt prefix:**

```
Read tool-specific/cursor-workflow/project-context.md and spec.md before making changes.
Follow cursor-rules-or-instructions.md. Do not change unrelated code.
```

---

## Code style

- Match existing naming, folder structure, formatting, and error handling
- Do not introduce new patterns or frameworks unless explicitly requested
- Prefer the smallest correct diff — no drive-by refactors
- Reuse and extend existing functions; do not reimplement similar logic
- Comments only for non-obvious business logic

## Backend conventions

```
src/
├── auth/              # Permissions map
├── config/            # env, swagger
├── controllers/       # HTTP handlers (thin)
├── domain/            # Business rules (e.g. status machine)
├── docs/              # OpenAPI JSDoc
├── infrastructure/    # Prisma client, database
├── middlewares/       # auth, authorize, validate, error
├── repositories/      # Data access
├── routes/            # Express routers
├── services/          # Business logic
├── types/             # DTOs and interfaces
├── utils/             # Shared helpers
└── validators/        # Zod schemas
```

- Validate input with Zod via `validate` / `validateBody`
- Throw typed errors from `utils/errors.ts`
- Protect routes: `authenticate` at app level, `authorize(Permission.*)` per route
- Developer assigned-ticket rules: use `requireAssignedTicketAccess`

## Frontend conventions

```
src/
├── components/        # UI components (auth, dashboard, tickets, layout, common)
├── context/           # AuthContext
├── hooks/             # Data-fetching hooks
├── layouts/           # DashboardLayout, MainLayout
├── pages/             # Route pages
├── routes/            # AppRoutes, paths constants
├── services/          # API clients (axios)
├── theme/             # MUI theme
├── types/             # TypeScript types
└── utils/             # Helpers, auth storage
```

- Forms: `react-hook-form` + MUI `TextField` (see `CreateTicketForm.tsx`)
- API errors: catch `ApiError`, display `error.message`
- Auth token: `sessionStorage` via `authStorage.ts`, not in URLs or logs

## Security rules

- Never commit secrets, `.env`, passwords, or JWT secrets
- Never log tokens or credentials
- Do not disable auth or validation for convenience
- Do not implement registration unless explicitly requested
- Use `JWT_SECRET` from environment — app throws on startup if missing

## Testing rules

- Backend behavior changes → add or update integration tests in `backend/tests/integration/`
- Run `npm test` in `backend/` after backend changes
- Test helpers: `loginAsUser`, `authHeader`, `createTestTicket` in `tests/helpers/`
- No trivial tests that only assert obvious behavior

## Dependency discipline

- Do not add packages unless necessary
- Pin versions and update lockfiles when adding dependencies

## Git & publishing

- Do not commit `.env`, `*.db`, `node_modules/`, `dist/`, `build/`
- Only create git commits when the user explicitly asks
- Use `.env.example` for documenting required variables

## Common commands

```bash
# Backend
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev          # http://localhost:3000

# Frontend
cd frontend
cp .env.example .env
npm install
npm start            # http://localhost:3003

# Tests
cd backend && npm test
```

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Login: "Unable to reach the server" | Start backend (`npm run dev` in `backend/`) |
| Login: invalid credentials after seed change | `npx prisma db seed` |
| 401 on all API calls | Log in again; check Axios Bearer interceptor |
| Port 3000 in use | Frontend uses `PORT=3003` in `.env` |
| Build fails on `jwt.ts` | Ensure `SignOptions` typing for `expiresIn` |

## Optional: promote to Cursor Rules

To make these instructions automatic in Cursor, copy key sections into:

- `.cursor/rules/` (project rules), or
- Root `AGENTS.md`

Keep `tool-specific/cursor-workflow/` as the source of truth and sync rules when conventions change.
