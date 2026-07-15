# Tests

This folder documents where tests live in the repository.

## Actual test location

**Backend integration tests:** [`../../backend/tests/`](../../backend/tests/)

```
backend/tests/
├── integration/       # API integration tests (Jest + Supertest)
│   ├── auth.login.test.ts
│   ├── auth.authorization.test.ts
│   ├── ticket-list.pagination.test.ts
│   ├── ticket-list.priority.test.ts
│   ├── ticket-list.assigned-to.test.ts
│   ├── ticket-status.transitions.test.ts
│   ├── dashboard.stats.test.ts
│   └── swagger.docs.test.ts
├── helpers/           # Test utilities
│   ├── app.ts
│   ├── auth.ts
│   └── database.ts
└── setup-env.ts
```

## Run tests

```bash
cd backend
npm test                  # all tests
npm run test:integration  # integration only
```

## Frontend tests

Not yet implemented. `react-scripts test` is available in `frontend/` when tests are added.

## Documentation

- [test-strategy.md](../test-strategy.md)
- [test-results.md](../test-results.md)
- [acceptance-criteria.md](../acceptance-criteria.md)
