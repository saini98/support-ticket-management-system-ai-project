# Source Code

This folder documents where application source code lives in the repository.

## Actual source locations

| Package | Path | Description |
| --- | --- | --- |
| **Backend API** | [`../../backend/src/`](../../backend/src/) | Express, Prisma, auth, tickets, dashboard |
| **Frontend SPA** | [`../../frontend/src/`](../../frontend/src/) | React, MUI, pages, hooks, components |

## Backend structure

```
backend/src/
├── auth/              # Permission map
├── config/            # env, swagger
├── controllers/
├── domain/            # Status machine
├── docs/              # OpenAPI JSDoc
├── infrastructure/    # Prisma client
├── middlewares/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
└── validators/
```

## Frontend structure

```
frontend/src/
├── components/        # auth, dashboard, tickets, layout
├── context/           # AuthContext
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── theme/
├── types/
└── utils/
```

## Entry points

| App | Entry | Start command |
| --- | --- | --- |
| Backend | `backend/src/server.ts` | `npm run dev` |
| Frontend | `frontend/src/index.tsx` | `npm start` |

See root [`README.md`](../../README.md) for setup instructions.
