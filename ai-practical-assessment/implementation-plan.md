# Implementation Plan

## Overview

Build a full-stack **Support Ticket Management System** in phased increments using **Cursor** as the primary AI tool. Each phase delivers a testable vertical slice before moving to the next. Backend is implemented first to establish API contracts; frontend follows once endpoints are stable.

**Duration:** Multi-session iterative development  
**Approach:** Feature-by-feature prompts with explicit scope boundaries  
**Quality gates:** Integration tests + manual smoke test per phase

---

## Task Breakdown

### Phase 1 — Foundation
- [x] Project folder structure (frontend, backend, docs, tool-specific)
- [x] Prisma schema: User, Ticket, Comment
- [x] Repository → Service → Controller → Routes
- [x] Ticket CRUD + readable IDs
- [x] Status state machine
- [x] Comment CRUD
- [x] Seed script (5 users, 5 tickets)

### Phase 2 — API enhancements
- [x] Search and status filter
- [x] Priority and assignee filters
- [x] Pagination and sorting
- [x] Backward-compatible list response
- [x] Dashboard stats endpoint

### Phase 3 — Authentication
- [x] JWT login API + bcrypt passwords
- [x] `authenticate` middleware
- [x] Protect ticket/dashboard/comment routes
- [x] Frontend login page + `AuthContext`
- [x] `ProtectedRoute` + Axios interceptors
- [x] Integration tests: `auth.login.test.ts`

### Phase 4 — Authorization
- [x] Permission map (`backend/src/auth/permissions.ts`)
- [x] `authorize` middleware
- [x] `requireAssignedTicketAccess` for Developer
- [x] Integration tests: `auth.authorization.test.ts`

### Phase 5 — Frontend UI
- [x] Dashboard (responsive, charts, timeline)
- [x] Ticket list, create, detail, edit pages
- [x] Ticket # display in UI

### Phase 6 — DevOps & docs
- [x] Swagger OpenAPI 3
- [x] Production Dockerfile
- [x] GitHub prep (`.gitignore`, README, `.env.example`)
- [x] Assessment documentation package

### Phase 7 — Future (not started)
- [ ] GitHub Actions CI
- [ ] `docker-compose.yml`
- [ ] User CRUD API
- [ ] Frontend role-based UI guards
- [ ] Unit and E2E tests

---

## Milestones

| # | Milestone | Target | Status |
| --- | --- | --- | --- |
| M1 | Core ticket API | Ticket + comment CRUD, status machine | ✅ Done |
| M2 | List API v2 | Filters, pagination, sorting | ✅ Done |
| M3 | Auth | JWT login, protected routes | ✅ Done |
| M4 | RBAC | 5 roles, permission middleware | ✅ Done |
| M5 | Frontend | Login, dashboard, ticket pages | ✅ Done |
| M6 | DevOps | Docker, GitHub-ready repo | ✅ Partial |
| M7 | Assessment | Full doc submission package | ✅ Done |

---

## AI Usage Plan

| Phase | AI role | Human role |
| --- | --- | --- |
| Planning | Generate folder structure, map requirements | Define tech stack and scope |
| Design | Propose architecture matching patterns | Approve RBAC rules, auth approach |
| Implementation | Generate code, tests, Swagger docs | Review diffs, run app |
| Testing | Write integration tests, run `npm test` | Manual browser smoke tests |
| Debugging | Diagnose errors from logs/health checks | Start servers, manage credentials |
| Documentation | README, assessment docs, `.gitignore` audit | Export prompt history, verify accuracy |
| Review | Audit repo for secrets and artifacts | Final acceptance sign-off |

**Prompt strategy:** One feature per prompt; always include out-of-scope items and reference files to follow.

---

## Risks

| Risk | Impact | Likelihood |
| --- | --- | --- |
| AI generates out-of-scope features | Rework, bloated codebase | Medium |
| Secrets committed to git | Security breach | Medium |
| Auth mismatch between frontend/backend | 401 loops, broken login | Medium |
| SQLite locking on Windows tests | Flaky CI | High |
| JWT in sessionStorage | XSS token theft in production | Medium |
| Ambiguous RBAC rules (Manager) | Wrong permissions shipped | Low |
| GitHub PAT confusion | Cannot push repo | High |
| Backend not running during frontend test | False "server unreachable" bug reports | High |

---

## Mitigation

| Risk | Mitigation |
| --- | --- |
| Scope creep | Explicit "do not implement X" in every prompt; `acceptance-criteria.md` checklist |
| Secrets in git | `.gitignore` from day one; `.env.example` only; AI audit before push |
| Auth mismatch | Implement backend auth first; integration tests before frontend wiring |
| SQLite test flakiness | `--runInBand`; `testTimeout: 30000`; isolated `test.db` |
| JWT storage | Document trade-off; plan httpOnly cookies for production |
| RBAC ambiguity | Document decisions in `requirements-analysis.md` clarifications table |
| GitHub push | Document PAT steps in `debugging-notes.md` |
| Missing backend | README states both servers required; health check in debugging flow |
