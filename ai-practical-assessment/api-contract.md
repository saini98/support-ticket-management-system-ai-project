# API Contract

Base URL: `http://localhost:3000`  
Auth: `Authorization: Bearer <token>` on protected routes  
OpenAPI: `http://localhost:3000/api-docs`

---

## Endpoint: Login

**Method:** `POST`  
**Path:** `/auth/login`  
**Purpose:** Authenticate user and return JWT + user summary

### Request

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Response (200)

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clx...",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN"
    }
  }
}
```

### Validation Rules

| Field | Rule |
| --- | --- |
| `email` | Required, valid email format |
| `password` | Required, non-empty string |

### Error Responses

| Status | Code | When |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Invalid email format or missing fields |
| 401 | `INVALID_CREDENTIALS` | Wrong email or password |

---

## Endpoint: List Tickets

**Method:** `GET`  
**Path:** `/tickets`  
**Purpose:** List tickets with optional filters, pagination, and sorting

### Request (query params)

| Param | Type | Default | Notes |
| --- | --- | --- | --- |
| `search` | string | — | Title/description search |
| `status` | enum | — | OPEN, IN_PROGRESS, RESOLVED, CLOSED, CANCELLED |
| `priority` | enum | — | LOW, MEDIUM, HIGH, URGENT |
| `assignedTo` | string | — | User ID |
| `page` | number | — | If set, returns paginated response |
| `limit` | number | 10 | Max 100 |
| `sortBy` | string | `createdAt` | createdAt, updatedAt, title, priority, status |
| `sortOrder` | string | `desc` | asc or desc |

### Response (200) — paginated

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "ticket-1001",
        "title": "Login page not loading",
        "description": "...",
        "status": "OPEN",
        "priority": "HIGH",
        "createdById": "clx...",
        "assignedToId": "clx...",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z",
        "creator": { "id": "...", "name": "...", "email": "..." },
        "assignee": { "id": "...", "name": "...", "email": "..." }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

### Response (200) — legacy (no page param)

Returns `data` as a plain array of tickets.

### Validation Rules

- `page` and `limit` must be positive integers
- `sortOrder` must be `asc` or `desc`
- Invalid `priority` or empty `assignedTo` → 400

### Error Responses

| Status | Code | When |
| --- | --- | --- |
| 401 | `AUTHENTICATION_REQUIRED` | Missing token |
| 401 | `INVALID_TOKEN` / `TOKEN_EXPIRED` | Bad or expired JWT |
| 403 | `FORBIDDEN` | Role lacks `tickets:read` |
| 400 | `VALIDATION_ERROR` | Invalid query params |

---

## Endpoint: Create Ticket

**Method:** `POST`  
**Path:** `/tickets`  
**Purpose:** Create a new support ticket

### Request

```json
{
  "title": "Cannot reset password",
  "description": "User reports reset email never arrives",
  "priority": "MEDIUM",
  "assignedToId": "clx..."
}
```

### Response (201)

```json
{
  "success": true,
  "data": {
    "id": "ticket-1006",
    "title": "Cannot reset password",
    "description": "User reports reset email never arrives",
    "status": "OPEN",
    "priority": "MEDIUM",
    "createdById": "clx...",
    "assignedToId": "clx...",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### Validation Rules

| Field | Rule |
| --- | --- |
| `title` | Required, 1–200 chars |
| `description` | Required, min 1 char |
| `priority` | Optional enum; defaults to MEDIUM |
| `assignedToId` | Optional; must reference existing user |

### Error Responses

| Status | Code | When |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Invalid body |
| 401 | `AUTHENTICATION_REQUIRED` | Missing token |
| 403 | `FORBIDDEN` | Role lacks `tickets:create` |

---

## Endpoint: Update Ticket

**Method:** `PATCH`  
**Path:** `/tickets/:id`  
**Purpose:** Update ticket fields including status transitions

### Request

```json
{
  "title": "Updated title",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "assignedToId": "clx..."
}
```

### Response (200)

Returns updated ticket object in `data`.

### Validation Rules

- At least one field required
- `status` must follow state machine (e.g. OPEN → IN_PROGRESS, not CLOSED → OPEN)
- `assignedToId` must reference existing user if provided

### Error Responses

| Status | Code | When |
| --- | --- | --- |
| 400 | Bad Request | Invalid status transition |
| 401 | `AUTHENTICATION_REQUIRED` | Missing token |
| 403 | `FORBIDDEN` | Role lacks `tickets:update` |
| 403 | `FORBIDDEN_ASSIGNED_TICKET_ONLY` | Developer on unassigned ticket |
| 404 | Not Found | Ticket does not exist |

---

## Endpoint: List Comments

**Method:** `GET`  
**Path:** `/tickets/:ticketId/comments`  
**Purpose:** List comments for a ticket

### Request

No body. `ticketId` in path.

### Response (200)

```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "content": "Investigating the issue",
      "ticketId": "ticket-1001",
      "authorId": "clx...",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "author": { "id": "...", "name": "...", "email": "..." }
    }
  ]
}
```

### Validation Rules

- `ticketId` must exist

### Error Responses

| Status | Code | When |
| --- | --- | --- |
| 401 | `AUTHENTICATION_REQUIRED` | Missing token |
| 403 | `FORBIDDEN` | Role lacks `comments:read` |
| 404 | Not Found | Ticket not found |

---

## Endpoint: Create Comment

**Method:** `POST`  
**Path:** `/tickets/:ticketId/comments`  
**Purpose:** Add a comment to a ticket

### Request

```json
{
  "content": "Root cause identified in auth service"
}
```

### Response (201)

Returns created comment with author in `data`.

### Validation Rules

| Field | Rule |
| --- | --- |
| `content` | Required, 1–5000 chars |

### Error Responses

| Status | Code | When |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Empty or too long content |
| 401 | `AUTHENTICATION_REQUIRED` | Missing token |
| 403 | `FORBIDDEN` | Role lacks `comments:create` |
| 403 | `FORBIDDEN_ASSIGNED_TICKET_ONLY` | Developer on unassigned ticket |
| 404 | Not Found | Ticket not found |

---

## Endpoint: Dashboard Stats

**Method:** `GET`  
**Path:** `/api/dashboard/stats`  
**Purpose:** Return aggregated ticket counts by status and priority

### Request

No body. Requires auth.

### Response (200)

```json
{
  "success": true,
  "data": {
    "total": 5,
    "byStatus": {
      "OPEN": 2,
      "IN_PROGRESS": 1,
      "RESOLVED": 1,
      "CLOSED": 1,
      "CANCELLED": 0
    },
    "byPriority": {
      "LOW": 1,
      "MEDIUM": 2,
      "HIGH": 1,
      "URGENT": 1
    }
  }
}
```

### Validation Rules

None.

### Error Responses

| Status | Code | When |
| --- | --- | --- |
| 401 | `AUTHENTICATION_REQUIRED` | Missing token |
| 403 | `FORBIDDEN` | Role lacks `dashboard:read` |

---

## Common Error Shape

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    { "path": "email", "message": "Invalid email" }
  ]
}
```
