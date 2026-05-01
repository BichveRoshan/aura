import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Shell } from './components/Layout/Shell';
import { ProceduralGenerator } from './pages/ProceduralGenerator';
import { RemixStation } from './pages/RemixStation';
import { SpectralLab } from './pages/SpectralLab';
import { Guide } from './pages/Guide';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

/**
 * Principal Application Entry Point
 * Overhauled for 2026 Dark Mode Standards.
 */
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<ProceduralGenerator />} />
            <Route path="/remix" element={<RemixStation />} />
            <Route path="/spectral" element={<SpectralLab />} />
            <Route path="/guide/youtube-copyright-bypass" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </HelmetProvider>
  );
}
