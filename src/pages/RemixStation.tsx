import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Download, RotateCcw, Sliders, AlertCircle, Disc, Waves, ShieldCheck, History, RefreshCw, Zap } from 'lucide-react';
import { AudioEngine } from '../lib/audioEngine';
import { JsonLd } from '../components/SEO/JsonLd';
import { FAQ } from '../components/UI/FAQ';

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AuraRemix Phase Vocoder",
  "operatingSystem": "Web",
  "applicationCategory": "MultimediaApplication",
  "description": "Free pro-grade audio alteration for YouTube creators to modify harmonic signatures.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export const RemixStation = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalBuffer, setOriginalBuffer] = useState<AudioBuffer | null>(null);
  const [pitchShift, setPitchShift] = useState(0.97); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  
  const engine = useRef(new AudioEngine());

  const faqs = [
    {
      question: "Will this bypass all YouTube copyright?",
      answer: "No single tool can guarantee a 100% bypass as Content ID evolves. However, harmonic shifting is one of the most effective technical methods for altering a file's binary fingerprint while keeping the audio pleasant to listen to."
    },
    {
      question: "Does my audio file get uploaded to a server?",
      answer: "Never. AuraRemix operates 100% in your browser's memory using the Web Audio API. Your files never leave your computer, ensuring total privacy and security."
    },
    {
      question: "What is the recommended shift percentage?",
      answer: "We recommend a shift between -3% to -5% (0.97 to 0.95) or +3% to +5% (1.03 to 1.05). This is usually enough to change the spectrogram identity without causing significant distortion."
    }
  ];

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setIsProcessing(true);
    try {
      const buffer = await engine.current.decode(selected);
      setOriginalBuffer(buffer);
    } catch (error) {
      console.error('Audio decoding failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processAudio = async () => {
    if (!originalBuffer) return;
    
    setIsProcessing(true);
    try {
      const processed = await engine.current.processAudio(originalBuffer, pitchShift);
      const blob = engine.current.toWav(processed);
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
    } catch (error) {
      console.error('Audio processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <JsonLd data={softwareSchema} />
      
      <div className="max-w-2xl w-full mb-10 animate-reveal">
        <h1 className="text-6xl font-bold tracking-tighter mb-3">Remix<span className="neon-text">Station</span></h1>
        <p className="text-muted tracking-wide text-xs opacity-60">Modify your audio to create a unique acoustic fingerprint for Content ID autonomy.</p>
        
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest font-bold opacity-30">
            <ShieldCheck className="w-4 h-4" />
            Private
          </div>
          <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest font-bold opacity-30">
            <Waves className="w-4 h-4" />
            STFT
          </div>
          <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest font-bold opacity-30">
            <History className="w-4 h-4" />
            WASM
          </div>
        </div>

        <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-4 text-left">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[9px] text-orange-500 font-bold uppercase tracking-widest mb-1">Algorithm Warning</p>
            <p className="text-[10px] text-orange-500/70 leading-relaxed">
              Detection systems are constantly evolving. While spectral shifting is highly effective, always verify transformative context.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div 
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl glass-panel p-16 border-dashed border-2 border-white/5 hover:border-accent transition-all group relative overflow-hidden mb-12"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] opacity-5 grayscale group-hover:scale-110 transition-transform duration-1000" />
            <label className="relative z-10 cursor-pointer flex flex-col items-center">
              <input type="file" className="hidden" accept="audio/*" onChange={handleFileChange} />
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-3">Drop Audio File</h2>
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-bold">WAV / MP3 / OGG &lt; 20MB</p>
            </label>
          </motion.div>
        ) : (
          <motion.section 
            key="controls"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-3xl mb-12"
          >
            <div className="glass-panel p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Disc className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-30 mb-0.5">Active</p>
                  <h3 className="text-base font-bold tracking-tight truncate max-w-[200px]">{file.name}</h3>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setOutputUrl(null); }}
                className="w-10 h-10 flex items-center justify-center glass-panel hover:bg-red-500/10 hover:border-red-500/30 text-red-500 transition-all rounded-xl"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="glass-panel p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Sliders className="w-4 h-4 text-accent" />
                  <p className="text-[9px] uppercase tracking-widest font-bold">Shift Factor</p>
                </div>
                <input 
                  type="range" 
                  min="0.8" 
                  max="1.2" 
                  step="0.01"
                  value={pitchShift}
                  onChange={(e) => setPitchShift(parseFloat(e.target.value))}
                  className="w-full accent-accent bg-white/5 h-1 mb-6 rounded-full appearance-none" 
                />
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="opacity-30">Harmonic Soft</span>
                  <span className="text-accent bg-accent/10 px-2.5 py-0.5 rounded-lg">{(pitchShift - 1).toLocaleString('en', { style: 'percent', signDisplay: 'always' })}</span>
                  <span className="opacity-30">Spectrum Sharp</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  disabled={isProcessing}
                  onClick={processAudio}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-accent-pink text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  )}
                  {isProcessing ? 'Calculating...' : 'Modulate Signature'}
                </button>

                {outputUrl && (
                  <motion.a 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    href={outputUrl}
                    download={`remix_${file.name.split('.')[0]}.wav`}
                    className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-center flex items-center justify-center gap-3 shadow-xl group"
                  >
                    <Download className="w-4 h-4 text-accent-pink group-hover:-translate-y-0.5 transition-transform" />
                    Download File
                  </motion.a>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="w-full max-w-3xl glass-panel p-8 mb-12 text-left">
        <h2 className="text-lg font-bold tracking-tight mb-4">Acoustic Fingerprinting 101</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-muted leading-relaxed">
          <p>
            When you upload a video to YouTube, their <span className="text-white font-medium">Content ID</span> system generates a fingerprint. This fingerprint is essentially a mathematical graph of peak frequencies and rhythmic transients. If your graph matches any graph in their billion-song database, you lose monetization.
          </p>
          <p>
            By using <span className="text-white font-medium">Remix Station</span>, you are applying a non-linear spectral shift. We take every frequency bin in your audio and move it by a precise fractional percentage. This offsets the fingerprint enough to fail the exact-match test while retaining high-fidelity audio the human ear enjoys.
          </p>
        </div>
      </section>

      <div className="w-full max-w-3xl text-left">
        <FAQ items={faqs} />
      </div>
    </main>
  );
};
