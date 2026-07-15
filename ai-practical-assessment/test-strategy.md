# Test Strategy

## Test Scope

| Area | Covered | Tool |
| --- | --- | --- |
| Auth login API | ✅ | Jest + Supertest |
| RBAC per role | ✅ | Jest + Supertest |
| Ticket CRUD + filters | ✅ | Jest + Supertest |
| Status transitions | ✅ | Jest + Supertest |
| Dashboard stats | ✅ | Jest + Supertest |
| Swagger spec | ✅ | Jest + Supertest |
| Frontend components | ❌ | Manual browser only |
| Status machine unit tests | ❌ | Not implemented |
| E2E (Playwright/Cypress) | ❌ | Not implemented |
| Docker build | ❌ | Manual only |

**Test DB:** Isolated SQLite (`test.db`) via `DATABASE_URL` in test env  
**Run command:** `cd backend && npm test -- --runInBand`

---

## Unit Tests

| Target | Status | Notes |
| --- | --- | --- |
| `ticket-status.machine.ts` | ❌ Not covered | Pure functions; ideal unit-test candidate |
| `permissions.ts` | ❌ Not covered | Tested indirectly via integration |
| `jwt.ts` / `password.ts` | ❌ Not covered | Tested indirectly via login integration |
| Zod validators | ❌ Not covered | Tested via API integration |

**Rationale:** Integration tests were prioritized to validate end-to-end API behavior within assessment time constraints.

---

## Component Tests

| Component | Status | Notes |
| --- | --- | --- |
| `LoginPage` | ❌ | Manual: valid/invalid login, network error |
| `TicketListPage` | ❌ | Manual: filters, pagination, search |
| `TicketDetailPage` | ❌ | Manual: comments, status update |
| `ProtectedRoute` | ❌ | Manual: redirect when unauthenticated |
| Dashboard charts | ❌ | Manual: visual check |

**Rationale:** No React Testing Library setup; frontend validated via manual smoke tests.

---

## API / Integration Tests

| File | What it tests |
| --- | --- |
| `auth.login.test.ts` | Login success, invalid credentials, protected route without token, invalid token |
| `auth.authorization.test.ts` | Per-role access: QA read-only, Support create/update, Developer assigned-only, Manager/Admin full |
| `ticket.pagination.test.ts` | Paginated list, invalid page/limit, sort params |
| `ticket.filters.test.ts` | Priority filter, assignee filter, invalid values |
| `ticket.status.test.ts` | Valid transitions, invalid transition rejection |
| `dashboard.stats.test.ts` | Stats counts match seeded data |
| `swagger.test.ts` | `/api-docs` returns OpenAPI JSON |

**Setup:** `beforeAll` runs `prisma db push` against test DB; `afterAll` disconnects Prisma.

---

## Edge Case Tests

| Scenario | Covered | Test location |
| --- | --- | --- |
| Invalid status transition (CLOSED → OPEN) | ✅ | `ticket.status.test.ts` |
| Developer updating unassigned ticket | ✅ | `auth.authorization.test.ts` |
| Empty `assignedTo` filter | ✅ | `ticket.filters.test.ts` |
| Invalid priority enum in query | ✅ | `ticket.filters.test.ts` |
| Page/limit = 0 or negative | ✅ | `ticket.pagination.test.ts` |
| Login with wrong password | ✅ | `auth.login.test.ts` |
| Request without Bearer token | ✅ | `auth.login.test.ts` |
| Expired JWT | ❌ | Would need time-mocked token |
| Concurrent ticket ID generation | ❌ | Not tested |
| Very long comment content (>5000) | ❌ | Not tested |
| XSS in ticket title (frontend render) | ❌ | Manual observation only |

---

## Tests Not Covered (and why)

| Gap | Reason |
| --- | --- |
| Frontend unit/component tests | No RTL setup; manual testing used instead |
| Status machine unit tests | Covered indirectly; dedicated unit file deferred |
| E2E browser tests | Out of assessment scope; no Playwright/Cypress added |
| JWT expiry test | Requires clock mocking or short-lived test tokens |
| Load/performance tests | Not required for assessment |
| Docker image build in CI | No GitHub Actions workflow yet |
| User CRUD API | Feature not implemented |
| Registration endpoint | Intentionally excluded from scope |

**Follow-up:** Add `ticket-status.machine.test.ts`, RTL tests for `LoginPage`, and a GitHub Actions job running `npm test -- --runInBand`.
