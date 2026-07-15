# Planning Prompts

Representative prompts used during the planning and structure phase.

## Initial project structure

```
We are building a Support Ticket Management System for an AI capability assessment.

Tech Stack: React, TypeScript, MUI, Axios, React Router (frontend);
Node.js, Express, TypeScript, Prisma, SQLite, Zod, Jest, Supertest (backend).

Generate only the project folder structure.
Do not generate any code.
Follow clean architecture.
```

## Assessment checklist review

```
How many points are included in this project?

[Checklist of assessment criteria: third entity, user CRUD, auth, filters,
pagination, tests, Swagger, Docker, prompt templates]
```

## GitHub preparation

```
Prepare this project for publishing to GitHub.

Tasks:
1. Review the entire repository.
2. Remove unnecessary files.
3. Ensure no secrets or credentials are committed.
4. Create a proper .gitignore.
5. Create .env.example from existing environment variables.
6. Verify node_modules, build folders, logs, coverage and environment files are ignored.
7. Ensure the project can be cloned and run by another developer.

Do not change any application logic.
```

## Documentation structure

```
Create tool-specific/cursor-workflow/ with project-context, spec, tasks,
acceptance-criteria, and cursor-rules files.
```

```
Restructure documentation into ai-practical-assessment/ folder per submission template.
```

## Tips for planning prompts

- State **what not to do** ("do not generate code", "do not change application logic")
- List deliverables as numbered tasks
- Reference assessment rubric items explicitly
