# Acceptance Criteria

## Core

- [x] Three entities: User, Ticket, Comment with Prisma relations
- [x] Ticket CRUD with readable IDs (`ticket-1001`, `ticket-1002`, …)
- [x] Ticket status lifecycle with validated transitions (state machine)
- [x] Nested comments on tickets (list + create)
- [x] `POST /auth/login` returns JWT and user summary
- [x] Seed users can log in with `password123`
- [x] Protected routes require `Authorization: Bearer <token>`
- [x] Role-based access: Admin, Support, Developer, QA, Manager
- [x] Developer can update/comment only on assigned tickets
- [x] Dashboard stats API (`GET /api/dashboard/stats`)
- [x] Frontend login page (MUI) with protected routes
- [x] Ticket list: search, status/priority/assignee filters, pagination, sorting
- [x] Swagger UI at `/api-docs` with Bearer auth on protected routes
- [x] Production Dockerfile (Node 22, `npm start`)

## Validation

- [x] Zod validates login body (email format, required fields)
- [x] Zod validates create/update ticket payloads
- [x] Zod validates comment create payload
- [x] Invalid status transition returns `400`
- [x] Invalid pagination params return `400`
- [x] Invalid priority filter values return `400`
- [x] Empty `assignedTo` filter returns `400`
- [x] Invalid email/password on login returns `400` or `401`
- [x] Frontend form validation on login (email pattern, required password)

## Error Handling

- [x] Consistent JSON error shape: `{ success, statusCode, message, code?, details? }`
- [x] `401` `INVALID_CREDENTIALS` for wrong login
- [x] `401` `AUTHENTICATION_REQUIRED` for missing token
- [x] `401` `INVALID_TOKEN` / `TOKEN_EXPIRED` for bad/expired JWT
- [x] `403` `FORBIDDEN` for insufficient role permission
- [x] `403` `FORBIDDEN_ASSIGNED_TICKET_ONLY` for Developer on unassigned ticket
- [x] `404` for ticket/comment not found
- [x] Frontend displays API error messages on login failure
- [x] Frontend shows "Unable to reach the server" when backend is down
- [x] `401` from API triggers logout and redirect to login (non-login requests)

## Testing

- [x] Integration test: auth login (success, invalid credentials, invalid token)
- [x] Integration test: RBAC per role (QA, Support, Developer, Manager, Admin)
- [x] Integration test: ticket pagination and validation
- [x] Integration test: priority and assignee filters
- [x] Integration test: status transitions (valid and invalid)
- [x] Integration test: dashboard stats dynamic counts
- [x] Integration test: Swagger OpenAPI spec availability
- [x] `npm run build` compiles backend without TypeScript errors
- [ ] Unit tests for status machine and permissions (deferred)
- [ ] Frontend automated tests (deferred)

## Documentation

- [x] Root `README.md` with clone-and-run instructions
- [x] `backend/.env.example` and `frontend/.env.example`
- [x] `.gitignore` excludes secrets, DB files, build artifacts
- [x] OpenAPI docs for all endpoints including login and Bearer auth
- [x] `ai-practical-assessment/` submission package complete
- [x] Seed credentials documented in README
- [x] `tool-workflow.md` covers AI usage across lifecycle
