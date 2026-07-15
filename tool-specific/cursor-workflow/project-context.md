# Project Context

## Overview

**Support Ticket Management System** — a full-stack application for creating, assigning, tracking, and resolving support tickets with role-based access control.

Built with **Cursor** as the primary development environment.

## Repository layout

```
support-ticket-system-ai-project/
├── backend/                 # Express + TypeScript + Prisma API
├── frontend/                # React + MUI SPA
├── tool-specific/
│   └── cursor-workflow/     # Cursor AI workflow docs (this folder)
├── README.md
└── .gitignore
```

## Tech stack

| Layer | Technology |
| --- | --- |
| Backend runtime | Node.js, Express 5, TypeScript |
| Database | SQLite via Prisma 7 + better-sqlite3 adapter |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Frontend | React 18, React Router 6, Material UI 6 |
| HTTP client | Axios with request/response interceptors |
| API docs | Swagger / OpenAPI 3 (swagger-jsdoc) |
| Testing | Jest + Supertest (backend integration tests) |
| Containerization | Dockerfile (backend, Node 22) |

## Domain model

Three Prisma entities:

1. **User** — email, name, hashed password, role (`ADMIN`, `DEVELOPER`, `SUPPORT`, `MANAGER`, `QA`)
2. **Ticket** — readable IDs (`ticket-1001`), title, description, status, priority, creator, assignee
3. **Comment** — content linked to a ticket and author

## Architecture patterns (backend)

- **Repository → Service → Controller → Routes**
- Zod validation via `validate` / `validateBody` middlewares
- Centralized errors: `AppError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `BadRequestError`
- Error response shape: `{ success: false, statusCode, message, code?, details? }`
- JWT middleware (`authenticate`) + permission middleware (`authorize`)
- Assigned-ticket enforcement for Developer role (`requireAssignedTicketAccess`)

## Architecture patterns (frontend)

- Page components in `src/pages/`
- Layout shells: `DashboardLayout`, `MainLayout`
- Data hooks: `useTickets`, `useDashboardData`, `useComments`, etc.
- Auth: `AuthContext`, `ProtectedRoute`, `GuestRoute`
- JWT stored in `sessionStorage` via `authStorage.ts`

## Key ports

| Service | Port |
| --- | --- |
| Backend API | 3000 |
| Frontend dev server | 3003 |
| Swagger UI | 3000/api-docs |

## Seed data

Five users, password `password123` for all:

- `admin@example.com` (ADMIN)
- `developer@example.com` (DEVELOPER)
- `support@example.com` (SUPPORT)
- `manager@example.com` (MANAGER)
- `qa@example.com` (QA)

Five sample tickets (`ticket-1001` … `ticket-1005`) seeded in `backend/prisma/seed.ts`.

## Environment files

| File | Purpose |
| --- | --- |
| `backend/.env.example` | `DATABASE_URL`, `PORT`, `JWT_SECRET`, `JWT_EXPIRES_IN` |
| `frontend/.env.example` | `PORT`, `REACT_APP_API_URL` |

Never commit `.env` or `*.db` files.

## What is intentionally out of scope (current)

- User registration / full user CRUD API
- GitHub Actions CI workflow (placeholder `.github/` exists, empty)
- Frontend unit tests
- Dedicated unit test tier (integration tests only on backend)

## When working in Cursor

1. Read this file and `spec.md` before large changes.
2. Follow existing patterns — do not introduce new frameworks without request.
3. Keep backend and frontend auth in sync when changing protected endpoints.
4. Run `npx prisma db seed` after password or user schema changes.
5. Both servers must run for end-to-end testing (backend on 3000, frontend on 3003).
