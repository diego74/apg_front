import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await query('SELECT 1');
    return NextResponse.json({ status: 'ok', service: 'apg-next', database: 'connected' });
  } catch (error) {
    return NextResponse.json({ status: 'degraded', service: 'apg-next', database: error.message === 'DATABASE_NOT_CONFIGURED' ? 'not_configured' : 'unavailable' }, { status: 503 });
  }
}
