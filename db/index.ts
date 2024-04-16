import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new pg.Pool({
  connectionString: process.env.DB_URL!,
});
const db = drizzle(pool, { schema });

export { db };
