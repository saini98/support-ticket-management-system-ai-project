# Final AI Usage Summary

## Tool

**Cursor** (v3.8.x) — sole AI development tool for this project.

## Usage by phase

| Phase | AI contribution | Human contribution |
| --- | --- | --- |
| **Planning** | Folder structure, architecture mapping | Tech stack selection, scope boundaries |
| **Requirements** | Parsed prompts into API/middleware needs | Wrote requirement prompts |
| **Design** | Proposed patterns matching codebase | Approved RBAC rules, auth approach |
| **Implementation** | ~90% of backend and frontend code | Reviewed diffs, ran app |
| **Testing** | Generated 8 integration test suites | Verified manual smoke tests |
| **Debugging** | Diagnosed server/auth/build issues | Started servers, managed PAT |
| **Documentation** | README, Swagger, assessment docs | Exported prompt history |
| **GitHub prep** | `.gitignore`, audit for secrets | `git init`, commit, push |

## Features built with AI

- Ticket CRUD + status machine + comments
- List filters, pagination, sorting
- JWT authentication (backend + frontend)
- Role-based authorization (5 roles)
- Dashboard UI (responsive)
- Login page + protected routes
- Swagger OpenAPI docs
- Dockerfile
- Integration tests
- Assessment documentation package

## Prompts count (approximate)

- **Planning / structure:** 2–3 prompts
- **Backend features:** 15–20 prompts
- **Frontend features:** 8–10 prompts
- **Auth & RBAC:** 4–5 prompts
- **DevOps & GitHub:** 3–4 prompts
- **Debugging:** 5+ prompts
- **Documentation:** 4–5 prompts

Full history: `tool-specific/cursor-workflow/prompt-history.md`

## Information shared with AI

✅ Error messages, file paths, requirements, seed credentials (dev only)

❌ Real JWT secrets, GitHub PATs, production credentials

## Outcome

A functional full-stack application with auth, RBAC, tests, API docs, and GitHub-ready structure — built primarily through iterative Cursor agent sessions with human direction and validation.

## Reusability

See [tool-workflow.md](./tool-workflow.md) Section 11 for workflow reuse in real projects.
