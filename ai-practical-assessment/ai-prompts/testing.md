# Testing Prompts

Representative prompts used for test generation and execution.

## Integration tests

```
Add integration tests for auth login:
- successful login with seed user
- invalid credentials returns 401 INVALID_CREDENTIALS
- protected route returns 401 without token
- invalid bearer token returns 401
```

```
Add integration tests for role based authorization:
- QA can read but not create tickets
- Support can create and update
- Developer can update assigned tickets only
- Manager can view dashboard but not create tickets
- Only Admin can delete tickets
```

```
Add integration tests for ticket list pagination, priority filter, and assignedTo filter.
```

```
Add integration tests for ticket status transitions (valid and invalid).
```

## Test infrastructure

```
Update test helpers to support JWT auth: loginAsUser, authHeader.
Seed test users for all five roles in test database.
```

## Running tests

```
Run backend test suite and fix any failures.
```

## Tips for testing prompts

- Specify expected status codes and error codes
- Ask for tests in same prompt as feature implementation
- Mention backward compatibility scenarios explicitly
