# PR Description

## Summary

Implements a full-stack Support Ticket Management System with JWT authentication, role-based authorization (5 roles), ticket CRUD with status lifecycle, nested comments, advanced list filtering/pagination, dashboard stats API, React frontend with login flow, Swagger documentation, and production Dockerfile.

---

## Features Implemented

- **Authentication:** `POST /auth/login` with bcrypt + JWT; protected routes via Bearer token
- **Authorization:** Admin, Support, Developer, QA, Manager roles with permission middleware
- **Tickets:** CRUD, readable IDs (`ticket-1001`), status state machine, priority levels
- **Comments:** List and create comments on tickets
- **List API:** Search, status/priority/assignee filters, pagination, sorting
- **Dashboard:** Stats endpoint (`GET /api/dashboard/stats`)
- **Frontend:** Login page, protected routes, dashboard, ticket list/create/detail/edit
- **Docs:** Swagger UI at `/api-docs`
- **DevOps:** Production Dockerfile, `.gitignore`, `.env.example` files

---

## Technical Changes

### Backend

| Area | Files |
| --- | --- |
| Auth | `auth.routes.ts`, `auth.service.ts`, `auth.middleware.ts`, `jwt.ts`, `password.ts` |
| RBAC | `permissions.ts`, `authorize` middleware, `requireAssignedTicketAccess` |
| Tickets | `ticket.routes.ts`, `ticket.service.ts`, `ticket.repository.ts`, status machine |
| Comments | `comment.routes.ts`, `comment.service.ts` |
| Dashboard | `dashboard.routes.ts`, `dashboard.service.ts` |
| Validation | Zod schemas in `validators/` |
| Errors | `AppError` hierarchy, central `errorHandler` |
| Tests | 7 integration test files |
| Swagger | OpenAPI 3 config with Bearer auth |
| Docker | `backend/Dockerfile` (Node 22, multi-stage) |

### Frontend

| Area | Files |
| --- | --- |
| Auth | `LoginPage.tsx`, `AuthContext.tsx`, `authStorage.ts`, `ProtectedRoute.tsx` |
| API | `apiClient.ts` with JWT interceptor |
| Pages | Dashboard, TicketList, TicketCreate, TicketDetail, TicketEdit |
| Layout | `DashboardLayout`, `MainLayout` |

### Documentation

- Root `README.md` with setup instructions
- Full `ai-practical-assessment/` submission package
- `tool-specific/cursor-workflow/` AI workflow docs

---

## Database Changes

- **Schema:** User, Ticket, Comment models with enums for role, status, priority
- **Relations:** Ticket → creator/assignee (User), Ticket → comments, Comment → author
- **Seed:** 5 users (one per role), 5 tickets with varied statuses
- **Migration:** `prisma db push` for dev; test DB isolated via `DATABASE_URL`

No production migration files; schema managed via Prisma push for assessment simplicity.

---

## Testing Done

- [x] `npm test -- --runInBand` — all integration tests pass
- [x] `npm run build` — TypeScript compiles without errors
- [x] Manual login with all 5 seed users
- [x] Manual ticket create, edit, status change, comment add
- [x] Manual filter/pagination on ticket list
- [x] Swagger UI loads and documents protected endpoints
- [ ] Docker image build (Docker Desktop not installed)
- [ ] Frontend automated tests (not implemented)

---

## AI Usage Summary

**Tool:** Cursor (primary AI assistant throughout the project)

| Phase | AI contribution |
| --- | --- |
| Planning | Requirements analysis, folder structure, entity design |
| Implementation | Auth, RBAC, ticket API, frontend login, filters, Swagger |
| Testing | Integration test generation, Jest config fixes |
| Debugging | Login connectivity, TypeScript errors, test timeouts, git push |
| Documentation | README, assessment docs, API contract, this PR description |
| Review | Pre-push audit for secrets and build artifacts |

All AI-generated code was reviewed, tested, and validated manually. See [reflection.md](./reflection.md) and [tool-workflow.md](./tool-workflow.md).

---

## Screenshots / Demo Notes

**Seed credentials** (all passwords: `password123`):

| Email | Role |
| --- | --- |
| `admin@example.com` | Admin |
| `support@example.com` | Support |
| `developer@example.com` | Developer |
| `qa@example.com` | QA |
| `manager@example.com` | Manager |

**Demo flow:**

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open `http://localhost:3003/login`
4. Login as `admin@example.com`
5. View dashboard → navigate to tickets → create/edit ticket → add comment
6. Login as `developer@example.com` → verify can only edit assigned tickets
7. Open `http://localhost:3000/api-docs` for Swagger

---

## Known Limitations

- No user registration or User CRUD API
- Frontend dashboard aggregates client-side (not using stats API yet)
- No frontend role-based UI guards (API enforces 403)
- JWT in `sessionStorage` (XSS risk in production)
- No GitHub Actions CI pipeline
- No `docker-compose.yml`
- No frontend or unit tests
- SQLite only (not production-grade for concurrency)

---

## Future Improvements

1. GitHub Actions CI (lint, build, test)
2. `docker-compose.yml` for one-command dev setup
3. Wire dashboard to `/api/dashboard/stats`
4. Frontend RBAC UI guards
5. User CRUD API (Admin-only)
6. httpOnly cookie auth for production
7. Unit tests for status machine and permissions
8. React Testing Library component tests
9. E2E tests with Playwright
