import { motion } from 'motion/react';
import { Shield, Brain, Music, Code2, Globe, Heart } from 'lucide-react';
import { FAQ } from '../components/UI/FAQ';

export const About = () => {
  const faqs = [
    {
      question: "Who built ToneForge?",
      answer: "ToneForge was developed by a collective of audio engineers and legal researchers who believe that creative autonomy is under threat by automated copyright systems. We build tools that bridge the gap between creative intent and algorithm compliance."
    },
    {
      question: "Is this legal?",
      answer: "Yes. Modifying audio for transformative use (like background music for a commentary video) is a core component of Fair Use. Our tools simply automate the technical audio processing required to distinguish your content from the original fingerprint."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pt-10 px-6 pb-16 animate-reveal text-left">
      <div className="flex flex-col items-start gap-2 mb-10 text-left">
        <h1 className="text-5xl font-bold tracking-tighter italic">About <span className="neon-text text-white">ToneForge</span></h1>
        <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">Pioneering Audio Sovereignty since 2024</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-[11px] text-muted leading-relaxed">
            ToneForge was born out of a simple observation: the internet's copyright enforcement mechanisms have become too blunt. Innocent creators often find themselves silenced by "false positives" or overly aggressive automated systems.
          </p>
          <p className="text-[11px] text-muted leading-relaxed">
            We provide the <span className="text-white">technical armor</span> necessary for modern digital storytelling. By applying advanced Digital Signal Processing (DSP), we help creators maintain their voice in an increasingly moderated world.
          </p>
        </div>
        <div className="glass-panel p-6 flex flex-col justify-center gap-5">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest">Autonomy</p>
              <p className="text-[9px] text-muted">Protecting creative independence.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-accent-pink/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-accent-pink" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest">Innovation</p>
              <p className="text-[9px] text-muted">Pushing the boundaries of DSP.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white/50" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest">Global</p>
              <p className="text-[9px] text-muted">Supporting creators across borders.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="glass-panel p-8 mb-12 text-left">
        <h2 className="text-lg font-bold tracking-tight mb-4 text-white">The Core Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-muted leading-relaxed">
          <p>
            We believe that <span className="text-white font-medium">Digital Signal Processing</span> should be accessible to everyone, not just signal engineers. Our philosophy is rooted in decentralization; by moving complex audio synthesis into the client-side browser, we ensure that users maintain total control over their creative assets.
          </p>
          <p>
            Privacy isn't just a feature—it's the architecture. By utilizing WebAssembly to perform heavy-lift FFT calculations locally, we eliminate the need for account systems or cloud storage. This "stateless" approach to audio editing is our commitment to user security.
          </p>
        </div>
      </section>

      <div className="glass-panel p-8 mb-12 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Code2 className="w-24 h-24" />
        </div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-2xl font-bold tracking-tighter mb-4 italic">Built on Open Standards</h2>
          <p className="text-[11px] text-muted leading-relaxed mb-6">
            ToneForge is built using <span className="text-white">React 18</span>, <span className="text-white">Web Audio API</span>, and <span className="text-white">WebAssembly</span>. We believe the browser is the ultimate sandbox for audio manipulation. Our STFT engine is optimized for high-fidelity processing without the need for expensive rack hardware.
          </p>
          <div className="flex items-center gap-2 text-accent text-[10px] font-bold tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5" />
            Made for the creator community
          </div>
        </div>
      </div>

      <div className="text-left">
        <FAQ items={faqs} />
      </div>
    </div>
  );
};
