# pglite-boilerplates

PGlite boilerplate templates for [pgpm](https://www.npmjs.com/package/@pgpmjs/cli), the PostgreSQL Package Manager. These templates scaffold workspaces and modules that test against **in-process [PGlite](https://pglite.dev)** (WASM Postgres) instead of a Postgres server — no `createdb`, no Docker, no services.

This is the PGlite-only sibling of [`pgpm-boilerplates`](https://github.com/constructive-io/pgpm-boilerplates). It ships a single `pglite/` family (module + workspace) with every PGlite difference pre-wired, so a scaffolded project runs with just `pnpm install && pnpm test`.

## Usage

```bash
# Create a new PGlite workspace
pgpm init workspace --pglite

# Create a new module (inside a workspace)
pgpm init
```

The templates are fetched from this repository and cached locally under `~/.pgpm/cache/repos`. Use `pgpm cache clean` to clear the cache if you need a fresh pull.

## Structure

```
pglite/
├── module/      # Single pgpm module template (pglite-test)
└── workspace/   # Monorepo workspace template (services-free CI)
```

## What's baked in (so you don't have to think about it)

Everything that differs from a server-backed `pgsql-test` project is pre-configured:

- **`pglite-test`** in place of `pgsql-test` (+ `@pgpmjs/pglite-adapter` and the `@electric-sql/pglite` peer).
- **`NODE_OPTIONS=--experimental-vm-modules`** in every `test` script — PGlite loads a WASM ESM module.
- **Generous timeouts** — `beforeAll(..., 120000)` and `testTimeout: 120000` in `jest.config.js`, so PGlite's WASM cold-start on a fresh CI runner never trips Jest's default 5s hook timeout.
- **Services-free CI** — the workflow has no Postgres/Docker/MinIO services, no `pgpm tune`, no `admin-users bootstrap`, no global `pgpm` install. Just `pnpm install && pnpm test`.
- **In-memory by default** — `getConnections()` spins up an in-memory PGlite; persist with `{ pglite: { dataDir: './.pglite' } }`.

See the generated module's `README.md` for the role-creation and extension (pgvector) patterns, and [`docs/`](https://github.com/constructive-io/pglite-test-suite/blob/main/docs/pglite-vs-pgsql-test.md) in `pglite-test-suite` for the full catalog of differences.

## Placeholders

Templates use the `____placeholder____` pattern (4 underscores on each side) for variable substitution. These are replaced by [genomic](https://www.npmjs.com/package/genomic) during project generation.

## Scripts

```bash
# Install dependencies
pnpm install

# Scan templates for placeholder variables
pnpm run find-placeholders

# Interactively update template dependency versions
pnpm run update-deps
```

## Credits

**🛠 Built by the [Constructive](https://constructive.io) team — creators of modular Postgres tooling for secure, composable backends. If you like our work, contribute on [GitHub](https://github.com/constructive-io).**
