# Debugging Notes

## Issue 1: Login shows "Unable to reach the server"

### Problem

Frontend login page displayed "Unable to reach the server" even with correct credentials.

### How I Investigated

1. Opened browser DevTools → Network tab → login request failed (no response)
2. Checked if backend was running on port 3000
3. Ran `curl http://localhost:3000/health` — connection refused
4. Verified `frontend/.env` had `VITE_API_BASE_URL=http://localhost:3000`

### How AI Helped

Cursor suggested checking backend process and confirmed the Axios interceptor maps network errors to a user-friendly message. AI also pointed to the health endpoint for a quick connectivity check.

### What I Validated

- Started backend with `cd backend && npm run dev`
- Health endpoint returned 200
- Login succeeded with `admin@example.com` / `password123`

### Final Fix

No code change required. **Root cause:** backend not running. Added explicit note in README that both servers must be started.

---

## Issue 2: TypeScript build error in `jwt.ts`

### Problem

`npm run build` failed with `jwt.sign` overload/type error for `expiresIn`.

### How I Investigated

1. Ran `npm run build` in `backend/`
2. Read the exact `tsc` error pointing to `jwt.ts`
3. Compared with `jsonwebtoken` type definitions for `SignOptions`

### How AI Helped

AI generated a fix using explicit `SignOptions` typing and casting `expiresIn` to the expected type, matching the project's existing pattern.

### What I Validated

- `npm run build` completed without errors
- Login still returned valid JWT
- Integration tests still passed

### Final Fix

Updated `backend/src/utils/jwt.ts` to use explicit `SignOptions` for `jwt.sign()` options.

---

## Issue 3: Jest tests timing out

### Problem

Integration tests failed with timeout errors, especially on first run.

### How I Investigated

1. Ran `npm test` — failures on `beforeAll` hook
2. Noticed `prisma db push` was slow on Windows
3. Checked `jest.config.cjs` for default 5s timeout

### How AI Helped

AI recommended increasing `testTimeout` to 30000ms and running tests with `--runInBand` to avoid SQLite file locking on Windows.

### What I Validated

- `jest.config.cjs` updated with `testTimeout: 30000`
- `npm test -- --runInBand` passed all suites
- No EBUSY errors after serial execution

### Final Fix

Set `testTimeout: 30000` in Jest config; documented `--runInBand` in README for Windows.

---

## Issue 4: Git push authentication failed

### Problem

`git push -u origin main` rejected with authentication error (password not supported).

### How I Investigated

1. Read GitHub error message about password deprecation
2. Checked Windows Credential Manager for stale GitHub credentials
3. Verified remote URL used HTTPS

### How AI Helped

AI explained GitHub no longer accepts account passwords for HTTPS push and outlined PAT creation steps and credential manager cleanup.

### What I Validated

- Created Personal Access Token with `repo` scope
- Cleared old credentials in Windows Credential Manager
- Push succeeded with PAT as password

### Final Fix

Use PAT for HTTPS authentication. Documented steps for future reference in README troubleshooting section.

---

## Issue 5: Docker run failed — command not found

### Problem

`docker build` and `docker run` failed because `docker` was not recognized.

### How I Investigated

1. Ran `docker --version` in PowerShell — command not found
2. Confirmed Docker Desktop was not installed on the machine

### How AI Helped

AI confirmed the Dockerfile itself was valid and explained that Docker Desktop must be installed separately on Windows.

### What I Validated

- Dockerfile syntax reviewed manually
- `npm run build` + `npm start` works without Docker
- Documented Docker as optional in README

### Final Fix

No Dockerfile change. Docker validation deferred until Docker Desktop is installed. Production start path verified via `npm start`.
