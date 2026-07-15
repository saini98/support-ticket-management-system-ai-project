# Debugging Prompts

Representative prompts used when troubleshooting issues.

## Login / connectivity

```
Getting error "Unable to reach the server. Please try again." while logging in.
```

**Resolution:** Backend not running — start `npm run dev` in `backend/`.

## GitHub

```
Resolve the error getting while pushing onto GitHub.
```

**Resolution:** GitHub PAT required instead of account password for HTTPS.

## Build failures

```
(TypeScript build error on jwt.sign expiresIn surfaced during Docker work)
```

**Resolution:** Fix `SignOptions` typing in `jwt.ts`.

## Diagnostic prompt template

```
Debug: [exact error message]

What I tried: [steps taken]
Expected: [behavior]
Actual: [behavior]
Backend running: yes/no
Frontend running: yes/no
```

## Tips for debugging prompts

- Paste the **exact** error message from UI or terminal
- Mention which servers are running
- Let AI run health checks (`/health`) before code changes
