import Link from 'next/link';
import {
  HomeBanner,
  HomeImage,
  HomeInfoLink,
  HomePage,
  IntroBand,
  Kicker,
  QuickLinks,
  TextLink,
} from './components/styles';

export default function Home() {
  return <HomePage>
    <HomeBanner>
      <HomeImage src="/images/home-gateball.jpeg" alt="III Panamericano de Gateball, Perú 2027" fetchPriority="high" />
      <HomeInfoLink href="/panamericano-2027">
        Más info <span aria-hidden="true">↗</span>
      </HomeInfoLink>
    </HomeBanner>
    <IntroBand>
      <Kicker>UN DEPORTE, UNA COMUNIDAD</Kicker>
      <h2>Juega, comparte<br />y deja tu marca.</h2>
      <p>En APG reunimos a personas de todas las edades alrededor de un deporte dinámico, inclusivo y lleno de historias.</p>
      <TextLink href="/acerca-de-apg">Conoce APG <span>→</span></TextLink>
    </IntroBand>
    <QuickLinks>
      <Link href="/aprende-a-jugar"><span>01</span><b>Aprende a jugar</b><i>→</i></Link>
      <Link href="/calendario"><span>02</span><b>Calendario 2026</b><i>→</i></Link>
      <Link href="/ranking"><span>03</span><b>Ranking APG</b><i>→</i></Link>
    </QuickLinks>
  </HomePage>;
}
