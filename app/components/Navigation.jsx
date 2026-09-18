'use client';

import Link from 'next/link';
import { useState } from 'react';

const menu = [
  { label: 'Aprende a jugar', href: '/aprende-a-jugar', items: [['Guía para empezar', '/aprende-a-jugar'], ['Clases gratuitas', '/aprende-a-jugar#clases']] },
  { label: 'Reglamento', href: '/reglamento', items: [['Reglamento oficial', '/reglamento'], ['Preguntas frecuentes', '/reglamento#preguntas']] },
  { label: 'Calendario', href: '/calendario', items: [['Calendario anual', '/calendario'], ['Próximos torneos', '/calendario#torneos']] },
  { label: 'Ranking', href: '/ranking', items: [['División principal', '/ranking'], ['Temporada actual', '/ranking#temporada']] },
  { label: 'Acerca de APG', href: '/acerca-de-apg', items: [['Nuestra historia', '/acerca-de-apg'], ['Directiva', '/acerca-de-apg#directiva']] },
  { label: 'Extras', href: '/extras', items: [['Kantokeando', '/extras'], ['WGU', '/extras#wgu']] }
];

export default function Navigation() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  return <header className="site-header">
    <nav className="nav-wrap" aria-label="Navegación principal">
      <Link className="logo" href="/" onClick={() => setMobileOpen(false)}><span>APG</span><small>ASOCIACIÓN PERÚ GATEBALL</small></Link>
      <button className="menu-toggle" aria-label="Abrir menú" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><i></i><i></i><i></i></button>
      <div className={`nav-links ${mobileOpen ? 'is-open' : ''}`}>
        {menu.map((section, index) => <div className="nav-item" key={section.label} onMouseEnter={() => setOpen(index)} onMouseLeave={() => setOpen(null)}>
          <Link href={section.href} onFocus={() => setOpen(index)} onClick={() => setMobileOpen(false)}>{section.label}</Link><button className="nav-expand" aria-label={`Ver opciones de ${section.label}`} aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>⌄</button>
          <div className={`dropdown ${open === index ? 'visible' : ''}`}>
            {section.items.map(([label, href]) => <Link href={href} key={label} onClick={() => setMobileOpen(false)}>{label}<span>→</span></Link>)}
          </div>
        </div>)}
      </div>
    </nav>
  </header>;
}
