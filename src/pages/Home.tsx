import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Download, RotateCcw, Sliders } from 'lucide-react';
import { AudioEngine } from '../lib/audioEngine';
import { JsonLd } from '../components/SEO/JsonLd';

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalBuffer, setOriginalBuffer] = useState<AudioBuffer | null>(null);
  const [pitchShift, setPitchShift] = useState(0.97); // Default -3% for better bypass
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  
  const engine = useRef(new AudioEngine());

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

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <JsonLd data={softwareSchema} />
      
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.section 
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-4 italic">Aura</h1>
            <p className="opacity-40 font-light mb-16 tracking-widest text-xs uppercase">
              Universal Acoustic Resynthesis Utility
            </p>
            
            <label className="group relative cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                accept="audio/*" 
                onChange={handleFileChange}
              />
              <div className="w-64 h-64 md:w-80 md:h-80 border border-dashed border-border rounded-full flex items-center justify-center group-hover:border-black transition-all duration-700 hover:scale-[1.02]">
                <div className="text-center">
                  <Upload className="w-6 h-6 mx-auto mb-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] uppercase tracking-widest font-medium opacity-40 group-hover:opacity-100">Drop Audio File</span>
                </div>
              </div>
            </label>
          </motion.section>
        ) : (
          <motion.section 
            key="controls"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl px-saas-gutter"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest opacity-20 mb-2">Active Project</p>
                <h2 className="text-3xl font-extralight tracking-tight truncate max-w-xs md:max-w-md">
                  {file.name}
                </h2>
              </div>
              <button 
                onClick={() => { setFile(null); setOutputUrl(null); }}
                className="p-4 border border-border rounded-full opacity-40 hover:opacity-100 transition-opacity"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left">
              <div className="p-8 bg-muted border border-border rounded-sm">
                <div className="flex items-center gap-2 mb-6 opacity-40">
                  <Sliders className="w-3 h-3" />
                  <p className="text-[9px] uppercase tracking-widest italic font-bold">Spectral Shift</p>
                </div>
                <input 
                  type="range" 
                  min="0.8" 
                  max="1.2" 
                  step="0.01"
                  value={pitchShift}
                  onChange={(e) => setPitchShift(parseFloat(e.target.value))}
                  className="w-full appearance-none h-[1px] bg-black/10 accent-black outline-none mb-4" 
                />
                <div className="flex justify-between text-[10px] uppercase tracking-tighter opacity-40">
                  <span>Depper (-20%)</span>
                  <span className="font-bold text-black opacity-100">{(pitchShift - 1).toLocaleString('en', { style: 'percent', signDisplay: 'always' })}</span>
                  <span>Sharper (+20%)</span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-6">
                <button 
                  disabled={isProcessing}
                  onClick={processAudio}
                  className={`
                    px-12 py-5 bg-black text-white text-[11px] uppercase tracking-widest font-bold
                    transition-all duration-300
                    ${isProcessing ? 'opacity-50 cursor-wait' : 'hover:scale-[1.01] hover:shadow-2xl'}
                  `}
                >
                  {isProcessing ? 'Modifying Harmonic Distribution...' : 'Generate New Acoustic Signature'}
                </button>

                {outputUrl && (
                  <motion.a 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    href={outputUrl}
                    download={`auraremix_${file.name.split('.')[0]}.wav`}
                    className="flex items-center justify-center gap-3 py-5 border border-black text-black text-[11px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download Bypass-Ready Audio
                  </motion.a>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};
