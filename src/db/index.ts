import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// Mock DB for when DATABASE_URL is not set
const createChainable = () => {
  const chain: any = {
    where: () => chain,
    orderBy: () => chain,
    limit: () => chain,
    offset: () => chain,
    innerJoin: () => chain,
    leftJoin: () => chain,
    groupBy: () => chain,
    then: (resolve: any) => Promise.resolve([]).then(resolve),
  };
  return chain;
};

const createMockDb = () => ({
  select: () => ({
    from: () => createChainable(),
  }),
  insert: () => ({ values: () => Promise.resolve([]) }),
  update: () => ({ set: () => ({ where: () => Promise.resolve([]) }) }),
  delete: () => ({ where: () => Promise.resolve([]) }),
});

let realPool: Pool | null = null;
let realDb: any = null;

if (databaseUrl) {
  realPool = globalForDb.__arenaNextJsPostgresqlPool ?? new Pool({
    connectionString: databaseUrl,
  });
  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = realPool;
  }
  realDb = drizzle(realPool);
  console.log("[DB] Connected to PostgreSQL");
} else {
  console.log("[DB] DATABASE_URL not set — running in static mode (mock DB)");
}

export const pool = realPool;
export const db = (realDb ?? createMockDb()) as ReturnType<typeof drizzle>;
