'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import { Footer } from './styles';

export default function AppFrame({ children }) {
  const isAdmin = usePathname().startsWith('/admin');
  if (isAdmin) return children;
  return <><Navigation />{children}<Footer><span>APG</span><p>Asociación Perú Gateball · Construyendo comunidad desde el deporte.</p></Footer></>;
}
