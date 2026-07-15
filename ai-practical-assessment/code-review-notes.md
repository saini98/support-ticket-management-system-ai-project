# Code Review Notes

## AI-Assisted Review Summary

Cursor was used to audit the repository before GitHub push. The review covered:

| Area | Finding | Action |
| --- | --- | --- |
| Secrets | `.env` files present locally | Added to `.gitignore`; created `.env.example` |
| Build artifacts | `dist/`, `frontend/build/` tracked | Removed from git; added to `.gitignore` |
| Database files | `dev.db`, `test.db` in repo | Gitignored; removed `test.db` from tracking |
| Auth security | JWT in sessionStorage | Documented XSS trade-off; acceptable for dev |
| RBAC gaps | Manager permissions ambiguous | Clarified in `requirements-analysis.md` |
| Missing tests | No unit tests for status machine | Documented in `test-strategy.md` as deferred |
| Swagger | Protected routes missing Bearer | Added security scheme to OpenAPI config |

---

## My Review Observations

### Strengths

- Consistent layered architecture (routes → service → repository)
- Typed error hierarchy with specific codes (`FORBIDDEN_ASSIGNED_TICKET_ONLY`)
- Backward-compatible ticket list API (array vs paginated)
- Integration tests cover auth, RBAC, filters, and status machine
- Seed data provides realistic multi-role test scenarios

### Areas for improvement

- Frontend dashboard aggregates client-side instead of using `/api/dashboard/stats`
- No frontend role-based UI guards (API returns 403 but UI still shows actions)
- No User CRUD API despite User being a core entity
- JWT stored in `sessionStorage` (not production-hardened)
- No CI pipeline (GitHub Actions)
- Comment delete/update not exposed in API

---

## Changes Made After Review

| Change | File(s) | Reason |
| --- | --- | --- |
| Added root `.gitignore` | `.gitignore` | Prevent secrets and artifacts in git |
| Created `.env.example` files | `backend/`, `frontend/` | Safe template for new developers |
| Fixed JWT TypeScript types | `backend/src/utils/jwt.ts` | `npm run build` must pass |
| Increased Jest timeout | `backend/jest.config.cjs` | Prevent flaky Windows test runs |
| Added Swagger Bearer auth | `backend/src/config/swagger.ts` | Document protected endpoints correctly |
| Updated README | `README.md` | Clone-run instructions, seed credentials, troubleshooting |
| Assessment doc package | `ai-practical-assessment/` | Complete submission structure |

---

## Suggestions Rejected (and why)

| Suggestion | Reason rejected |
| --- | --- |
| Switch to httpOnly cookie auth | Out of assessment scope; would require CORS/cookie middleware changes |
| Add Redux for frontend state | Over-engineering; hooks + Context sufficient for current size |
| Replace SQLite with PostgreSQL | Assessment targets local dev simplicity; Docker/Postgres adds setup friction |
| Add user registration API | Explicitly out of scope; seed users sufficient for demo |
| Add refresh tokens | Not required; 24h JWT expiry acceptable for assessment |
| Frontend RBAC UI guards | API enforces permissions; UI guards deferred to keep frontend scope manageable |
| Add `docker-compose.yml` | Dockerfile exists; compose adds complexity without assessment requirement |
| Migrate dashboard to stats API | Works client-side; refactor planned but not blocking |
