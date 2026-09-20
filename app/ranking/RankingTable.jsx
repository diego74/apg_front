'use client';

import { useEffect, useState } from 'react';
import styles from '../public.module.css';

export default function RankingTable() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/ranking')
      .then(async (response) => {
        if (!response.ok) throw new Error('RANKING_UNAVAILABLE');
        return response.json();
      })
      .then((data) => { if (active) setTeams(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setError('No fue posible cargar el ranking oficial.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) return <p className={styles.loading}>Cargando ranking oficial…</p>;
  if (error) return <p className={styles.empty}>{error}</p>;
  if (!teams.length) return <p className={styles.empty}>Aún no hay equipos publicados en el ranking.</p>;

  return <>
    <div className={styles.rankingMeta}><strong>{teams.length} equipos</strong><p>Ordenado por puntos y diferencia.</p></div>
    <div className={styles.tableShell}><table className={styles.rankingTable}>
      <thead><tr><th>Puesto</th><th>Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>WO</th><th>PF</th><th>PC</th><th>DP</th><th>PTS</th></tr></thead>
      <tbody>{teams.map((team, index) => <tr key={team.id || team.name}>
        <td><span className={`${styles.rank} ${index < 3 ? styles.topRank : ''}`}>{index + 1}</span></td>
        <td>{team.name}</td><td>{team.played}</td><td>{team.won}</td><td>{team.drawn}</td><td>{team.lost}</td><td>{team.walkovers}</td><td>{team.pointsFor}</td><td>{team.pointsAgainst}</td><td>{team.difference}</td><td className={styles.points}>{team.points}</td>
      </tr>)}</tbody>
    </table></div>
    <div className={styles.mobileRanking}>{teams.map((team, index) => <article className={styles.rankCard} key={team.id || team.name}>
      <span className={`${styles.rank} ${index < 3 ? styles.topRank : ''}`}>{index + 1}</span>
      <div><strong>{team.name}</strong><small>{team.played} PJ · {team.won} PG · DP {team.difference}</small></div>
      <b className={styles.points}>{team.points} pts</b>
    </article>)}</div>
    <p className={styles.sourceNote}>PJ: partidos jugados · PG: ganados · PE: empatados · PP: perdidos · WO: walkovers · PF/PC: puntos a favor/en contra · DP: diferencia.</p>
  </>;
}
