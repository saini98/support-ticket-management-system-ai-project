# Implementation Prompts

Representative prompts used for code generation.

## Ticket features

```
Add readable ticket IDs (ticket-1001, ticket-1002) in seed and API.
```

```
Add ticket list filters: status, search, priority, assignedTo.
Support pagination with page, limit, sortBy, sortOrder.
Keep backward compatible plain array when no pagination params.
```

```
Implement ticket status transitions with validation.
Reject invalid transitions (e.g. Open → Closed).
```

## Dashboard

```
Implement GET /api/dashboard/stats with dynamic counts from database.
```

```
Make dashboard responsive: mobile sidebar drawer, stats grid breakpoints.
```

## Frontend tickets

```
Show ticket number and title in Activity Timeline and Recent Tickets.
```

```
Add ticket list page with filters bar and table.
```

## API documentation

```
Add Swagger OpenAPI 3 documentation at /api-docs.
Document Bearer auth on protected routes.
```

## Tips for implementation prompts

- Reference existing files: "follow CreateTicketForm.tsx pattern"
- One feature per prompt when possible
- Include "do not change unrelated code" for focused diffs
