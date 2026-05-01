import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Zap, Layers, BookOpen, Menu, X, MessageSquare, Activity } from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'ToneForge', path: '/', icon: Zap },
    { name: 'Remix Station', path: '/remix', icon: Layers },
    { name: 'Spectral Lab', path: '/spectral', icon: Music },
    { name: 'Guide', path: '/guide/youtube-copyright-bypass', icon: BookOpen },
  ];

  return (
    <header className="header-blur">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 shrink-0 group" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-pink rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all group-hover:scale-105 duration-500">
            <Zap className="w-5 h-5 text-white animate-pulse-slow" />
          </div>
          <span className="text-xl font-bold tracking-tighter flex items-center">
            TONEFORGE <span className="text-accent ml-2 italic font-black">X</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all
                ${isActive ? 'bg-white text-black shadow-xl shadow-white/5 translate-y-[-1px]' : 'text-muted hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <NavLink 
            to="/contact"
            className="px-6 py-2.5 rounded-xl bg-accent text-white text-[10px] uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95 transition-all flex items-center gap-2 group"
          >
            <MessageSquare className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Support
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-white opacity-70 hover:opacity-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-0 top-20 bg-background/95 backdrop-blur-xl border-b border-border z-[60] overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-4 p-4 rounded-xl text-sm uppercase tracking-widest font-bold transition-all
                    ${isActive ? 'bg-accent/10 text-accent' : 'text-muted bg-white/5 hover:bg-white/10'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-border">
                <button className="w-full py-4 rounded-xl border border-border text-xs uppercase tracking-widest font-bold text-center">
                  Get Technical Support
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
