import { readFile } from 'node:fs/promises';
import pg from 'pg';
import 'dotenv/config';

if (!process.env.DATABASE_URL) throw new Error('Define DATABASE_URL antes de ejecutar este comando.');
const sql = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});
try {
  await pool.query(sql);
  console.log('Esquema PostgreSQL aplicado correctamente.');
} finally {
  await pool.end();
}
