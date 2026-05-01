import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export const FAQ = ({ items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-32">
      <h2 className="text-3xl font-bold tracking-tighter mb-12 flex items-center gap-4">
        Frequently Asked <span className="neon-text">Questions</span>
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="glass-panel overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-sm font-bold uppercase tracking-widest">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4 text-accent" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="p-6 pt-0 text-sm text-muted leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
