# Seed Data

## Seed script

**File:** `backend/prisma/seed.ts`

**Run:**
```bash
cd backend
npx prisma db seed
```

## Seed users

All passwords: **`password123`** (bcrypt hashed on insert)

| ID | Name | Email | Role |
| --- | --- | --- | --- |
| user-alice-admin | Alice Admin | admin@example.com | ADMIN |
| user-bob-developer | Bob Developer | developer@example.com | DEVELOPER |
| user-carol-support | Carol Support | support@example.com | SUPPORT |
| user-david-manager | David Manager | manager@example.com | MANAGER |
| user-eve-qa | Eve QA | qa@example.com | QA |

## Seed tickets

| ID | Title | Status | Priority | Assignee |
| --- | --- | --- | --- | --- |
| ticket-1001 | Login page not loading | OPEN | URGENT | Carol Support |
| ticket-1002 | Export report fails with timeout | IN_PROGRESS | HIGH | Bob Developer |
| ticket-1003 | Update billing address form validation | RESOLVED | MEDIUM | Eve QA |
| ticket-1004 | Dark mode contrast on dashboard widgets | CLOSED | LOW | Alice Admin |
| ticket-1005 | Duplicate notifications on mobile app | CANCELLED | HIGH | David Manager |

## Test seed users

**File:** `backend/tests/helpers/database.ts`

Separate test users (also `password123`):

- `test-admin@example.com` (ADMIN)
- `test-support@example.com` (SUPPORT)
- `test-developer@example.com` (DEVELOPER)
- `test-qa@example.com` (QA)
- `test-manager@example.com` (MANAGER)

## Re-seed after changes

Re-run seed when:

- Password hashing logic changes
- User roles or emails change
- Sample ticket data is updated

```bash
npx prisma db seed
```

**Warning:** Seed deletes all comments, tickets, and users before re-inserting.
