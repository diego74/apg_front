import bcrypt from 'bcryptjs';
import pg from 'pg';
import 'dotenv/config';

const { DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Define DATABASE_URL, ADMIN_EMAIL y ADMIN_PASSWORD antes de ejecutar este comando.');
const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash', [ADMIN_EMAIL.toLowerCase(), passwordHash]);
await pool.end();
console.log(`Administrador listo: ${ADMIN_EMAIL}`);
