import { getConnections, PgTestClient } from 'pglite-test';

let db: PgTestClient;
let pg: PgTestClient;
let teardown: () => Promise<void>;

beforeAll(async () => {
  // In-process PGlite (WASM Postgres): no server, no createdb, no Docker.
  // getConnections() defaults to an in-memory instance.
  //
  // To deploy this module's pgpm migrations into PGlite, seed with it:
  //   import { getConnections, PgTestClient, seed } from 'pglite-test';
  //   ({ pg, db, teardown } = await getConnections({}, [seed.pgpm(__dirname + '/..')]));
  //
  // PGlite boots as a single superuser with no app roles. Any role used via
  // db.setContext({ role }) must be created first:
  //   await getConnections(
  //     { pglite: { extensionSql: ['CREATE ROLE authenticated;'] } },
  //     [seed.pgpm(__dirname + '/..')]
  //   );
  //
  // For a WASM extension like pgvector, register it at construction and install
  // it out-of-band (pgpm strips CREATE EXTENSION from migrations):
  //   import { vector } from '@electric-sql/pglite-pgvector';
  //   await getConnections({
  //     pglite: {
  //       extensions: { vector },
  //       extensionSql: ['CREATE EXTENSION IF NOT EXISTS vector;'],
  //     },
  //   }, [seed.pgpm(__dirname + '/..')]);
  ({ pg, db, teardown } = await getConnections());
}, 120000);

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
