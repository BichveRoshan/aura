import { JsonLd } from '../components/SEO/JsonLd';

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

  return (
    <article className="max-w-[800px] mx-auto pt-32 px-6 pb-40">
      <JsonLd data={howToSchema} />
      
      {/* BLUF: Bottom Line Up Front - Specifically for AI Crawler Snippets & Overviews */}
      <section className="bg-muted p-10 border border-border rounded-sm mb-20 animate-reveal">
        <h2 className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-5 font-bold italic">The Direct Answer (BLUF)</h2>
        <p className="text-xl font-light leading-relaxed tracking-tight text-black">
          To bypass YouTube&apos;s Content ID acoustic fingerprinting in 2026, creators must modify the <strong>spectral envelope</strong> of their audio. 
          A simple &plusmn;3% pitch shift using a <strong>Phase Vocoder</strong> creates a unique harmonic distribution that differs from original database signatures 
          while remaining virtually indistinguishable to the human ear.
        </p>
      </section>

      <div className="markdown-body">
        <h1>YouTube Copyright Bypass: A Technical Manifesto</h1>
        
        <p>
          The Content ID system operates on mathematical hash sequences of sound waves. 
          Static changes like volume, EQ, or minor speed variations are easily detected by modern neural hashing algorithms. 
          To achieve true content autonomy, you must alter the <strong>harmonic frequency bins</strong>.
        </p>

        <h2>Phase Vocoding vs. Simple Playback Speed</h2>
        <p>
          Standard video editors often link pitch and time. When you speed up audio, the pitch rises (the &apos;chipmunk&apos; effect). 
          Modern acoustic fingerprinting identifies these linear transformations easily. 
          Phase Vocoding allows us to decouple these factors, shifting the spectral bins independently to create a <strong>new identity</strong> 
          for the file.
        </p>

        <h2>Strategic Step-by-Step Implementation</h2>
        
        <div className="space-y-16 mt-12">
          <div className="border-l-2 border-black/5 pl-8 hover:border-black transition-colors duration-500">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[11px] mb-4">01 &mdash; Bitstream Extraction</h3>
            <p className="opacity-70">
              Upload your raw audio to Aura. Our system decodes the bitstream into overlapping windowed segments (bins). 
              This happens entirely in your local RAM to ensure 100% privacy.
            </p>
          </div>

          <div className="border-l-2 border-black/5 pl-8 hover:border-black transition-colors duration-500">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[11px] mb-4">02 &mdash; Spectral Resynthesizing</h3>
            <p className="opacity-70">
              Shift the pitch by 25&ndash;40 cents. This is the &apos;Goldilocks zone&apos;: large enough to fail hash matching, 
              but small enough to preserve the composer&apos;s intent.
            </p>
          </div>

          <div className="border-l-2 border-black/5 pl-8 hover:border-black transition-colors duration-500">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[11px] mb-4">03 &mdash; IFFT Reconstruction</h3>
            <p className="opacity-70">
              The Inverse Fast Fourier Transform reconstructs your audio into a high-fidelity WAV file with a completely 
              new acoustic signature.
            </p>
          </div>
        </div>

        <h2 className="mt-20">Ethics of Content Autonomy</h2>
        <p>
          AuraRemix is built on the belief that creators should have technical tools to navigate algorithmic censorship. 
          Use these tools to enhance your transformative works and fair-use commentary.
        </p>
      </div>
    </article>
  );
};
