import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { databaseError, requireAdmin, unauthorized } from '../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await query("SELECT id, title, event_date AS \"eventDate\", location, status, description FROM events WHERE status = 'published' AND event_date >= CURRENT_DATE ORDER BY event_date ASC");
    return NextResponse.json(rows);
  } catch (error) { return databaseError(error); }
}

export async function POST(request) {
  if (!requireAdmin()) return unauthorized();
  try {
    const body = await request.json();
    const title = body.title?.trim();
    const eventDate = body.eventDate;
    const location = body.location?.trim();
    if (!title || !eventDate || !location) return NextResponse.json({ error: 'Título, fecha y sede son obligatorios.' }, { status: 422 });
    const status = ['draft', 'published'].includes(body.status) ? body.status : 'draft';
    const { rows } = await query('INSERT INTO events (title, event_date, location, status, description) VALUES ($1,$2,$3,$4,$5) RETURNING id, title, event_date AS "eventDate", location, status, description', [title, eventDate, location, status, body.description?.trim() || null]);
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) { return databaseError(error); }
}
