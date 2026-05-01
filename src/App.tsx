import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Shell } from './components/Layout/Shell';
import { Home } from './pages/Home';
import { Guide } from './pages/Guide';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

/**
 * Principal Application Entry Point
 * Implements a high-performance, SEO-optimized routing architecture.
 */
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide/youtube-copyright-bypass" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </HelmetProvider>
  );
}
