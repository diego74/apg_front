'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event) {
    event.preventDefault(); setLoading(true); setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) { setError((await response.json()).error || 'No fue posible iniciar sesión.'); setLoading(false); return; }
    router.replace('/admin'); router.refresh();
  }
  return <main className={styles.loginPage}><form className={styles.loginCard} onSubmit={submit}><div className={styles.loginBrand}>APG <small>ADMIN</small></div><p>ADMINISTRACIÓN</p><h1>Bienvenido</h1><span>Ingresa con una cuenta autorizada para gestionar APG.</span>{error && <div className={styles.error}>{error}</div>}<label>Correo electrónico<input required name="email" type="email" autoComplete="email" /></label><label>Contraseña<input required name="password" type="password" autoComplete="current-password" /></label><button disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar al panel'}</button><a href="/">← Volver al sitio público</a></form></main>;
}
