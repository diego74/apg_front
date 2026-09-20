import RankingTable from './RankingTable';
import { Container, Eyebrow, HeroText, PublicHero, PublicPage, Section } from '../components/styles';

export const metadata = { title: 'Ranking | APG' };

export default function Ranking() {
  return <PublicPage>
    <Container><PublicHero><div><Eyebrow>Clasificación oficial</Eyebrow><h1>Ranking APG.</h1></div><HeroText>XXX Torneo Mario Akamine 2026 · Primera categoría.</HeroText></PublicHero></Container>
    <Container><Section><RankingTable /></Section></Container>
  </PublicPage>;
}
