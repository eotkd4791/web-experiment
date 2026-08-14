# web-experiment

pnpm monorepo for API, Next.js, React, shared components, and Storybook examples.

## Workspaces

| Workspace         | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `apps/api`        | Hono API running through Vite and Cloudflare tooling |
| `apps/next`       | Next.js 16 application                               |
| `apps/storybook`  | Storybook component catalog                          |
| `packages/react`  | Vite React examples                                  |
| `packages/shared` | Shared React components                              |

## Development

```bash
pnpm install
pnpm dev:api
pnpm dev:next
pnpm dev:react
pnpm storybook
```

## Quality checks

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm build-storybook
```

`pnpm format` applies Oxfmt changes. `pnpm lint` runs Oxlint.

## Dependency policy

Repeated dependency versions are defined in `pnpm-workspace.yaml` under `catalog` and consumed with the `catalog:` protocol. Keep intentionally divergent major lines local to their workspace.

## API

- API package guide: [apps/api/README.md](./apps/api/README.md)
