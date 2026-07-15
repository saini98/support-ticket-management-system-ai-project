# Data Model

## Source of truth

- **Schema:** `backend/prisma/schema.prisma`
- **Migrations:** `backend/prisma/migrations/`
- **Seed:** `backend/prisma/seed.ts`

## Entity relationship diagram

```
┌──────────┐       creates        ┌──────────┐
│   User   │─────────────────────►│  Ticket  │
│          │◄──── assigns ────────│          │
└──────────┘                      └──────────┘
     │                                   │
     │ authors                           │ has many
     ▼                                   ▼
┌──────────┐                      ┌──────────┐
│ Comment  │◄─────────────────────│          │
└──────────┘                      └──────────┘
```

## Enums

### UserRole

`ADMIN` | `DEVELOPER` | `SUPPORT` | `MANAGER` | `QA`

### TicketStatus

`OPEN` | `IN_PROGRESS` | `RESOLVED` | `CLOSED` | `CANCELLED`

### TicketPriority

`LOW` | `MEDIUM` | `HIGH` | `URGENT`

## Models

### User

| Field | Type | Notes |
| --- | --- | --- |
| id | String | cuid, primary key |
| email | String | unique |
| name | String | |
| password | String | bcrypt hash |
| role | UserRole | default DEVELOPER |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Relations:** `createdTickets`, `assignedTickets`, `comments`

### Ticket

| Field | Type | Notes |
| --- | --- | --- |
| id | String | Readable ID (e.g. `ticket-1001`), not auto-generated |
| title | String | |
| description | String | |
| status | TicketStatus | default OPEN |
| priority | TicketPriority | default MEDIUM |
| creatorId | String | FK → User |
| assigneeId | String? | FK → User, nullable |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Relations:** `creator`, `assignee`, `comments`

**Cascade:** Comments deleted when ticket deleted

### Comment

| Field | Type | Notes |
| --- | --- | --- |
| id | String | cuid |
| content | String | |
| ticketId | String | FK → Ticket |
| authorId | String | FK → User |
| createdAt | DateTime | |
| updatedAt | DateTime | |

## API nested objects

Tickets and comments returned with nested user summaries:

```json
{
  "creator": { "id": "...", "name": "...", "email": "...", "role": "ADMIN" },
  "assignee": { "id": "...", "name": "...", "email": "...", "role": "SUPPORT" }
}
```

## Generated Prisma client

Output path: `backend/src/infrastructure/prisma/generated/`

Regenerate after schema changes:

```bash
cd backend
npx prisma generate
```

## Database file

- Development: `backend/dev.db` (gitignored)
- Tests: `backend/test.db` (gitignored)
- Connection: `DATABASE_URL="file:./dev.db"`
