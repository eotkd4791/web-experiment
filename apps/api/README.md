# @we/api

NestJS + Drizzle ORM API for local PostgreSQL practice with the `civilian7/sql-tutorial` e-commerce dataset.

## Setup

```bash
pnpm install
```

Prepare local environment values in `apps/api/.env`, then start PostgreSQL with the repository `docker-compose.yml`.

## Run

```bash
pnpm --filter @we/api start
```

Default local URL:

- API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/docs`
- OpenAPI JSON: `http://localhost:8080/docs-json`

## Database Workflow

Generate and load the small Korean practice dataset into `web-experiment-db`:

```bash
pnpm --filter @we/api db:seed:ecommerce
```

Run Drizzle migration commands:

```bash
pnpm --filter @we/api db:generate
pnpm --filter @we/api db:migrate
```

## Tests

```bash
pnpm --filter @we/api lint
pnpm --filter @we/api typecheck
pnpm --filter @we/api test
pnpm --filter @we/api test:e2e
```

## Main Endpoints

- `GET /`
- `GET /commerce/dashboard`
- `GET /commerce/products`
- `GET /commerce/orders/recent`
- `GET /commerce/customers/top`
- `GET /commerce/products/best-sellers`

See [docs/session-summary.md](./docs/session-summary.md) for the work completed in this setup session.
