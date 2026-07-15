# Tool Workflow

This document describes how **Cursor** was used to build the Support Ticket Management System — from initial structure through authentication, authorization, frontend login, Docker, GitHub preparation, and workflow documentation.

---

## 1. Primary AI tool used

**Cursor** (IDE with integrated AI agent, version 3.8.x) was the sole AI development tool for this project.

Capabilities used:

| Capability | How it was used |
| --- | --- |
| **Agent mode** | End-to-end implementation of features (auth, RBAC, login page, Dockerfile) |
| **Chat / inline edits** | Targeted fixes and explanations |
| **Codebase exploration** | Agent searched files, read patterns, and matched existing conventions |
| **Terminal integration** | Running builds, tests, health checks, and git diagnostics |
| **Multi-file edits** | Creating middleware, routes, services, tests, and docs in one session |

**Tech context the tool operated in:** React + MUI frontend, Express + Prisma + SQLite backend, Jest integration tests, Swagger OpenAPI docs.

---

## 2. How project context is provided to the tool

Context was supplied in layers, from broad to persistent:

### Initial prompts

Early prompts defined the **tech stack**, **constraints**, and **scope** explicitly:

- "Generate only folder structure — do not generate code"
- "Use Material UI", "Repository → Service → Controller pattern"
- "Do not implement registration"
- "Keep existing routing unchanged"

Clear boundaries prevented over-generation and unwanted features.

### In-session context

During development, context was given by:

- Referencing **existing files** ("follow `CreateTicketForm.tsx` pattern")
- Listing **requirements as bullet points** (roles, permissions, API paths)
- Pointing to **errors verbatim** ("Unable to reach the server while logging in")

### Persistent project context (later phase)

After core features were built, documentation was organized under:

```
ai-practical-assessment/
├── design-notes.md           # Architecture, stack, conventions
├── api-contract.md           # API contracts, RBAC, routes
├── implementation-plan.md    # Done vs. remaining work
├── acceptance-criteria.md    # Definition of done
├── tool-workflow.md          # This document
└── ai-prompts/               # Prompt templates by phase

tool-specific/cursor-workflow/
├── cursor-rules-or-instructions.md
└── prompt-history.md         # Exported Cursor conversation
```

**Recommended prompt prefix for future sessions:**

```
Read ai-practical-assessment/design-notes.md and api-contract.md before making changes.
Follow tool-specific/cursor-workflow/cursor-rules-or-instructions.md. Do not change unrelated code.
```

### Cursor workspace rules

User-level and project-level rules reinforced:

- Minimal, reviewable diffs
- No secrets in code or commits
- Match existing patterns
- Run tests when behavior changes

---

## 3. How AI is used for requirement analysis

Requirements were stated in **natural language** and broken down by the agent before coding.

### Example: JWT authentication prompt

User provided:

- Login API (`POST /auth/login`)
- Seed users must be able to log in
- Protect Ticket, Dashboard, Comment APIs
- Reusable auth middleware
- No registration
- JWT secret in `.env`
- Proper error messages

**AI analysis steps:**

1. Mapped requirements to backend routes in `app.ts`
2. Identified seed users in `prisma/seed.ts` (plaintext passwords → bcrypt)
3. Defined error codes (`INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, etc.)
4. Planned frontend impact (login page, Axios interceptor, protected routes)
5. Scoped Swagger updates and integration tests

### Example: Role-based authorization

User listed five roles with plain-English rules. AI translated them into:

- A **permission map** (`tickets:read`, `tickets:update:assigned`, …)
- **Middleware** (`authorize`, `requireAssignedTicketAccess`)
- **Route-level enforcement** per HTTP method
- **Integration tests** per role scenario

### Clarification strategy

When requirements were ambiguous, the agent either:

- Inferred sensible defaults aligned with the domain (e.g. Manager can read tickets for report context), or
- Implemented the strictest interpretation documented in `api-contract.md` for later review

---

## 4. How AI is used for planning and design

Planning happened **inline** rather than in a separate design phase document.

| Area | Design approach |
| --- | --- |
| **Backend architecture** | Repository → Service → Controller → Routes; Zod validation middleware |
| **Auth** | Stateless JWT; `req.auth` augmentation; Bearer middleware at router mount |
| **RBAC** | Permission constants + `authorize(...permissions)` with OR logic; Admin bypass |
| **Developer role** | Separate `requireAssignedTicketAccess` middleware (loads ticket, checks `assigneeId`) |
| **Frontend auth** | `AuthContext` + `sessionStorage` + `ProtectedRoute` / `GuestRoute` |
| **Ticket list API** | Backward-compatible: plain array without pagination params; paginated object with params |
| **Docker** | Multi-stage build: deps → build (prisma generate + tsc) → production slim image |

The agent explored the codebase first (router setup, existing hooks, error format) before proposing file paths and patterns.

**Design artifacts produced:**

- `api-contract.md` — API and RBAC specification
- `acceptance-criteria.md` — testable checklist per feature
- OpenAPI JSDoc in `backend/src/docs/`

---

## 5. How AI is used for code generation

Code was generated **incrementally by feature**, not in one monolithic dump.

### Typical generation flow

1. **Types and utilities** — DTOs, JWT helpers, password hashing
2. **Data layer** — repositories, Prisma queries
3. **Business logic** — services, permission map, status machine
4. **HTTP layer** — controllers, routes, middleware
5. **Tests** — integration tests mirroring API contracts
6. **Frontend** — pages, context, interceptors, route guards
7. **Docs** — Swagger paths, README, `.env.example`

### Conventions enforced during generation

- Match existing file naming and import style (`.js` extensions in TypeScript ESM backend)
- Reuse `ApiError`, `validate`, `validateBody` patterns
- Frontend forms use `react-hook-form` + MUI like `CreateTicketForm.tsx`
- No new dependencies unless required (bcryptjs, jsonwebtoken added only for auth)

### Scope control

Prompts like **"Do not change application logic"** (GitHub prep) and **"Keep existing routing unchanged"** (login page) limited the diff to only what was requested.

---

## 6. How AI-generated code is validated

Validation used multiple layers:

### Automated

| Check | Command / tool |
| --- | --- |
| TypeScript compile | `npm run build` (backend) |
| Integration tests | `npm test` (backend, Jest + Supertest) |
| Health endpoint | `GET http://localhost:3000/health` |
| Login API | `POST /auth/login` with seed credentials |
| Swagger | `GET /api-docs.json` structure assertions |

### Manual / functional

- Start backend (`npm run dev`) and frontend (`npm start`)
- Log in with seed users (`admin@example.com` / `password123`)
- Verify protected routes return 401 without token
- Verify RBAC: QA cannot create tickets; Developer cannot update unassigned tickets

### Acceptance criteria

`acceptance-criteria.md` defines per-feature checklists used to confirm completeness before marking tasks done in `implementation-plan.md`.

### What was caught during validation

- Backend not running → frontend "Unable to reach the server" (environment, not code bug)
- `jwt.ts` TypeScript build error → fixed `SignOptions` typing for Docker production build
- Prisma generated client excluded from `tsc` → copied into `dist/` in Dockerfile
- Git push failure → GitHub PAT required (auth config, not repository content)

---

## 7. How AI is used for testing

### Test generation

AI authored **backend integration tests** alongside features:

| Test file | Covers |
| --- | --- |
| `auth.login.test.ts` | Login success, invalid credentials, missing token |
| `auth.authorization.test.ts` | RBAC per role (QA, Support, Developer, Manager, Admin) |
| `ticket-list.pagination.test.ts` | Pagination params and validation errors |
| `ticket-list.priority.test.ts` | Priority filter |
| `ticket-list.assigned-to.test.ts` | Assignee filter |
| `ticket-status.transitions.test.ts` | Valid and invalid status changes |
| `dashboard.stats.test.ts` | Dynamic stats from database |
| `swagger.docs.test.ts` | OpenAPI spec availability |

### Test helpers

AI created reusable helpers in `tests/helpers/`:

- `loginAsUser()` — obtains JWT for test requests
- `authHeader()` — formats Bearer header
- `createTestTicket()` — authenticated ticket creation
- `initializeTestDatabase()` — isolated SQLite test DB with seeded roles

### Test execution

- Agent ran `npm test` after behavioral changes
- Increased Jest `testTimeout` to 30s for slow Prisma `db push` in `beforeAll`
- Tests run in band (`--runInBand`) to avoid SQLite file locking on Windows

### Gaps (documented in implementation-plan.md)

- No dedicated **unit test** tier yet (services, validators tested via integration only)
- No **frontend** automated tests yet

---

## 8. How AI is used for debugging

Debugging followed a **symptom → cause → fix** loop with the agent running diagnostics.

### Example: Login "Unable to reach the server"

1. **Symptom:** Frontend `ApiError` with status 0
2. **Diagnosis:** Axios `error.request` set — no HTTP response (network-level failure)
3. **Checks:** `Invoke-WebRequest` to `/health` → connection refused
4. **Root cause:** Backend not running (only frontend `npm start` active)
5. **Fix:** Start `npm run dev` in `backend/`; verify health returns `{"status":"ok"}`

### Example: Git push authentication failure

1. **Symptom:** `fatal: Authentication failed`
2. **Diagnosis:** GitHub message: "Password authentication is not supported"
3. **Root cause:** HTTPS push with account password instead of PAT
4. **Fix:** Create Personal Access Token; clear Windows Credential Manager; push with PAT

### Example: TypeScript build failure (Docker)

1. **Symptom:** `tsc` error on `jwt.sign` `expiresIn` type
2. **Fix:** Typed `SignOptions` explicitly without changing auth behavior

### Debugging practices used

- Read terminal output and linter errors
- Hit API endpoints directly (PowerShell `Invoke-RestMethod`)
- Trace error messages to source (`client.ts` interceptor → `ApiError` message)
- Avoid guessing — verify with runtime checks before patching

---

## 9. How AI is used for code review

Formal PR review was not used (solo project). Review happened through:

### Self-review via acceptance criteria

Before closing a feature, the agent checked items in `acceptance-criteria.md` (status codes, error codes, route protection, Swagger).

### Implicit review constraints in prompts

- "Only prepare repository for GitHub — do not change application logic"
- "Minimal & reviewable changes"
- "Follow existing patterns"

### Repository prep review

AI audited the repo for GitHub readiness:

- Confirmed `.gitignore` covers `node_modules`, `dist`, `build`, `.env`, `*.db`, `coverage`
- Removed build artifacts (`dist/`, `frontend/build/`, `test.db`)
- Verified no secrets in tracked files
- Created `README.md` with clone-and-run steps

### What a human should still review

- Security: JWT in `sessionStorage` vs. httpOnly cookies for production
- RBAC edge cases (e.g. Manager ticket write access)
- Performance: frontend dashboard fetches all tickets client-side
- Dependency versions and license compliance

---

## 10. Information avoided sharing unnecessarily with AI

| Do not share | Reason |
| --- | --- |
| **Real JWT secrets** | Use placeholders in `.env.example`; real values only in local `.env` (gitignored) |
| **Production credentials** | Seed password `password123` is dev-only and documented intentionally |
| **Personal Access Tokens** | GitHub PATs must never appear in chat, code, or commits |
| **Private API keys** | None used in this project; rule applies for future integrations |
| **Customer / PII data** | Use seed users with `@example.com` emails only |
| **Full database dumps** | SQLite files gitignored; not pasted into prompts |
| **Unrelated proprietary code** | Prompts scoped to this repository |

### Safe to share with AI

- Error messages and stack traces (redact tokens if present)
- File paths and code structure
- Requirement lists and acceptance criteria
- Public tech stack choices
- Exported prompt history for assessment (no secrets included)

---

## 11. Reusing this workflow in a real project

### Phase 1 — Setup

1. Define tech stack and architecture in a short `project-context.md`
2. Add Cursor rules: minimal diffs, no secrets, match conventions
3. Create `.env.example` files from day one
4. Set up `.gitignore` before first commit

### Phase 2 — Build iteratively

1. **One feature per prompt** with explicit requirements and out-of-scope items
2. Ask AI to **explore the codebase first** before implementing
3. Generate **tests with the feature**, not after
4. Update `spec.md` and `tasks.md` as the source of truth

### Phase 3 — Validate continuously

1. Run `npm test` and `npm run build` after each backend change
2. Smoke-test in browser for full-stack features
3. Use `acceptance-criteria.md` as a release checklist

### Phase 4 — Harden for production

1. GitHub prep: ignore secrets, add README, document setup
2. Docker / CI when ready (placeholder folders can become workflows)
3. Human security review on auth, RBAC, and data handling

### Reusable prompt templates

```
Implement [FEATURE].

Requirements:
- [bullet list]

Constraints:
- Follow patterns in [existing file]
- Do not change unrelated code
- Add/update integration tests
- Update Swagger if API changes

Read tool-specific/cursor-workflow/project-context.md first.
```

```
Debug: [error message]

What I tried: [steps]
Expected: [behavior]
Actual: [behavior]
```

### Folder structure to copy

```
ai-practical-assessment/
├── design-notes.md
├── api-contract.md
├── implementation-plan.md
├── acceptance-criteria.md
├── tool-workflow.md
└── ai-prompts/

tool-specific/cursor-workflow/
├── cursor-rules-or-instructions.md
└── prompt-history.md
```

### Key lessons from this project

1. **Persistent context beats long chat history** — docs in-repo survive session resets
2. **Explicit out-of-scope items** prevent unwanted features (e.g. no registration)
3. **Verify environment first** — many "bugs" are missing servers or auth config
4. **Integration tests anchor AI output** — catch regressions when iterating with AI
5. **Separate repo-prep prompts from feature prompts** — avoids accidental logic changes

---

## Summary

| Phase | AI role | Human role |
| --- | --- | --- |
| Requirements | Parse, map to architecture, flag gaps | Provide clear scope and priorities |
| Design | Propose patterns matching codebase | Approve trade-offs (auth storage, RBAC rules) |
| Implementation | Generate code, tests, docs | Review diffs, run app |
| Validation | Run builds/tests, diagnose errors | Confirm UX and business rules |
| Publishing | Audit gitignore, README, secrets | Manage GitHub PAT / CI secrets |

This workflow is repeatable for any full-stack project where Cursor acts as an implementation partner, with the human retaining ownership of requirements, security decisions, and final approval.
