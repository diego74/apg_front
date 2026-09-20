'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header, Nav, Logo, NavLinks, NavItem, ExpandButton, Dropdown, MenuToggle } from './styles';

const menu = [
  { label: 'Aprende a jugar', href: '/aprende-a-jugar', items: [] },
  { label: 'Reglamento', href: '/reglamento', items: [] },
  {
    label: 'Calendario',
    href: '/calendario',
    items: [['Calendario anual', '/calendario'], ['Panamericano 2027', '/panamericano-2027']],
  },
  { label: 'Ranking', href: '/ranking', items: [] },
  { label: 'Acerca de APG', href: '/acerca-de-apg', items: [] },
  { label: 'Extras', href: '/extras', items: [['Kantokeando', '/extras'], ['WGU', '/extras#wgu']] },
];

export default function Navigation() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);
  const toggleSubmenu = (index) => setOpen(open === index ? null : index);

  return <Header>
    <Nav aria-label="Navegación principal">
      <Logo href="/" onClick={closeMobileMenu}><span>APG</span><small>ASOCIACIÓN PERÚ GATEBALL</small></Logo>
      <MenuToggle $open={mobileOpen} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><i /><i /><i /></MenuToggle>
      <NavLinks $open={mobileOpen}>
        {menu.map((section, index) => {
          const hasSubmenu = section.items.length > 0;
          const isOpen = open === index;

          return <NavItem key={section.label} onMouseEnter={() => setOpen(hasSubmenu ? index : null)} onMouseLeave={() => setOpen(null)}>
            <Link href={section.href} onFocus={() => setOpen(hasSubmenu ? index : null)} onClick={closeMobileMenu}>{section.label}</Link>
            {hasSubmenu && <ExpandButton aria-label={`Ver opciones de ${section.label}`} aria-controls={`submenu-${index}`} aria-expanded={isOpen} onClick={() => toggleSubmenu(index)}>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5.5 7.75 4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </ExpandButton>}
            {hasSubmenu && <Dropdown id={`submenu-${index}`} $open={isOpen}>
              {section.items.map(([label, href]) => <Link href={href} key={label} onClick={closeMobileMenu}>{label}<span>→</span></Link>)}
            </Dropdown>}
          </NavItem>;
        })}
      </NavLinks>
    </Nav>
  </Header>;
}
