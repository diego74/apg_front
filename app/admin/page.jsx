import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readSession, sessionCookie } from '../../lib/auth';
import AdminDashboard from './AdminDashboard';

export const metadata = { title: 'Administración | APG' };

export default function AdminPage() {
  const admin = readSession(cookies().get(sessionCookie.name)?.value);
  if (!admin) redirect('/admin/login');
  return <AdminDashboard admin={admin} />;
}
