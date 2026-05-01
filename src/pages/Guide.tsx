import { JsonLd } from '../components/SEO/JsonLd';
import { BookOpen, Target, Lock, Play, Music, Save, Zap } from 'lucide-react';
import { FAQ } from '../components/UI/FAQ';

export const Guide = () => {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Bypass YouTube Copyright via Acoustic Modification",
    "description": "Step-by-step guide on utilizing phase vocoders to shift audio signatures.",
    "step": [
      { "@type": "HowToStep", "text": "Upload the audio file to AuraRemix." },
      { "@type": "HowToStep", "text": "Adjust Spectral Shift to roughly -3% or +3%." },
      { "@type": "HowToStep", "text": "Generate and download the new resynthesized WAV file." }
    ]
  };

  const faqs = [
    {
      question: "Will I lose audio quality?",
      answer: "Minor shifts (&plusmn;3%) are virtually imperceptible to the human ear but significantly change the digital signature. Higher shifts may introduce some 'phaseiness' or artifacts, which is why we recommend the Spectral Lab for fine-tuning."
    },
    {
      question: "Is this cheating?",
      answer: "We view it as digital self-defense. Automated systems often claim revenue for transformative works that fall under Fair Use. These tools simply provide the technical means for creators to assert their rights."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pt-10 px-6 pb-16 animate-reveal">
      <JsonLd data={howToSchema} />
      
      <div className="flex flex-col items-start gap-2 mb-10 text-left">
        <h1 className="text-5xl font-bold tracking-tighter flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-accent" />
          The <span className="neon-text italic font-extralight text-white">Master</span> Guide
        </h1>
        <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">Defeating Content ID with Digital Signal Processing</p>
      </div>

      <section className="glass-panel p-8 mb-10 text-left border-l-4 border-accent">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-4 h-4 text-accent" />
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold italic text-accent">The Bottom Line</h2>
        </div>
        <p className="text-lg font-light leading-relaxed tracking-tight text-white/90">
          To bypass YouTube&apos;s Content ID acoustic fingerprinting in 2026, creators must modify the <strong>spectral envelope</strong> of their audio. 
          A simple &plusmn;3% pitch shift using a <strong>Phase Vocoder</strong> creates a unique harmonic distribution that differs from original database signatures.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Understanding Content ID</h2>
          <p className="text-[11px] text-muted leading-relaxed">
            Content ID creates a <span className="text-white">binary hash</span> of spectral peaks. If your barcode matches a saved one, you get a claim. ToneForge breaks this match by altering the peak locations.
          </p>
          <div className="p-5 bg-white/5 rounded-xl border border-border">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Lock className="w-3 h-3 text-accent-pink" />
              The Detection Trap
            </h3>
            <ul className="text-[10px] space-y-2 opacity-60">
              <li>• Simple volume shifts: <span className="text-red-500">FAIL</span></li>
              <li>• Equalization (EQ) tweaks: <span className="text-red-500">FAIL</span></li>
              <li>• Mirroring audio: <span className="text-red-500">FAIL</span></li>
              <li>• Bit-depth dithering: <span className="text-red-500">FAIL</span></li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Transformative Use in 2026</h2>
          <p className="text-[11px] text-muted leading-relaxed">
            In 2026, "Transformative Use" is defined by the degree to which an algorithm has fundamentally altered the spectral DNA of a performance. ToneForge is built on the principle of algorithmic transformation.
          </p>
          <p className="text-[11px] text-muted leading-relaxed">
            By applying a non-linear spectral shift, you strengthen your claim that the work is no longer a mere copy, but a distinct creative asset optimized for fair use contexts.
          </p>
        </div>
      </div>

      <div className="glass-panel p-8 mb-12 text-left">
        <h2 className="text-2xl font-bold tracking-tighter mb-6 italic flex items-center gap-4">
          <Play className="w-6 h-6 text-white" />
          Step-by-Step Implementation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="mb-3">
              <Music className="w-5 h-5 text-accent mb-2" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Ingestion</h4>
            </div>
            <p className="text-[10px] text-muted leading-relaxed">Upload source audio in WAV format for maximum spectral fidelity during analysis.</p>
          </div>
          <div>
            <div className="mb-3">
              <Zap className="w-5 h-5 text-accent-pink mb-2" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Modulation</h4>
            </div>
            <p className="text-[10px] text-muted leading-relaxed">Adjust shift between 0.95 and 0.97. This represents the 'Sweet Spot' for breaking ID matches.</p>
          </div>
          <div>
            <div className="mb-3">
              <Save className="w-5 h-5 text-white mb-2" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Export</h4>
            </div>
            <p className="text-[10px] text-muted leading-relaxed">Save the modified stream. Use the Spectral Lab to verify harmonic signature alteration.</p>
          </div>
        </div>
      </div>

      <div className="text-left">
        <FAQ items={faqs} />
      </div>
    </div>
  );
};
