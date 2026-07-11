import { getConnections, PgTestClient } from 'pglite-test';

let db: PgTestClient;
let pg: PgTestClient;
let teardown: () => Promise<void>;

beforeAll(async () => {
  // In-process PGlite (WASM Postgres): no server, no createdb, no Docker.
  // getConnections() defaults to an in-memory instance, seeds this module's
  // pgpm migrations, and creates the standard app roles — so db.setContext({
  // role: 'authenticated' }) works with no manual CREATE ROLE.
  //
  // To deploy a module in another directory, pass a seed adapter:
  //   import { getConnections, PgTestClient, seed } from 'pglite-test';
  //   ({ pg, db, teardown } = await getConnections({}, [seed.pgpm(__dirname + '/..')]));
  //
  // For a WASM extension like pgvector, register it at construction and install
  // it out-of-band (pgpm strips CREATE EXTENSION from migrations):
  //   import { vector } from '@electric-sql/pglite-pgvector';
  //   await getConnections({
  //     pglite: {
  //       extensions: { vector },
  //       extensionSql: ['CREATE EXTENSION IF NOT EXISTS vector;'],
  //     },
  //   });
  ({ pg, db, teardown } = await getConnections());
});

afterAll(async () => {
  await teardown();
});

beforeEach(async () => {
  await db.beforeEach();
});

afterEach(async () => {
  await db.afterEach();
});

describe('first test', () => {
  it('should pass', async () => {
    const result = await pg.query('SELECT 1 as num');
    expect(result.rows[0].num).toBe(1);
  });
});
