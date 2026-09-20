import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readSession, sessionCookie } from './auth';

export function databaseError(error) {
  console.error(error);
  return NextResponse.json({ error: error.message === 'DATABASE_NOT_CONFIGURED' ? 'La base de datos no está configurada.' : 'No fue posible procesar la solicitud.' }, { status: error.message === 'DATABASE_NOT_CONFIGURED' ? 503 : 500 });
}

export function requireAdmin() {
  const session = readSession(cookies().get(sessionCookie.name)?.value);
  if (!session) return null;
  return session;
}

export function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
}
