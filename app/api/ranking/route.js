import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { databaseError } from '../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await query('SELECT id, name, played, won, drawn, lost, walkovers, points_for AS "pointsFor", points_against AS "pointsAgainst", difference, points FROM teams WHERE active = true ORDER BY points DESC, difference DESC, points_for DESC, name ASC LIMIT 100');
    return NextResponse.json(rows);
  } catch (error) { return databaseError(error); }
}
