import CalendarEvents from './CalendarEvents';
import { Container, Eyebrow, HeroText, PublicHero, PublicPage, Section, SectionHeader } from '../components/styles';

export const metadata = { title: 'Calendario | APG' };

export default function Calendar() {
  return <PublicPage>
    <Container><PublicHero><div><Eyebrow>Temporada 2026</Eyebrow><h1>Calendario y próximos partidos.</h1></div><HeroText>Fechas oficiales de torneos y actividades publicadas por la Asociación Perú Gateball.</HeroText></PublicHero></Container>
    <Container><Section><SectionHeader><h2>Próximas fechas.</h2><p>El calendario se actualiza desde el panel administrativo.</p></SectionHeader><CalendarEvents /></Section></Container>
  </PublicPage>;
}
