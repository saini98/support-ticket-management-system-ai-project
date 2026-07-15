# Tasks

Track of work completed and remaining items for this project.

## Completed

### Core backend

- [x] Prisma schema: User, Ticket, Comment with enums
- [x] Repository → Service → Controller → Routes architecture
- [x] Ticket CRUD with readable IDs (`ticket-1001`, …)
- [x] Ticket status state machine and transition validation
- [x] Comment CRUD nested under tickets
- [x] Dashboard stats API (`GET /api/dashboard/stats`)
- [x] Seed script with 5 users and 5 sample tickets

### API enhancements

- [x] Ticket list: search, status filter
- [x] Ticket list: priority filter
- [x] Ticket list: assignee filter (`assignedTo`)
- [x] Ticket list: pagination (`page`, `limit`, `sortBy`, `sortOrder`)
- [x] Backward-compatible non-paginated list response

### Authentication & authorization

- [x] JWT login (`POST /auth/login`)
- [x] `authenticate` middleware (Bearer token)
- [x] `authorize` permission middleware
- [x] Role-based rules (Admin, Support, Developer, QA, Manager)
- [x] Assigned-ticket check for Developer updates/comments
- [x] Integration tests for login and RBAC

### Frontend

- [x] Dashboard with stats, charts, recent tickets, activity timeline
- [x] Responsive dashboard layout (mobile/tablet/desktop)
- [x] Ticket list, create, detail, edit pages
- [x] Login page (MUI, email + password)
- [x] JWT in sessionStorage + Axios interceptors
- [x] Protected routes with redirect to login
- [x] Ticket # display in timeline and lists

### Documentation & DevOps prep

- [x] Swagger / OpenAPI 3 (`/api-docs`)
- [x] Production Dockerfile (Node 22, Prisma, multi-stage)
- [x] Root `.gitignore`, `.env.example` files
- [x] `README.md` with clone-and-run instructions
- [x] Cursor workflow docs (this folder)

### Testing (backend)

- [x] Integration: auth login
- [x] Integration: RBAC authorization
- [x] Integration: ticket pagination
- [x] Integration: priority filter
- [x] Integration: assignee filter
- [x] Integration: status transitions
- [x] Integration: dashboard stats
- [x] Integration: Swagger docs

---

## Remaining / future

### High priority

- [ ] Initialize git repo and push to GitHub
- [ ] GitHub Actions CI (lint, build, test)
- [ ] `docker-compose.yml` for backend + volume for SQLite

### Medium priority

- [ ] Full user CRUD API and role management UI
- [ ] Frontend: use `GET /api/dashboard/stats` instead of client-side aggregation
- [ ] Frontend: priority/assignee filters on ticket list
- [ ] Handle 403 Forbidden in UI (role-aware error messages)
- [ ] `postbuild` script to copy Prisma generated client into `dist/`

### Lower priority

- [ ] Unit tests (services, validators, permissions, status machine)
- [ ] Frontend tests (login flow, protected routes)
- [ ] Refresh token / httpOnly cookie auth
- [ ] PostgreSQL migration path for production
- [ ] E2E tests (Playwright / Cypress)

---

## Suggested next Cursor prompts

Use these when continuing development:

1. **CI:** "Add GitHub Actions workflow to run backend tests and frontend build on push."
2. **User admin:** "Add Admin-only user list and role update API under `/users`."
3. **Dashboard API:** "Refactor frontend dashboard to call `/api/dashboard/stats` instead of fetching all tickets."
4. **403 UX:** "Show permission-denied messages when API returns 403 on ticket actions."
