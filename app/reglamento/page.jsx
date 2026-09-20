import styled from 'styled-components';
import { Container, Eyebrow, HeroText, PublicHero, PublicPage, Section } from '../components/styles';

const DownloadCard = styled.div`
  display:grid; grid-template-columns:1fr auto; gap:36px; align-items:center; margin-bottom:clamp(70px,10vw,150px); padding:clamp(34px,5vw,70px); border-radius:30px; color:#fff; background:#142f68;
  h2 { margin:0 0 14px; font:600 clamp(1.8rem,3vw,3.4rem)/1.1 Unbounded,sans-serif; letter-spacing:-.055em; }
  p { margin:0; color:#dbe2ec; line-height:1.6; }
  @media(max-width:900px) { grid-template-columns:1fr; justify-items:start; }
  @media(max-width:600px) { padding:30px 24px; border-radius:22px; }
`;
const DownloadLink = styled.a`
  display:inline-flex; align-items:center; gap:18px; min-width:max-content; padding:16px 22px; border-radius:999px; color:#102237; background:var(--lime); font-weight:800; text-decoration:none;
  &[aria-disabled='true'] { pointer-events:none; color:#fff8; background:#fff2; }
  @media(max-width:600px) { width:100%; min-width:0; justify-content:center; }
`;

export const metadata = { title: 'Reglamento oficial | APG' };

export default function Rules() {
  const url = process.env.NEXT_PUBLIC_RULEBOOK_URL;
  return <PublicPage>
    <Container><PublicHero><div><Eyebrow>Documento oficial</Eyebrow><h1>Reglamento de gateball.</h1></div><HeroText>Consulta el reglamento oficial vigente para competencias y actividades de la Asociación Perú Gateball.</HeroText></PublicHero></Container>
    <Container><Section><DownloadCard><div><h2>Reglamento oficial 2026</h2><p>Documento actualizado y aprobado por la WGU para 2026 en adelante.</p></div><DownloadLink href={url || '#'} download aria-disabled={!url}>{url ? 'Descargar PDF ↓' : 'PDF pendiente de publicar'}</DownloadLink></DownloadCard></Section></Container>
  </PublicPage>;
}
