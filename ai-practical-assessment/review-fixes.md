# Review Fixes

Fixes applied in response to review findings, debugging, and build failures.

| # | Issue | Fix | File(s) |
| --- | --- | --- | --- |
| 1 | JWT `expiresIn` TypeScript error | Added explicit `SignOptions` typing | `backend/src/utils/jwt.ts` |
| 2 | Prisma client missing in Docker dist | Copy generated client after `npm run build` | `backend/Dockerfile` |
| 3 | Jest hook timeout | `testTimeout: 30000` | `backend/jest.config.cjs` |
| 4 | Secrets in repo risk | Root + package `.gitignore`, `.env.example` | `.gitignore`, `backend/.env.example` |
| 5 | Build artifacts committed | Removed `dist/`, `frontend/build/`, `test.db` | gitignored |
| 6 | Login server error UX | Documented need for both servers | `README.md` |
| 7 | GitHub push failure | Documented PAT requirement | User guidance |
| 8 | Swagger 301 on `/api-docs` | Test uses `/api-docs/` | `swagger.docs.test.ts` |

## Intentionally deferred

| Item | Reason |
| --- | --- |
| Frontend role-based UI guards | Future sprint |
| httpOnly cookie auth | Requires refresh token design |
| Dashboard API refactor | Optimization deferred |
| GitHub Actions CI | Not yet implemented |
