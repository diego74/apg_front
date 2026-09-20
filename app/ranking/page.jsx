import RankingTable from './RankingTable';
import styles from '../public.module.css';
export const metadata={title:'Ranking | APG'};
export default function Ranking(){return <main className={styles.page}><header className={`${styles.container} ${styles.hero}`}><div><p className={styles.eyebrow}>Clasificación oficial</p><h1>Ranking APG.</h1></div><p className={styles.heroText}>XXX Torneo Mario Akamine 2026 · Primera categoría.</p></header><section className={`${styles.container} ${styles.section} ${styles.rankingWrap}`}><RankingTable/></section></main>}
