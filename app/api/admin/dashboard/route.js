import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { databaseError, requireAdmin, unauthorized } from '../../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!requireAdmin()) return unauthorized();
  try {
    const [players, teams, upcoming] = await Promise.all([
      query('SELECT COUNT(*)::int AS count FROM players WHERE active = true'),
      query('SELECT COUNT(*)::int AS count FROM teams WHERE active = true'),
      query("SELECT id, title, event_date AS \"eventDate\", location, status FROM events WHERE event_date >= CURRENT_DATE ORDER BY event_date ASC LIMIT 6")
    ]);
    return NextResponse.json({ players: players.rows[0].count, teams: teams.rows[0].count, events: upcoming.rows });
  } catch (error) { return databaseError(error); }
}
