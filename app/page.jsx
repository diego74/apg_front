import Link from 'next/link';

export default function Home() {
  return <main>
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="hero-content"><p className="kicker">GATEBALL PARA TODOS</p><h1>El juego que une<br/>generaciones.</h1><p className="hero-copy">Estrategia, precisión y comunidad. Aprende gateball sin importar tu edad o experiencia.</p><div className="hero-actions"><Link href="/aprende-a-jugar" className="button primary">Empieza a jugar <span>→</span></Link><Link href="/calendario" className="button ghost">Ver calendario</Link></div></div>
      <div className="hero-card"><span>PRÓXIMO EVENTO</span><strong>Campeonato<br/>Metropolitano</strong><p>21 JUN · LIMA</p><Link href="/calendario">Conocer más →</Link></div>
      <div className="scroll-mark">DESCUBRE <i>↓</i></div>
    </section>
    <section className="intro-band"><p className="kicker">UN DEPORTE, UNA COMUNIDAD</p><h2>Juega, comparte<br/>y deja tu marca.</h2><p>En APG reunimos a personas de todas las edades alrededor de un deporte dinámico, inclusivo y lleno de historias.</p><Link className="text-link" href="/acerca-de-apg">Conoce APG <span>→</span></Link></section>
    <section className="quick-links"><Link href="/aprende-a-jugar"><span>01</span><b>Aprende a jugar</b><i>→</i></Link><Link href="/calendario"><span>02</span><b>Calendario 2026</b><i>→</i></Link><Link href="/ranking"><span>03</span><b>Ranking APG</b><i>→</i></Link></section>
  </main>;
}
