import { Pool } from 'pg';

let pool;

export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
    });
  }
  return pool;
}

export async function query(text, params = []) {
  const db = getDb();
  if (!db) throw new Error('DATABASE_NOT_CONFIGURED');
  return db.query(text, params);
}
