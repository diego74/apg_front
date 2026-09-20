import CalendarEvents from './CalendarEvents';
import styles from '../public.module.css';
export const metadata={title:'Calendario | APG'};
export default function Calendar(){return <main className={styles.page}><header className={`${styles.container} ${styles.hero}`}><div><p className={styles.eyebrow}>Temporada 2026</p><h1>Calendario y próximos partidos.</h1></div><p className={styles.heroText}>Fechas oficiales de torneos y actividades publicadas por la Asociación Perú Gateball.</p></header><section className={`${styles.container} ${styles.section} ${styles.calendar}`}><div className={styles.sectionHeader}><h2>Próximas fechas.</h2><p>El calendario se actualiza desde el panel administrativo.</p></div><CalendarEvents/></section></main>}
