# Design Prompts

Representative prompts used for architecture and design decisions.

## Backend architecture

```
Implement ticket CRUD following repository → service → controller → routes pattern.
Use Zod validation. Return consistent error JSON.
```

## JWT authentication design

```
Add JWT Authentication.

Requirements:
- POST /auth/login
- Seed users should be able to login
- Generate JWT
- Protect all Ticket, Dashboard and Comment APIs
- Create authentication middleware
- Do not implement registration
- Store JWT secret in .env
- Return proper error messages
```

## Role-based authorization design

```
Implement Role Based Authorization.

Roles: Admin, Support, Developer, Manager, QA

Rules:
- Admin: Can do everything
- Support: Can create and update tickets
- Developer: Can update assigned tickets
- QA: Read Only
- Manager: Can view reports

Implement reusable authorize middleware.
```

## Frontend auth design

```
Implement Login Page.

Use Material UI. Fields: Email, Password.
Store JWT securely. Protect routes.
Unauthenticated users should be redirected to Login.
Keep existing routing unchanged.
```

## Docker design

```
Create production-ready Dockerfile for Express backend.

Requirements: Node 22, Prisma, Production build, Expose correct port, Use npm start
```

## Tips for design prompts

- List roles and rules in plain English — AI maps to permissions
- Name patterns to follow ("reusable middleware", "keep routing unchanged")
- Separate backend and frontend auth prompts for clearer scope
