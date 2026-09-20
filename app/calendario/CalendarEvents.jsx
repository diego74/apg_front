'use client';

import { useEffect, useState } from 'react';
import styles from '../public.module.css';
const formatter = new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short' });

export default function CalendarEvents() {
  const [events,setEvents]=useState([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{fetch('/api/events').then((response)=>response.ok?response.json():[]).then((data)=>setEvents(Array.isArray(data)?data:[])).catch(()=>setEvents([])).finally(()=>setLoading(false))},[]);
  if(loading)return <p className={styles.loading}>Cargando calendario…</p>;
  if(!events.length)return <div className={styles.empty}>Aún no hay fechas publicadas. Cuando APG confirme el calendario aparecerán aquí.</div>;
  return <div className={styles.eventList}>{events.map((event)=>{const parts=formatter.formatToParts(new Date(`${event.eventDate}T00:00:00`));const day=parts.find((part)=>part.type==='day')?.value;const month=parts.find((part)=>part.type==='month')?.value?.replace('.','')||'';return <article className={styles.event} key={event.id}><div className={styles.eventDate}><strong>{day}</strong><span>{month.toUpperCase()}</span></div><div><h3>{event.title}</h3><p>{event.location}</p></div><span className={styles.eventBadge}>PRÓXIMO PARTIDO</span></article>})}</div>;
}
