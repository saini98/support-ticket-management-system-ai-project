# Reflection

## What I Built

A full-stack **Support Ticket Management System** with:

- **Backend:** Express + TypeScript + Prisma + SQLite
- **Frontend:** React + MUI + React Router
- **Features:** JWT auth, 5-role RBAC, ticket CRUD with readable IDs, status state machine, nested comments, search/filters/pagination, dashboard stats API, Swagger docs, production Dockerfile
- **Tests:** 7 integration test suites covering auth, authorization, tickets, and dashboard
- **Docs:** Complete `ai-practical-assessment/` submission package

---

## How I Used AI (across the lifecycle)

| Phase | AI tool | What I asked |
| --- | --- | --- |
| Planning | Cursor | Folder structure, requirements breakdown, entity design |
| Design | Cursor | Auth flow, RBAC permission map, API layering |
| Implementation | Cursor | Feature-by-feature code generation (auth, RBAC, filters, login UI) |
| Testing | Cursor | Integration test suites, Jest config fixes |
| Debugging | Cursor | Diagnose login errors, TypeScript build failures, test timeouts |
| Documentation | Cursor | README, assessment docs, API contract, acceptance criteria |
| Review | Cursor | Pre-push audit for secrets, artifacts, missing tests |

**Primary tool:** Cursor (Composer agent mode)  
**Prompt history:** `tool-specific/cursor-workflow/prompt-history.md`

---

## What AI Helped With Most

1. **Boilerplate velocity** — Repository/service/controller/route scaffolding for each feature
2. **RBAC design** — Permission map and middleware chain generated quickly with correct Express patterns
3. **Integration tests** — Supertest suites with role-based scenarios saved significant time
4. **Documentation** — Assessment docs, API contract, and README drafted from codebase context
5. **Debugging** — Quick diagnosis of TypeScript errors, Jest timeouts, and connectivity issues

---

## What AI Got Wrong

| Issue | What happened | How I caught it |
| --- | --- | --- |
| Backend assumed running | AI tested login without verifying server | Manual Network tab check |
| Scope creep risk | AI sometimes suggested registration, refresh tokens | Explicit out-of-scope in prompts |
| Windows SQLite locking | Initial test config didn't account for parallel runs | EBUSY errors → `--runInBand` |
| Dashboard data source | Frontend built before stats API existed | Client-side aggregation still in place |
| Git push auth | AI suggested push without PAT context | GitHub rejected password auth |

---

## How I Validated AI Output

1. **Ran the app** — Both `npm run dev` servers; manual login and ticket flows
2. **Ran tests** — `npm test -- --runInBand` after every backend change
3. **Built production** — `npm run build` to catch TypeScript errors
4. **Checked git** — `git status` and diff review before commit
5. **Read generated code** — Reviewed middleware order, permission map, error codes
6. **Cross-referenced docs** — Ensured API contract matches actual routes and responses

---

## What I Would Improve Next

1. Add GitHub Actions CI (lint, build, test on push)
2. Add `docker-compose.yml` for one-command startup
3. Wire frontend dashboard to `/api/dashboard/stats`
4. Add frontend RBAC UI guards (hide actions per role)
5. Add unit tests for `ticket-status.machine.ts` and `permissions.ts`
6. Add React Testing Library tests for `LoginPage` and `ProtectedRoute`
7. Implement User CRUD API (Admin-only)
8. Switch to httpOnly cookie auth for production

---

## Reusable Workflow (prompts, rules, specs, templates)

### Prompt pattern

```
Implement [feature] in [file paths].
Follow existing patterns in [reference files].
Do NOT implement [out-of-scope items].
Include integration tests.
```

### Cursor rules

- `tool-specific/cursor-workflow/cursor-rules-or-instructions.md` — project conventions for AI
- Workspace rules — security, minimal diffs, no secrets

### Spec templates

| Template | File |
| --- | --- |
| Requirements | `requirements-analysis.md` |
| Acceptance criteria | `acceptance-criteria.md` |
| API contract | `api-contract.md` |
| Test strategy | `test-strategy.md` |
| PR description | `pr-description.md` |

### Lifecycle workflow

1. Write/update requirements and acceptance criteria
2. Prompt AI with scoped feature + reference files
3. Review diff, run tests, manual smoke test
4. Log debugging issues in `debugging-notes.md`
5. AI-assisted code review before push
6. Fill reflection and PR description

See [tool-workflow.md](./tool-workflow.md) for the full AI-assisted development lifecycle.
