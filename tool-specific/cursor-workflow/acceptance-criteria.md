# Acceptance Criteria

Use this checklist to verify features before marking work complete.

## General

- [ ] No application logic changed unless explicitly requested
- [ ] Follows existing repository → service → controller → routes pattern (backend)
- [ ] Follows existing hook + service + page pattern (frontend)
- [ ] No secrets, `.env`, or `*.db` files committed
- [ ] TypeScript compiles without errors (`npm run build` in affected package)
- [ ] Existing integration tests pass (`cd backend && npm test`)

---

## Authentication

### Login API

- [ ] `POST /auth/login` accepts `{ email, password }`
- [ ] Returns `200` with `{ accessToken, user: { id, name, email, role } }`
- [ ] Returns `401` with code `INVALID_CREDENTIALS` for wrong credentials
- [ ] Returns `400` for invalid email format or missing fields
- [ ] Seed users can log in with `password123`

### JWT protection

- [ ] Protected routes return `401` without `Authorization: Bearer <token>`
- [ ] Protected routes return `401` with expired/invalid token
- [ ] Valid token grants access to permitted operations

### Frontend login

- [ ] `/login` shows email and password fields (MUI)
- [ ] Successful login stores JWT in sessionStorage
- [ ] Unauthenticated users redirect to `/login`
- [ ] After login, user returns to originally requested page
- [ ] Sign out clears session and redirects to login

---

## Role-based authorization

| Scenario | Expected |
| --- | --- |
| Admin deletes ticket | `204` |
| Support deletes ticket | `403 FORBIDDEN` |
| Support creates/updates ticket | `201` / `200` |
| QA reads tickets | `200` |
| QA creates ticket | `403 FORBIDDEN` |
| Developer updates unassigned ticket | `403 FORBIDDEN_ASSIGNED_TICKET_ONLY` |
| Developer updates assigned ticket | `200` |
| Manager views dashboard stats | `200` |
| Manager creates ticket | `403 FORBIDDEN` |

---

## Tickets

### CRUD

- [ ] Create ticket returns `201` with readable ID
- [ ] Get by ID returns ticket with nested creator/assignee
- [ ] Update validates status transitions
- [ ] Invalid transition returns `400`
- [ ] Delete returns `204` and removes related comments

### List filters & pagination

- [ ] `?status=Open` filters correctly
- [ ] `?priority=Critical` maps to `URGENT` priority
- [ ] `?assignedTo=<userId>` filters by assignee
- [ ] `?page=1&limit=10` returns `{ data, page, limit, total, totalPages }`
- [ ] No pagination params returns plain array (legacy)

### Sorting

- [ ] `sortBy` and `sortOrder` change result ordering

---

## Comments

- [ ] `GET /tickets/:id/comments` returns array
- [ ] `POST` creates comment linked to ticket and author
- [ ] Developer can comment only on assigned tickets
- [ ] QA cannot create comments

---

## Dashboard

- [ ] `GET /api/dashboard/stats` returns counts: total, open, inProgress, resolved, closed, cancelled
- [ ] Counts reflect actual database state
- [ ] Requires authentication

---

## Swagger

- [ ] `GET /api-docs` serves UI
- [ ] `GET /api-docs.json` returns OpenAPI 3.0.3 spec
- [ ] Protected routes document `bearerAuth` security
- [ ] Login endpoint documented under Auth tag

---

## Docker

- [ ] `docker build` succeeds in `backend/`
- [ ] Container exposes port `3000`
- [ ] `CMD` uses `npm start` → `node dist/server.js`
- [ ] `GET /health` returns `200` inside container
- [ ] `JWT_SECRET` required via environment variable

---

## GitHub readiness

- [ ] Root `.gitignore` ignores `node_modules`, `dist`, `build`, `.env`, `*.db`, `coverage`, logs
- [ ] `backend/.env.example` and `frontend/.env.example` present
- [ ] `README.md` documents clone, setup, seed credentials, and run commands
- [ ] No real credentials in committed files

---

## Definition of done (per feature)

1. Code follows project conventions
2. Error responses use standard shape with appropriate status codes
3. Swagger updated if API surface changed
4. Integration test added or updated for backend behavior changes
5. Manual smoke test: backend + frontend running, login works, feature verified in browser
