# Code Review Prompts

Representative prompts for review and quality checks.

## Scope-limited review

```
Prepare this project for publishing to GitHub.
Do not change any application logic.
Only prepare the repository for GitHub.
```

## Assessment scoring

```
How many points are included in this project?
[Lists assessment criteria checklist]
```

## Implicit review via acceptance criteria

Before marking features complete, verify against `acceptance-criteria.md`:

- Status codes correct?
- Error codes documented?
- Swagger updated?
- Tests pass?
- No secrets committed?

## Future formal review prompt

```
Review the changes on branch main for:
- Security issues (auth, RBAC, secrets)
- Missing tests for new behavior
- Breaking API changes
- Deviation from repository → service → controller pattern
```

## Tips for review prompts

- Separate "prep repo" from "add feature" prompts
- Use acceptance criteria as review checklist
- Ask AI to audit `.gitignore` and `.env` before push
