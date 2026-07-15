# Requirement Analysis

## Selected Project Option

**Support Ticket Management System** — full-stack web application for an AI practical assessment.

This option covers a realistic business domain (internal support / IT helpdesk), allows demonstration of a **richer data model** (User, Ticket, Comment), and supports assessment criteria including authentication, role-based access, API filtering/pagination, Swagger documentation, integration tests, and Docker deployment.

**Tech stack chosen:**

| Layer | Technology |
| --- | --- |
| Frontend | React (CRA), TypeScript, Material UI, Axios, React Router |
| Backend | Node.js, Express, TypeScript, Prisma ORM, SQLite |
| Validation | Zod |
| Testing | Jest, Supertest |
| AI tool | Cursor |

---

## My Understanding (in your own words)

This system is an internal tool for teams to **log, assign, track, and resolve support issues** — similar to a lightweight helpdesk or Jira-style ticket board.

Users sign in with email and password. Once authenticated, what they can do depends on their **role**:

- **Support agents** create and update tickets on behalf of users.
- **Developers** work only on tickets assigned to them.
- **QA** reviews tickets in read-only mode.
- **Managers** monitor reports and dashboard metrics.
- **Admins** have full control, including deleting tickets.

Each ticket has a readable ID (e.g. `ticket-1001`), a lifecycle (Open → In Progress → Resolved → Closed), a priority, a creator, and an optional assignee. Team members can add **comments** to tickets for discussion and updates.

The backend exposes a REST API protected by JWT. The frontend is a React SPA with a dashboard, ticket list, and login page. The goal is not just working software, but also a documented, testable, GitHub-ready project built with AI assistance.

---

## Functional Requirements

### Users and authentication

| ID | Requirement |
| --- | --- |
| FR-01 | Users exist with email, name, hashed password, and role |
| FR-02 | Users are seeded in the database (no self-registration) |
| FR-03 | `POST /auth/login` accepts email + password and returns JWT + user info |
| FR-04 | All ticket, comment, and dashboard APIs require a valid Bearer token |
| FR-05 | Frontend login page (MUI) with email and password fields |
| FR-06 | Unauthenticated users are redirected to `/login` |
| FR-07 | JWT stored securely on the client; attached to API requests automatically |
| FR-08 | Sign out clears session and returns user to login |

### Role-based authorization

| Role | Allowed actions |
| --- | --- |
| **Admin** | Full access — create, read, update, delete tickets and comments; view dashboard |
| **Support** | Create and update any ticket; add comments; view dashboard |
| **Developer** | Read tickets; update and comment only on **assigned** tickets; view dashboard |
| **QA** | Read-only access to tickets, comments, and dashboard |
| **Manager** | View dashboard reports; read tickets and comments (no create/update/delete) |

### Tickets

| ID | Requirement |
| --- | --- |
| FR-10 | Create ticket with title, description, priority, creator, and assignee |
| FR-11 | Readable ticket IDs (e.g. `ticket-1001`, not opaque cuid) |
| FR-12 | Get single ticket with nested creator and assignee details |
| FR-13 | Update ticket fields including status |
| FR-14 | Validate status transitions (e.g. Open cannot jump directly to Closed) |
| FR-15 | Delete ticket (Admin only); related comments removed |
| FR-16 | List tickets with text search on title/description |
| FR-17 | Filter by status, priority, and assignee |
| FR-18 | Paginate and sort list (`page`, `limit`, `sortBy`, `sortOrder`) |
| FR-19 | Return plain array when no pagination params (backward compatible) |
| FR-20 | API endpoint for allowed status transitions per ticket |

### Comments

| ID | Requirement |
| --- | --- |
| FR-21 | List comments for a ticket |
| FR-22 | Add comment linked to ticket and author |
| FR-23 | Comments deleted when parent ticket is deleted |

### Dashboard

| ID | Requirement |
| --- | --- |
| FR-30 | `GET /api/dashboard/stats` returns ticket counts by status |
| FR-31 | Frontend dashboard shows stats, charts, recent tickets, and activity timeline |
| FR-32 | Dashboard layout responsive on mobile, tablet, and desktop |

### API documentation

| ID | Requirement |
| --- | --- |
| FR-40 | Swagger UI at `/api-docs` |
| FR-41 | OpenAPI JSON at `/api-docs.json` |
| FR-42 | Bearer auth documented on protected endpoints |

---

## Non-Functional Requirements

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-01 | Architecture | Backend follows repository → service → controller → routes |
| NFR-02 | Validation | Request input validated with Zod schemas |
| NFR-03 | Errors | Consistent JSON: `{ success, statusCode, message, code?, details? }` |
| NFR-04 | Security | Passwords bcrypt-hashed; JWT secret in `.env`; no secrets in git |
| NFR-05 | Auth errors | Clear codes: `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `FORBIDDEN`, etc. |
| NFR-06 | Type safety | TypeScript strict mode on backend |
| NFR-07 | Testing | Backend integration tests with Jest + Supertest |
| NFR-08 | Documentation | README with clone-and-run instructions for new developers |
| NFR-09 | Containerization | Production Dockerfile (Node 22, Prisma, `npm start`) |
| NFR-10 | Maintainability | Reusable `authorize` middleware for RBAC |
| NFR-11 | Performance | Pagination to avoid loading entire ticket table at scale |
| NFR-12 | Port separation | Frontend on 3003, backend on 3000 to avoid dev conflicts |

---

## Assumptions

1. **Single organization** — all seed users belong to one company; no multi-tenant isolation needed.
2. **SQLite is sufficient** for development and assessment; production would use PostgreSQL.
3. **Users are pre-provisioned** — HR or Admin creates accounts via seed/DB, not self-registration.
4. **One assignee per ticket** — a ticket is owned by at most one developer at a time.
5. **Manager needs read access to tickets** to understand dashboard report context, not just stats alone.
6. **Support can update any ticket** — not restricted to tickets they created.
7. **JWT in sessionStorage** is acceptable for this assessment SPA (production may prefer httpOnly cookies).
8. **English only** — no i18n required.
9. **No email notifications** — status changes do not trigger emails or webhooks.
10. **Seed password `password123`** is for local development only.

---

## Clarifications (questions for a product owner)

| # | Question | Current decision |
| --- | --- | --- |
| 1 | Can Managers create or edit tickets, or only view reports? | **Read + dashboard only** — no writes |
| 2 | Can Support delete tickets? | **No** — delete is Admin-only |
| 3 | Can Developers create new tickets? | **No** — create is Support/Admin only |
| 4 | Should QA add comments during review? | **No** — QA is strictly read-only |
| 5 | Is user self-registration required? | **No** — explicitly out of scope |
| 6 | Should the frontend hide buttons by role, or rely on API 403? | **API enforces**; UI role guards deferred |
| 7 | Should dashboard use backend stats API or client-side aggregation? | **Both exist**; frontend still aggregates client-side (refactor planned) |
| 8 | What happens when assignee is removed from a ticket? | `assigneeId` nullable; Developer loses update access |
| 9 | Are ticket IDs user-editable? | **No** — system-generated readable IDs only |
| 10 | Password reset / forgot password flow? | **Out of scope** for v1 |

---

## Edge Cases

### Authentication

| Case | Expected behavior |
| --- | --- |
| Login with wrong password | `401` `INVALID_CREDENTIALS` — generic message, no user enumeration |
| Login with malformed email | `400` validation error |
| Request without token on protected route | `401` `AUTHENTICATION_REQUIRED` |
| Expired JWT | `401` `TOKEN_EXPIRED`; frontend redirects to login |
| Malformed Bearer token | `401` `INVALID_TOKEN` |

### Authorization

| Case | Expected behavior |
| --- | --- |
| Developer updates ticket assigned to someone else | `403` `FORBIDDEN_ASSIGNED_TICKET_ONLY` |
| QA attempts `POST /tickets` | `403` `FORBIDDEN` |
| Support attempts `DELETE /tickets/:id` | `403` `FORBIDDEN` |
| Manager attempts to create ticket | `403` `FORBIDDEN` |
| Admin performs any operation | `200`/`201`/`204` as appropriate |

### Tickets

| Case | Expected behavior |
| --- | --- |
| Invalid status transition (Open → Closed) | `400` Bad Request |
| Update non-existent ticket | `404` Not Found |
| Create ticket with invalid user IDs | `400` creator/assignee not found |
| List with invalid `priority` value | `400` validation error |
| List with empty `assignedTo` | `400` validation error |
| Pagination `page=0` or negative limit | `400` validation error |
| No tickets in database | Dashboard stats all zero; list returns `[]` |
| Delete ticket with comments | Comments cascade-deleted |

### Comments

| Case | Expected behavior |
| --- | --- |
| Comment on non-existent ticket | `404` Not Found |
| Developer comments on unassigned ticket | `403` `FORBIDDEN_ASSIGNED_TICKET_ONLY` |
| Empty comment content | `400` validation error |

### System / environment

| Case | Expected behavior |
| --- | --- |
| Backend not running | Frontend shows "Unable to reach the server" |
| Missing `JWT_SECRET` in `.env` | Backend fails to start with clear error |
| SQLite DB locked (Windows tests) | Tests run `--runInBand` to avoid `EBUSY` |
| Both frontend and backend on port 3000 | Frontend configured on **3003** via `.env` |

---

## Traceability

| Area | Design doc | Implementation |
| --- | --- | --- |
| API contract | [api-contract.md](./api-contract.md) | `backend/src/routes/` |
| Data model | [data-model.md](./data-model.md) | `backend/prisma/schema.prisma` |
| UI flows | [ui-flow.md](./ui-flow.md) | `frontend/src/routes/AppRoutes.tsx` |
| Acceptance tests | [acceptance-criteria.md](./acceptance-criteria.md) | `backend/tests/integration/` |
