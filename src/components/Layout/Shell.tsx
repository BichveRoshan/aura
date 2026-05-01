import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MobileNav } from '../Navigation/MobileNav';

/**
 * Global Shell: Enforces Calm Design principles.
 * Maximizes whitespace and ensures UI elements are hidden until invoked.
 */
export const Shell = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen selection:bg-black selection:text-white relative">
      <MobileNav />
      {children}
      
      {/* 2026 SEO Signal: Persistent Transparency Link in Footer */}
      <footer className="py-20 px-saas-gutter border-t border-border mt-32">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <h3 className="text-[11px] uppercase tracking-widest font-bold mb-4 italic opacity-40">AuraRemix</h3>
            <p className="text-sm opacity-40 font-light leading-relaxed">
              We provide decentralized audio processing tools to help creators maintain control over their artistic output. 
              Our utility is free, private, and runs entirely in your browser.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[11px] uppercase tracking-widest opacity-40">
            <a href="/guide/youtube-copyright-bypass" className="hover:opacity-100 transition-opacity">SEO Copyright Guide</a>
            <a href="/about" className="hover:opacity-100 transition-opacity">About & Transparency</a>
            <a href="/contact" className="hover:opacity-100 transition-opacity">Technical Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
