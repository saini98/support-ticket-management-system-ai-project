# UI Flow

## Route map

| Path | Component | Layout | Auth |
| --- | --- | --- | --- |
| `/login` | LoginPage | None | Public (guest only) |
| `/` | DashboardPage | DashboardLayout | Protected |
| `/tickets` | TicketListPage | MainLayout | Protected |
| `/tickets/new` | CreateTicketPage | MainLayout | Protected |
| `/tickets/:id` | TicketDetailPage | MainLayout | Protected |
| `/tickets/:id/edit` | EditTicketPage | MainLayout | Protected |
| `*` | NotFoundPage | MainLayout | Protected |

## Authentication flow

```
User visits protected URL
        │
        ▼
  Has JWT in sessionStorage?
        │
   No ──┼── Yes
   │         │
   ▼         ▼
Redirect   Allow access
to /login  attach Bearer token
   │         on API calls
   ▼
Login form (email + password)
   │
   ▼
POST /auth/login
   │
   ├── Success → store token + user → redirect to intended page
   └── Failure → show error message
```

## Login page

- Material UI centered card
- Fields: Email, Password
- Submit → `AuthContext.login()` → `authApi.login()`
- Error display via `ApiError.message`

## Dashboard flow (`/`)

1. User lands on dashboard after login
2. `useDashboardData` fetches tickets and comments
3. Displays: stat cards, charts, recent tickets, activity timeline, engineers grid
4. Responsive layout: sidebar drawer on mobile

## Ticket list flow (`/tickets`)

1. `useTickets` fetches from `GET /tickets`
2. Filter bar: search text, status dropdown
3. Table shows ticket #, title, status, priority, assignee
4. Click row → navigate to `/tickets/:id`

## Create ticket flow (`/tickets/new`)

1. `CreateTicketForm` with title, description, priority, creator, assignee
2. `UserSelectField` loads users from ticket API
3. Submit → `POST /tickets` → redirect to detail page

## Ticket detail flow (`/tickets/:id`)

1. `useTicketDetails` loads ticket
2. Shows `TicketInfoCard`, `StatusUpdate`, `Comments`
3. Edit button → `/tickets/:id/edit`
4. Status update → `PUT /tickets/:id` with allowed transitions from API

## Sign out flow

- Dashboard header: logout icon
- Main layout: Sign out button
- Clears sessionStorage → redirect to `/login`

## Role impact on UI (current)

| Role | UI behavior |
| --- | --- |
| All authenticated | Can access protected routes |
| QA | API returns 403 on create/update (no UI guard yet) |
| Developer | API blocks update on unassigned tickets |
| Manager | Can view dashboard; API blocks ticket creation |

**Note:** Frontend does not yet hide actions by role — relies on API 403. Planned improvement in `implementation-plan.md`.

## Ports

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3003 |
| Backend API | http://localhost:3000 |
