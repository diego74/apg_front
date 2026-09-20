import { NextResponse } from 'next/server';
import { requireAdmin, unauthorized } from '../../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = requireAdmin();
  return admin ? NextResponse.json(admin) : unauthorized();
}
