'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import RankingManager from './RankingManager';

const formatDate = (date) => new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`));

export default function AdminDashboard({ admin }) {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const response = await fetch('/api/admin/dashboard');
    if (response.status === 401) return router.replace('/admin/login');
    if (!response.ok) throw new Error((await response.json()).error || 'No se pudo cargar el panel.');
    setDashboard(await response.json());
  }
  useEffect(() => { load().catch((err) => setError(err.message)); }, []);

  async function signOut() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  }
  async function createEvent(event) {
    event.preventDefault();
    setSaving(true); setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) { setError((await response.json()).error || 'No se pudo crear el evento.'); setSaving(false); return; }
    event.currentTarget.reset(); setShowForm(false); setSaving(false); load().catch((err) => setError(err.message));
  }

  return <div className={styles.shell}>
    <aside className={styles.sidebar}><div className={styles.brand}>APG <small>ADMIN</small></div><nav><a className={styles.active}>Resumen</a><a href="#ranking">Ranking</a><a href="#eventos">Calendario</a></nav><button className={styles.signOut} onClick={signOut}>Cerrar sesión</button></aside>
    <main className={styles.main}><header className={styles.header}><div><p>ADMINISTRACIÓN</p><h1>Panel de control</h1><small>Hola, {admin.email}</small></div><button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancelar' : '+ Nuevo torneo'}</button></header>
      {error && <p className={styles.error}>{error}</p>}
      {showForm && <form className={styles.eventForm} onSubmit={createEvent}><label>Nombre<input name="title" required placeholder="Campeonato Apertura" /></label><label>Fecha<input name="eventDate" required type="date" /></label><label>Sede<input name="location" required placeholder="Campo APG" /></label><label>Estado<select name="status"><option value="draft">Borrador</option><option value="published">Publicado</option></select></label><label className={styles.description}>Descripción<textarea name="description" rows="2" /></label><button disabled={saving}>{saving ? 'Guardando…' : 'Crear torneo'}</button></form>}
      {!dashboard && !error && <p className={styles.loading}>Cargando información…</p>}
      {dashboard && <><section className={styles.stats}><article><span>Jugadores activos</span><b>{dashboard.players}</b></article><article><span>Equipos registrados</span><b>{dashboard.teams}</b></article><article><span>Próximo torneo</span><b>{dashboard.events[0] ? formatDate(dashboard.events[0].eventDate).slice(0, 6).toUpperCase() : '—'}</b></article></section>
      <section className={styles.panel} id="eventos"><h2>Próximas actividades</h2>{dashboard.events.length ? dashboard.events.map((item) => <div className={styles.event} key={item.id}><b>{item.title}</b><span>{formatDate(item.eventDate)} · {item.location}</span><em className={item.status === 'published' ? styles.published : ''}>{item.status === 'published' ? 'Publicado' : 'Borrador'}</em></div>) : <p className={styles.empty}>No hay torneos registrados todavía.</p>}</section></>}
      <RankingManager />
    </main>
  </div>;
}
