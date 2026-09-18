import './globals.css';
import './menu.css';
import Navigation from './components/Navigation';

export const metadata = {
  title: 'APG | Asociación Perú Gateball',
  description: 'Asociación Perú Gateball'
};

export default function RootLayout({ children }) {
  return <html lang="es"><body><Navigation />{children}<footer><span>APG</span><p>Asociación Perú Gateball · Construyendo comunidad desde el deporte.</p></footer></body></html>;
}
