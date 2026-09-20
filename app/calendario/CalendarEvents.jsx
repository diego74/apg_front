'use client';

import { useEffect, useState } from 'react';
import { EventList } from '../components/styles';

const initialEvents = [
  { id: 1, title: 'Campeonato Apertura', eventDate: '2026-04-12', location: 'Campo APG · Lima' },
  { id: 2, title: 'Torneo Metropolitano', eventDate: '2026-06-21', location: 'Sede central · Lima' },
  { id: 3, title: 'Copa de la Amistad', eventDate: '2026-08-09', location: 'Campo APG · Lima' }
];
const formatter = new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short' });

export default function CalendarEvents() {
  const [events, setEvents] = useState(initialEvents);
  useEffect(() => { fetch('/api/events').then((response) => response.ok ? response.json() : null).then((data) => { if (data?.length) setEvents(data); }).catch(() => {}); }, []);
  return <EventList id="torneos">{events.map((event) => { const parts = formatter.formatToParts(new Date(`${event.eventDate}T00:00:00`)); const day = parts.find((part) => part.type === 'day')?.value; const month = parts.find((part) => part.type === 'month')?.value?.replace('.', '') || ''; return <article key={event.id}><div><b>{day}</b><span>{month.toUpperCase()}</span></div><p><strong>{event.title}</strong><small>{event.location}</small></p><i>Ver evento →</i></article>; })}</EventList>;
}
