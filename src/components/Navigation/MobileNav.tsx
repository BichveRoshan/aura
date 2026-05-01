import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/**
 * Mobile Navigation: Calm Design Implementation
 * - Scroll locking to prevent layout shifts.
 * - Minimalist kinematics with opacity-driven animations.
 */
export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const links = [
    { name: 'Tool', path: '/' },
    { name: 'Copyright Bypass Guide', path: '/guide/youtube-copyright-bypass' },
    { name: 'Transparency & EEAT', path: '/about' },
    { name: 'Technical Support', path: '/contact' },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-[100] p-3 opacity-40 hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm rounded-full md:p-4"
        aria-label="Open Navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col p-saas-gutter"
          >
            <div className="flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 opacity-40 hover:opacity-100 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col mt-20 space-y-10">
              {links.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    text-4xl font-extralight tracking-tighter transition-all duration-300
                    hover:translate-x-2
                    ${isActive ? 'opacity-100' : 'opacity-30'}
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pb-12">
              <p className="text-[10px] uppercase tracking-widest opacity-20">
                AuraRemix &copy; 2026 &mdash; Built for Content Autonomy
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
