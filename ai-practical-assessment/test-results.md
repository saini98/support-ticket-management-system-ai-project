# Test Results

## Summary

Backend integration tests cover auth, RBAC, ticket filters, status transitions, dashboard, and Swagger.

| Suite | Tests | Status |
| --- | --- | --- |
| `auth.login.test.ts` | Login, invalid credentials, token validation | ✅ Pass |
| `auth.authorization.test.ts` | RBAC per role (5 scenarios) | ✅ Pass |
| `ticket-list.pagination.test.ts` | Pagination and validation | ✅ Pass |
| `ticket-list.priority.test.ts` | Priority filter | ✅ Pass |
| `ticket-list.assigned-to.test.ts` | Assignee filter | ✅ Pass |
| `ticket-status.transitions.test.ts` | Valid/invalid transitions | ✅ Pass |
| `dashboard.stats.test.ts` | Dynamic stats | ✅ Pass |
| `swagger.docs.test.ts` | OpenAPI availability | ✅ Pass |

## Run commands

```bash
cd backend

# All tests
npm test

# Integration only
npm run test:integration

# Single suite
npm test -- tests/integration/auth.authorization.test.ts
```

## Sample output (auth.authorization)

```
PASS tests/integration/auth.authorization.test.ts
  Role based authorization
    ✓ allows QA to read tickets but not create them
    ✓ allows Support to create and update tickets
    ✓ allows Developer to update only assigned tickets
    ✓ allows Manager to view reports but not create tickets
    ✓ allows only Admin to delete tickets
```

## Known test environment notes

- Jest `testTimeout` set to **30s** for slow `prisma db push` in `beforeAll`
- Tests run `--runInBand` to avoid SQLite `EBUSY` on Windows when parallel
- Occasional timeout if machine is under load — re-run single suite

## Not covered by automated tests

- Frontend login UI flow (manual)
- Docker container health check (manual)
- Cross-browser compatibility (manual)

## Build verification

```bash
cd backend
npm run build   # TypeScript compile to dist/
```

Fixed during Docker prep: `jwt.ts` `SignOptions` typing for `expiresIn`.
