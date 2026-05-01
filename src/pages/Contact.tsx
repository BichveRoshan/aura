import { Mail, MessageSquare, AlertCircle, Headphones, Github, Twitter } from 'lucide-react';
import { FAQ } from '../components/UI/FAQ';

export const Contact = () => {
  const faqs = [
    {
      question: "How fast is support?",
      answer: "We typically respond to technical inquiries within 12-24 hours. Emergency reports regarding broken copyright bypasses are prioritized and usually handled within 4-6 hours."
    },
    {
      question: "Can I suggest a new feature?",
      answer: "Absolutely! We love hearing from creators. Many of our current features, like the Spectral Lab analysis, were suggested by users like you."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pt-10 px-6 pb-16 animate-reveal text-left">
      <div className="flex flex-col items-start gap-2 mb-10 text-left">
        <h1 className="text-5xl font-bold tracking-tighter italic">Contact <span className="neon-text text-white">Support</span></h1>
        <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">Direct Access to the Engineering Team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <p className="text-[11px] text-muted leading-relaxed">
            ToneForge is maintained by a small team of dedicated audio engineers. We provide 24/7 monitoring of our resynthesis engines to ensure high uptime for the community.
          </p>
          
          <div className="flex flex-col gap-3">
            <div className="glass-panel p-5 flex items-center gap-5 group hover:bg-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-all">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Email</h3>
                <p className="text-[9px] text-muted">support@toneforge.remix</p>
              </div>
            </div>

            <div className="glass-panel p-5 flex items-center gap-5 group hover:bg-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent-pink/20 flex items-center justify-center group-hover:bg-accent-pink transition-all">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Discord</h3>
                <p className="text-[9px] text-muted">Join the server</p>
              </div>
            </div>

            <div className="glass-panel p-5 flex items-center gap-5 group hover:bg-red-500/10 border-red-500/20 transition-all border">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-500">Security</h3>
                <p className="text-[9px] text-red-500/70">Algorithm failure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 flex flex-col justify-between items-start">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
              <Headphones className="w-4 h-4 text-accent" />
              <h2 className="text-[10px] uppercase tracking-widest font-bold">Social</h2>
            </div>
            <div className="space-y-3 w-full">
              <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Github</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <Twitter className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">X / Twitter</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </a>
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-accent/10 border border-accent/20 rounded-xl w-full">
            <p className="text-[9px] uppercase font-bold tracking-widest mb-1.5 text-accent">Availability</p>
            <p className="text-[10px] text-muted leading-relaxed">
              We triage reports hourly. Average response time: <strong>4.2h</strong>.
            </p>
          </div>
        </div>
      </div>

      <section className="glass-panel p-8 mb-12 text-left">
        <h2 className="text-lg font-bold tracking-tight mb-4 text-white">Our Community Commitment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-muted leading-relaxed">
          <p>
            At ToneForge, we don't just build tools; we build <span className="text-white font-medium">resilience</span>. Our engineering team commits to weekly updates of the spectral modulation algorithms to stay ahead of identification system training models. We rely on your feedback to identify edge cases where resynthesis artifacts might be too high or bypass rates too low.
          </p>
          <p>
            We are dedicated to maintaining an ad-free, account-free experience. Your creative workflows should be as frictionless as possible. If you encounter a Content ID claim while using our modified audio, please use our 'Algorithm failure' channel immediately—we use these reports to refine the engine for everyone.
          </p>
        </div>
      </section>

      <div className="text-left">
        <FAQ items={faqs} />
      </div>
    </div>
  );
};
