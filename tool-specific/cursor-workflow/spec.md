# Specification

## Product summary

A support ticket management system that lets authenticated users view, create, and manage tickets according to their role. Managers view dashboard reports; QA has read-only access; developers work on assigned tickets only.

## Functional requirements

### Authentication

- `POST /auth/login` — email + password, returns `{ accessToken, user }`
- No registration endpoint (users are seeded)
- JWT Bearer token required on protected routes
- Token secret from `JWT_SECRET` env var

### Tickets

| Method | Path | Description |
| --- | --- | --- |
| GET | `/tickets` | List tickets (search, filters, sort, pagination) |
| GET | `/tickets/:id` | Ticket detail |
| POST | `/tickets` | Create ticket |
| PUT | `/tickets/:id` | Update ticket (status transitions validated) |
| DELETE | `/tickets/:id` | Delete ticket (Admin only) |
| GET | `/tickets/:id/status-transitions` | Allowed next statuses |

**List query parameters:**

- `search` — title/description text search
- `status` — label filter (e.g. `Open`, `In Progress`)
- `priority` — `Low`, `Medium`, `High`, `Critical` (maps `Critical` → `URGENT`)
- `assignedTo` — assignee user ID
- `page`, `limit`, `sortBy`, `sortOrder` — pagination and sorting

Without pagination params, `GET /tickets` returns a plain array (legacy behavior).

### Comments

| Method | Path | Description |
| --- | --- | --- |
| GET | `/tickets/:ticketId/comments` | List comments |
| POST | `/tickets/:ticketId/comments` | Add comment |

### Dashboard

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/dashboard/stats` | Aggregate counts by ticket status |

### Public endpoints

- `GET /` — API metadata
- `GET /health` — health check
- `GET /api-docs`, `GET /api-docs.json` — Swagger

## Role-based authorization

| Role | Permissions |
| --- | --- |
| **Admin** | Full access |
| **Support** | Read/create/update tickets and comments; view dashboard |
| **Developer** | Read tickets; update/comment only on **assigned** tickets; view dashboard |
| **QA** | Read-only (tickets, comments, dashboard) |
| **Manager** | View dashboard (reports); read tickets and comments |

Implemented via `authorize(...permissions)` middleware in `backend/src/middlewares/authorize.middleware.ts` and permission map in `backend/src/auth/permissions.ts`.

## Ticket status machine

Valid transitions enforced in `backend/src/domain/ticket-status.machine.ts`:

- OPEN → IN_PROGRESS, CANCELLED
- IN_PROGRESS → RESOLVED, CANCELLED
- RESOLVED → CLOSED, IN_PROGRESS
- CLOSED, CANCELLED — terminal

## Frontend routes

| Path | Page | Auth |
| --- | --- | --- |
| `/login` | LoginPage | Public |
| `/` | Dashboard | Protected |
| `/tickets` | Ticket list | Protected |
| `/tickets/new` | Create ticket | Protected |
| `/tickets/:id` | Ticket detail | Protected |
| `/tickets/:id/edit` | Edit ticket | Protected |

Unauthenticated users redirect to `/login`. JWT attached via Axios interceptor.

## Data model (Prisma)

```prisma
User     — id, email, name, password, role
Ticket   — id (readable), title, description, status, priority, creatorId, assigneeId
Comment  — id, content, ticketId, authorId
```

## Non-functional requirements

- TypeScript strict mode on backend
- API errors return consistent JSON shape
- Swagger documents all endpoints with Bearer auth on protected routes
- Production Docker image: Node 22, multi-stage build, `npm start`
- Secrets never committed; use `.env.example` templates

## API error codes (auth)

| Code | HTTP | Meaning |
| --- | --- | --- |
| `INVALID_CREDENTIALS` | 401 | Wrong email/password |
| `AUTHENTICATION_REQUIRED` | 401 | Missing token |
| `INVALID_TOKEN` | 401 | Bad JWT |
| `TOKEN_EXPIRED` | 401 | Expired JWT |
| `FORBIDDEN` | 403 | Insufficient role permission |
| `FORBIDDEN_ASSIGNED_TICKET_ONLY` | 403 | Developer acting on unassigned ticket |
