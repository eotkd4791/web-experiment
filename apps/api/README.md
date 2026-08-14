## Commands

Run these from the repository root:

```bash
pnpm dev:api
pnpm --filter @app/api build
pnpm --filter @app/api deploy
pnpm --filter @app/api cf-typegen
```

## Cloudflare bindings

[Generate or synchronize Worker types](https://developers.cloudflare.com/workers/wrangler/commands/#types) before changing bindings.

Pass `CloudflareBindings` as a generic when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
