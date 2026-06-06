# Repository Guidelines

## Project Structure & Module Organization
This repository is a pnpm monorepo. The main workspaces are:
- `apps/api`: NestJS API. Source lives in `src/`, e2e tests in `test/`.
- `apps/ssr`: Next.js app router project. Source lives in `src/app/`, with tests alongside components, e.g. `src/app/example/*.test.tsx`.
- `packages/react`: Vite + React example app. Shared examples live in `src/examples/`, utilities in `src/utils/`, mocks in `src/mocks/`, and static files in `public/`.
- `packages/shared`: Common workspace package for shared types or helpers.

## Build, Test, and Development Commands
Use the root scripts to target a workspace:
- `pnpm dev`: run all dev servers through Turbo.
- `pnpm dev:react | dev:ssr | dev:api`: run one workspace only.
- `pnpm test:react | test:ssr | test:api`: run tests for one workspace.

Workspace-specific commands:
- `pnpm --filter @we/api build|dev|lint|test|test:e2e`: NestJS build, watch, lint, unit tests, and e2e tests.
- `pnpm --filter @we/ssr dev|build|start|lint|test`: Next.js development, production build, lint, and Vitest.
- `pnpm --filter @we/react dev|test`: Vite dev server and Vitest.

## Coding Style & Naming Conventions
TypeScript is the default language. Follow the existing formatting style in each workspace:
- Use 2-space indentation.
- Prefer descriptive, feature-based filenames such as `HelloApiButton.tsx`, `todo.service.ts`, and `useFileUpload.ts`.
- Keep test files co-located and named with `.test.ts`, `.test.tsx`, or `.spec.ts`.
- Run the workspace linter before committing. ESLint is configured at the root and per workspace; Prettier is used in `apps/api`.

## Testing Guidelines
Vitest is used in `apps/ssr` and `packages/react`. Jest is used in `apps/api`.
- Unit tests: `*.test.ts[x]` or `*.spec.ts` next to the code they cover.
- API e2e tests: `apps/api/test/*.e2e-spec.ts`.
- Prefer testing behavior over implementation details, and keep MSW mocks in the relevant workspace `test/` or `src/mocks/` folders.

## Commit & Pull Request Guidelines
Git history follows Conventional Commit style, for example: `feat: ...`, `chore: ...`, and `config: ...`.
- Keep commits small and scoped to one change.
- PRs should include a short summary, linked issue if available, and screenshots or screen recordings for UI changes.
- Mention any commands you ran, especially tests and lint checks.

## Configuration Tips
Do not commit generated build output such as `dist/`, `.next/`, or coverage artifacts. Keep environment-specific values local unless the workspace explicitly documents them.
