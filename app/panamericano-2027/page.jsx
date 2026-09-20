import PageHero from '../components/PageHero';
import { InfoGrid, Button } from '../components/styles';

export const metadata = {
  title: 'Panamericano 2027 | APG',
  description: 'III Panamericano de Gateball: 13 y 14 de febrero de 2027 en la Asociación Estadio La Unión (AELU), Pueblo Libre, Perú.'
};

export default function Panamericano2027() {
  return <PageHero
    kicker="PERÚ 2027"
    title="III Panamericano de Gateball"
    description="Conoce la fecha y la sede del encuentro panamericano de gateball en Perú."
  >
    <InfoGrid>
      <article><b>FECHA</b><h2>13 y 14 de febrero</h2><p>2027</p></article>
      <article><b>SEDE</b><h2>Asociación Estadio La Unión</h2><p>AELU · Lima, Perú</p></article>
      <article><b>DIRECCIÓN</b><h2>Pueblo Libre</h2><p>Av. Cipriano Dulanto cdra. 19</p></article>
    </InfoGrid>
    <Button href="/calendario">Ver calendario <span aria-hidden="true">→</span></Button>
  </PageHero>;
}
