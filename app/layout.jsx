import StyledRegistry from './components/StyledRegistry';
import AppFrame from './components/AppFrame';

export const metadata = {
  title: 'APG | Asociación Perú Gateball',
  description: 'Asociación Perú Gateball'
};

export default function RootLayout({ children }) {
  return <html lang="es"><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;600;700&display=swap" /></head><body><StyledRegistry><AppFrame>{children}</AppFrame></StyledRegistry></body></html>;
}
