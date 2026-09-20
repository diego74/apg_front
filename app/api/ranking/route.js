import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { databaseError } from '../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await query('SELECT id, name, points FROM teams WHERE active = true ORDER BY points DESC, name ASC LIMIT 20');
    return NextResponse.json(rows);
  } catch (error) { return databaseError(error); }
}
