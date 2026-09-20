import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE = 'apg_admin_session';
const maxAge = 60 * 60 * 8;

function secret() {
  return process.env.SESSION_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'apg-local-development-secret');
}

function signature(value) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

export function makeSession(admin) {
  if (!secret()) throw new Error('SESSION_SECRET is required in production');
  const body = Buffer.from(JSON.stringify({ id: admin.id, email: admin.email, exp: Date.now() + maxAge * 1000 })).toString('base64url');
  return `${body}.${signature(body)}`;
}

export function readSession(token) {
  if (!token || !secret()) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = signature(body);
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString());
    return data.exp > Date.now() ? data : null;
  } catch { return null; }
}

export const sessionCookie = { name: COOKIE, options: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge, path: '/' } };
