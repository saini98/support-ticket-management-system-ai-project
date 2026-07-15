# Design Notes

## Architecture Overview (frontend, backend, database)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (SPA)                           │
│  React + MUI + React Router (:3003)                             │
│  AuthContext │ ProtectedRoute │ Axios + JWT interceptor         │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/JSON  Authorization: Bearer
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express API (:3000)                            │
│  Routes → authenticate → authorize → validate → Controller       │
│       → Service → Repository → Prisma Client                      │
└────────────────────────────┬────────────────────────────────────┘
                             │ Prisma + better-sqlite3 adapter
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SQLite (dev.db / test.db)                      │
│  Tables: User, Ticket, Comment                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Design

### Structure

```
pages/          → Route-level components (Dashboard, TicketList, Login, …)
layouts/        → DashboardLayout (sidebar), MainLayout (top nav)
components/     → tickets/, dashboard/, auth/, layout/, common/
hooks/          → useTickets, useDashboardData, useComments, …
context/        → AuthContext (user, login, logout)
services/       → axios apiClient, ticketApi, authApi
routes/         → AppRoutes, paths constants
utils/          → authStorage (sessionStorage), ticket.utils
```

### Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Token storage | `sessionStorage` | Tab-scoped; cleared on tab close |
| Route protection | `ProtectedRoute` + `GuestRoute` | React Router 6 outlet pattern |
| Forms | react-hook-form + MUI | Consistent with ticket forms |
| State | Local hooks + Context | No Redux needed for this scope |
| Dashboard data | Client-side aggregation | Built before stats API; refactor planned |
| Ports | Frontend 3003, API 3000 | Avoid dev port conflict |

### Route map

| Path | Auth | Layout |
| --- | --- | --- |
| `/login` | Public | None |
| `/` | Protected | DashboardLayout |
| `/tickets/*` | Protected | MainLayout |

---

## Backend Design

### Layered architecture

```
Routes → Middleware → Controller → Service → Repository → Prisma
```

| Layer | Responsibility | Example |
| --- | --- | --- |
| Routes | HTTP wiring, middleware chain | `ticket.routes.ts` |
| Middleware | Auth, RBAC, Zod validation | `authenticate`, `authorize` |
| Controller | Parse request, send response | `ticket.controller.ts` |
| Service | Business rules | Status transition check |
| Repository | Prisma queries | `findPaginated()` |
| Domain | Pure logic | `ticket-status.machine.ts` |

### Auth design

1. **`authenticate`** — validates Bearer JWT, sets `req.auth`
2. **`authorize(...permissions)`** — checks role permission map; Admin bypasses
3. **`requireAssignedTicketAccess`** — Developer/assigned-resource check

### Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| ORM | Prisma 7 + SQLite | Type-safe; zero-config local dev |
| Validation | Zod via middleware | Reusable `validate` / `validateBody` |
| Errors | Typed `AppError` hierarchy | Consistent JSON responses |
| List API | Array OR paginated object | Backward compatibility |
| Ticket IDs | Human-readable strings | Support workflow UX |

---

## Database Design

### Entities

| Model | Key fields | Relations |
| --- | --- | --- |
| **User** | id, email, name, password, role | createdTickets, assignedTickets, comments |
| **Ticket** | id, title, description, status, priority | creator, assignee, comments |
| **Comment** | id, content | ticket, author |

### Enums

- `UserRole`: ADMIN, DEVELOPER, SUPPORT, MANAGER, QA
- `TicketStatus`: OPEN, IN_PROGRESS, RESOLVED, CLOSED, CANCELLED
- `TicketPriority`: LOW, MEDIUM, HIGH, URGENT

### Constraints

- User email unique
- Ticket ID provided (readable, not auto-cuid)
- Comment cascade-deletes with ticket
- User delete restricted if tickets reference them

**Source:** `backend/prisma/schema.prisma`  
**Details:** [data-model.md](./data-model.md) | [database/schema-or-migrations.md](./database/schema-or-migrations.md)

---

## Validation Strategy

| Layer | Mechanism |
| --- | --- |
| API input | Zod schemas in `validators/` via `validate` middleware |
| Business rules | Service layer (status machine, user existence checks) |
| Authorization | `authorize` + `requireAssignedTicketAccess` middleware |
| Frontend forms | react-hook-form rules + MUI error display |

Invalid input → `400` with `VALIDATION_ERROR` and field details.  
Invalid transition → `400` Bad Request.  
Unauthorized → `401` / `403` with specific codes.

---

## Error Handling Strategy

### Backend

```json
{
  "success": false,
  "statusCode": 403,
  "message": "You do not have permission to perform this action",
  "code": "FORBIDDEN"
}
```

- `AppError` subclasses: `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `BadRequestError`
- Central `errorHandler` middleware maps errors to JSON
- Prisma errors mapped via `mapPrismaError()`
- Zod errors formatted with field paths

### Frontend

- Axios response interceptor wraps API errors as `ApiError`
- Login page displays `error.message`
- `401` on protected API calls → clear session, redirect to `/login`
- Network failure → "Unable to reach the server"

---

## Testing Strategy Link

See [test-strategy.md](./test-strategy.md) for full test scope, integration suites, and gaps.

**Summary:** Jest + Supertest integration tests on backend; manual browser testing for frontend; no unit/E2E tests yet.
