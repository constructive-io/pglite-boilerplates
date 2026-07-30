# ____repoName____

<p align="center" width="100%">
  <img height="250" src="https://raw.githubusercontent.com/constructive-io/constructive/refs/heads/main/assets/outline-logo.svg" />
</p>

<p align="center" width="100%">
  <a href="https://github.com/____username____/____repoName____/actions/workflows/ci.yml">
    <img height="20" src="https://github.com/____username____/____repoName____/actions/workflows/ci.yml/badge.svg" />
  </a>
</p>


## Getting Started

This workspace was generated with `pgpm init workspace --pglite`. Its modules test against in-process [PGlite](https://pglite.dev) (WASM Postgres) via [`pglite-test`](https://www.npmjs.com/package/pglite-test) — **no Postgres server, no Docker, no services**. For a complete guide on developing with pgpm workspaces, see [Workspaces: Organize Postgres](https://constructive.io/learn/modular-postgres/workspaces-organize-postgres).

### Quick Start

```sh
# Install dependencies (that's the whole setup — no database to start)
pnpm install

# Create a module
pgpm init

# Navigate to your module and run tests
cd packages/your-module
pnpm test:watch
```

### Deploying

`pgpm.json` sets `"engine": "pglite"`, so migration commands deploy into in-process PGlite — no server, no `createdb`:

```sh
# in-memory: proves the plan applies cleanly, then discarded
pgpm deploy --package your-module --yes

# persist to a data directory (and verify against it later)
pgpm deploy --package your-module --yes --pglite=./.pglite
pgpm verify --package your-module --pglite=./.pglite
```

Target a real Postgres server for one command with `--engine pg`.

### Prerequisites

- Node.js 20+
- pnpm
- pgpm (`npm install -g pgpm`)

No Docker, no PostgreSQL server, and no `psql` required — PGlite runs entirely in-process. See [Prerequisites](https://constructive.io/learn/quickstart/prerequisites) for detailed setup instructions.

## Credits

**🛠 Built by the [Constructive](https://constructive.io) team — creators of modular Postgres tooling for secure, composable backends. If you like our work, contribute on [GitHub](https://github.com/constructive-io).**

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
