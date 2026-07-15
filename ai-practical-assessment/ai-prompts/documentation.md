# Documentation Prompts

Representative prompts used for documentation generation.

## README and setup

```
Prepare repository for GitHub with README, .gitignore, .env.example.
Ensure another developer can clone and run the project.
```

## Cursor workflow docs

```
Create tool-specific/cursor-workflow/ with:
- project-context.md
- spec.md
- tasks.md
- acceptance-criteria.md
- cursor-rules-or-instructions.md
```

## Submission documents

```
Create tool-workflow.md covering:
- Primary AI tool used
- How you provide project context
- Requirement analysis, planning, code generation, validation
- Testing, debugging, code review
- Information avoided sharing with AI
- Reusing workflow in real projects
```

## Assessment folder restructure

```
Restructure md files into ai-practical-assessment/ per submission template:
README, candidate-info, tool-workflow, requirements-analysis,
acceptance-criteria, implementation-plan, design-notes,
api-contract, data-model, ui-flow, test-strategy,
database/, ai-prompts/, tool-specific/cursor-workflow/
```

## Swagger

```
Add Swagger documentation for auth login and Bearer security on protected routes.
Add 403 responses to ticket paths.
```

## Tips for documentation prompts

- Request specific file names and sections
- Ask to base content on actual project state, not generic templates
- Export Cursor chat to `prompt-history.md` for audit trail
