export const About = () => {
  return (
    <article className="max-w-[800px] mx-auto pt-32 px-6 pb-40">
      <div className="markdown-body">
        <h3 className="text-[10px] uppercase tracking-widest opacity-30 mb-2 font-bold">Transparency Report</h3>
        <h1>Establishing Trust in the Age of Algorithms</h1>
        
        <p className="text-lg italic opacity-50 mb-12">
          AuraRemix is a 100% free, open-source-aligned utility created to democratize digital signal processing for the independent creator economy.
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold mt-0 mb-4 opacity-100">Experience & Expertise</h2>
            <p className="text-sm">
              Our core logic is derived from decades of research into the <strong>Phase Vocoder</strong> and FFT analysis. 
              We leverage browser-native Web Audio APIs to ensure processing accuracy without the need for expensive server-side hardware.
            </p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold mt-0 mb-4 opacity-100">Authoritativeness</h2>
            <p className="text-sm">
              Built by a collective of audio engineers and technical SEOs, Aura represents a commitment to technical transparency. 
              We do not hide behind login walls or tiered subscriptions.
            </p>
          </div>
        </section>

        <h2 className="mt-24">The "Zero-Trust" Processing Architecture</h2>
        <p>
          In 2026, data privacy is the ultimate trust signal. Unlike other "free" tools that harvest your audio to train AI models, 
          AuraRemix never transmits your files. Your audio enters your browser, is processed in a transient <code>OfflineAudioContext</code>, 
          and leaves only when you click download. 
        </p>

        <div className="p-8 border border-border rounded-sm mt-12 bg-muted">
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4">Integrity Disclaimer</h3>
          <p className="text-xs opacity-60 mb-0">
            AuraRemix does not claim to circumvent copyright laws; it provides the technical capability to modify audio fingerprints. 
            We encourage users to follow Fair Use guidelines and respect intellectual property within transformative contexts.
          </p>
        </div>
      </div>
    </article>
  );
};
