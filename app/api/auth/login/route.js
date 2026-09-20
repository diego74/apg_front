import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '../../../../lib/db';
import { databaseError } from '../../../../lib/api';
import { makeSession, sessionCookie } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: 'Ingresa tu correo y contraseña.' }, { status: 422 });
    const { rows } = await query('SELECT id, email, name, password_hash FROM admins WHERE email = $1', [email.trim().toLowerCase()]);
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) return NextResponse.json({ error: 'Credenciales inválidas.' }, { status: 401 });
    const response = NextResponse.json({ id: admin.id, email: admin.email, name: admin.name });
    response.cookies.set(sessionCookie.name, makeSession(admin), sessionCookie.options);
    return response;
  } catch (error) { return databaseError(error); }
}
