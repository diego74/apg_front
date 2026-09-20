import { NextResponse } from 'next/server';
import { getDb, query } from '../../../../lib/db';
import { databaseError, requireAdmin, unauthorized } from '../../../../lib/api';

export const dynamic = 'force-dynamic';
const fields = ['played', 'won', 'drawn', 'lost', 'walkovers', 'pointsFor', 'pointsAgainst', 'difference', 'points'];
const toInt = (value) => Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : 0;

function cleanTeam(team) {
  return {
    id: team.id ? toInt(team.id) : null,
    name: String(team.name || '').trim().slice(0, 120),
    ...Object.fromEntries(fields.map((field) => [field, toInt(team[field])]))
  };
}

export async function GET() {
  if (!requireAdmin()) return unauthorized();
  try {
    const { rows } = await query('SELECT id, name, played, won, drawn, lost, walkovers, points_for AS "pointsFor", points_against AS "pointsAgainst", difference, points FROM teams WHERE active = true ORDER BY points DESC, difference DESC, points_for DESC, name ASC');
    return NextResponse.json(rows);
  } catch (error) { return databaseError(error); }
}

export async function PUT(request) {
  if (!requireAdmin()) return unauthorized();
  try {
    const team = cleanTeam(await request.json());
    if (!team.id || !team.name) return NextResponse.json({ error: 'Equipo inválido.' }, { status: 422 });
    const { rows } = await query('UPDATE teams SET name=$1, played=$2, won=$3, drawn=$4, lost=$5, walkovers=$6, points_for=$7, points_against=$8, difference=$9, points=$10 WHERE id=$11 RETURNING id, name, played, won, drawn, lost, walkovers, points_for AS "pointsFor", points_against AS "pointsAgainst", difference, points', [team.name, team.played, team.won, team.drawn, team.lost, team.walkovers, team.pointsFor, team.pointsAgainst, team.difference, team.points, team.id]);
    if (!rows[0]) return NextResponse.json({ error: 'Equipo no encontrado.' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) { return databaseError(error); }
}

export async function POST(request) {
  if (!requireAdmin()) return unauthorized();
  const db = getDb();
  if (!db) return databaseError(new Error('DATABASE_NOT_CONFIGURED'));
  let client;
  try {
    const body = await request.json();
    const teams = Array.isArray(body.teams) ? body.teams.slice(0, 200).map(cleanTeam).filter((team) => team.name) : [];
    if (!teams.length) return NextResponse.json({ error: 'El CSV no contiene equipos válidos.' }, { status: 422 });
    client = await db.connect();
    await client.query('BEGIN');
    await client.query('UPDATE teams SET active = false');
    for (const team of teams) {
      await client.query('INSERT INTO teams (name, played, won, drawn, lost, walkovers, points_for, points_against, difference, points, active) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,true) ON CONFLICT (name) DO UPDATE SET played=EXCLUDED.played, won=EXCLUDED.won, drawn=EXCLUDED.drawn, lost=EXCLUDED.lost, walkovers=EXCLUDED.walkovers, points_for=EXCLUDED.points_for, points_against=EXCLUDED.points_against, difference=EXCLUDED.difference, points=EXCLUDED.points, active=true', [team.name, team.played, team.won, team.drawn, team.lost, team.walkovers, team.pointsFor, team.pointsAgainst, team.difference, team.points]);
    }
    await client.query('COMMIT');
    return NextResponse.json({ imported: teams.length });
  } catch (error) {
    if (client) await client.query('ROLLBACK');
    return databaseError(error);
  } finally { client?.release(); }
}
