# Support Ticket Management System

Full-stack support ticket application with JWT authentication, role-based authorization, dashboard analytics, and OpenAPI documentation.

## Tech stack

| Layer | Stack |
| --- | --- |
| Backend | Node.js, Express, TypeScript, Prisma, SQLite |
| Frontend | React, TypeScript, Material UI, React Router |
| Auth | JWT (Bearer tokens), bcrypt password hashing |
| API docs | Swagger / OpenAPI 3 |

## Prerequisites

- Node.js 20+ (Node 22 recommended for Docker)
- npm

## Quick start

### 1. Clone the repository

```bash
git clone <repository-url>
cd support-ticket-system-ai-project
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

The API runs at **http://localhost:3000**.

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

The app runs at **http://localhost:3003** (configured in `frontend/.env.example` to avoid port conflicts with the API).

## Seed login credentials

All seed users share the password **`password123`**:

| Role | Email |
| --- | --- |
| Admin | `admin@example.com` |
| Developer | `developer@example.com` |
| Support | `support@example.com` |
| Manager | `manager@example.com` |
| QA | `qa@example.com` |

## Environment variables

### Backend (`backend/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `DATABASE_URL` | SQLite connection string | `file:./dev.db` |
| `PORT` | API port | `3000` |
| `NODE_ENV` | Runtime environment | `development` |
| `JWT_SECRET` | Secret for signing JWTs | long random string |
| `JWT_EXPIRES_IN` | Token lifetime | `24h` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | Dev server port | `3003` |
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:3000` |

Copy from `.env.example` in each package — **never commit real `.env` files**.

## Useful commands

### Backend

```bash
npm run dev              # Start dev server with hot reload
npm run build            # Compile TypeScript to dist/
npm start                # Run production build
npm test                 # Run integration tests
npm run test:integration # Run integration tests only
```

### Frontend

```bash
npm start                # Start development server
npm run build            # Production build
npm test                 # Run tests
```

## API documentation

With the backend running:

- Swagger UI: **http://localhost:3000/api-docs**
- OpenAPI JSON: **http://localhost:3000/api-docs.json**

## Docker (backend)

```bash
cd backend
docker build -t support-ticket-api .
docker run --rm -p 3000:3000 \
  -e JWT_SECRET=replace-with-a-long-random-secret \
  -e DATABASE_URL=file:/app/data/prod.db \
  -v support-ticket-data:/app/data \
  support-ticket-api
```

Requires Docker Desktop. Initialize the database on first run with `npx prisma db push` and `npx prisma db seed` inside the container.

## Project structure

```
support-ticket-system-ai-project/
├── backend/          # Express API, Prisma, tests
├── frontend/         # React SPA
├── .gitignore
└── README.md
```

## Security notes

- Do not commit `.env` files or database files (`.db`).
- Change `JWT_SECRET` before deploying to production.
- Seed passwords are for local development only.

## Roles and permissions

| Role | Access |
| --- | --- |
| Admin | Full access |
| Support | Create and update tickets |
| Developer | Update assigned tickets only |
| QA | Read-only |
| Manager | View reports (dashboard) and read tickets |
