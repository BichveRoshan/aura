import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Navigation/Header';
import { Music, Github, Twitter, Mail } from 'lucide-react';

export const Shell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col bg-background text-white selection:bg-accent selection:text-white">
      <Header />
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      <footer className="py-16 px-6 border-t border-border mt-16 bg-surface/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                ToneForge <span className="neon-text italic font-extralight">Remix</span>
              </h3>
            </div>
            <p className="text-xs text-muted max-w-sm leading-relaxed mb-8">
              Decentralized audio processing for the modern creator. We empower YouTubers and streamers through mathematical audio sovereignty.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-accent transition-all group">
                <Github className="w-5 h-5 opacity-50 group-hover:opacity-100" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-accent transition-all group">
                <Twitter className="w-5 h-5 opacity-50 group-hover:opacity-100" />
              </a>
              <a href="mailto:support@toneforge.remix" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-accent transition-all group">
                <Mail className="w-5 h-5 opacity-50 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-muted">Platform</h4>
            <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-muted">
              <Link to="/" className="hover:text-accent transition-colors">Generator</Link>
              <Link to="/remix" className="hover:text-accent transition-colors">Remix Station</Link>
              <Link to="/spectral" className="hover:text-accent transition-colors">Spectral Lab</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-muted">Resources</h4>
            <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-muted">
              <Link to="/guide/youtube-copyright-bypass" className="hover:text-accent transition-colors">Copyright Guide</Link>
              <Link to="/about" className="hover:text-accent transition-colors">About Story</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">Get Support</Link>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 text-[9px] uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 ToneForge Systems</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>All Rights Reserved</span>
          </div>
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              Nodes Active
            </span>
            <span>V 2.4.0-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

