import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Zap, Info, Upload, Play, Pause, BarChart3, Binary, ShieldAlert, Layers, Clock } from 'lucide-react';
import { FAQ } from '../components/UI/FAQ';

export const SpectralLab = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  const faqs = [
    {
      question: "What is Spectral Analysis?",
      answer: "Spectral analysis, or Short-Time Fourier Transform (STFT), breaks down complex audio waves into individual frequency components. In our lab, we use this to visualize the 'fingerprint' of your audio, allowing you to see exactly where the energy is concentrated."
    },
    {
      question: "How does this help with copyright?",
      answer: "By seeing the spectrogram, you can identify the unique harmonic peaks that Content ID uses for fingerprinting. Shifting these peaks manually or via our automated tools helps disrupt the binary match in copyright databases."
    },
    {
      question: "Is this tool using AI?",
      answer: "No, this is pure Digital Signal Processing (DSP). We believe in transparent, deterministic tools. While AI is used for recognition by big platforms, we use traditional math to help you navigate those systems."
    }
  ];

  const handleFileUpload = async (e: any) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setIsAnalysing(true);
    
    const arrayBuffer = await selected.arrayBuffer();
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const buffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    audioBufferRef.current = buffer;
    
    setupAnalyser();
    setIsAnalysing(false);
  };

  const setupAnalyser = () => {
    if (!audioContextRef.current) return;
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    draw();
  };

  const togglePlay = () => {
    if (!audioContextRef.current || !audioBufferRef.current || !analyserRef.current) return;

    if (isPlaying) {
      sourceRef.current?.stop();
      setIsPlaying(false);
    } else {
      sourceRef.current = audioContextRef.current.createBufferSource();
      sourceRef.current.buffer = audioBufferRef.current;
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      sourceRef.current.start(0);
      setIsPlaying(true);
      
      sourceRef.current.onended = () => setIsPlaying(false);
    }
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationIdRef.current = requestAnimationFrame(renderFrame);
      analyserRef.current!.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(1, '#ec4899');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    renderFrame();
  };

  useEffect(() => {
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-10 px-6 pb-16 animate-reveal">
      <div className="flex flex-col items-start gap-2 mb-10 text-left">
        <h1 className="text-5xl font-bold tracking-tighter italic">Spectral <span className="neon-text text-white">Lab</span></h1>
        <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">Granular Harmonic Reconstruction Engine v2.4</p>
        
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="px-3 py-1 bg-white/5 border border-border rounded-lg flex items-center gap-2 text-[9px] font-bold tracking-widest text-muted">
            <Binary className="w-3 h-3 text-accent" />
            BIT-DEPTH: 24
          </div>
          <div className="px-3 py-1 bg-white/5 border border-border rounded-lg flex items-center gap-2 text-[9px] font-bold tracking-widest text-muted">
            <Layers className="w-3 h-3 text-accent-pink" />
            HASH-SYNC: ACTIVE
          </div>
          <div className="px-3 py-1 bg-white/5 border border-border rounded-lg flex items-center gap-2 text-[9px] font-bold tracking-widest text-muted">
            <Clock className="w-3 h-3 opacity-40" />
            LATENCY: 12ms
          </div>
        </div>
      </div>

      <div className="glass-panel p-10 mb-8 relative overflow-hidden min-h-[350px] flex flex-col items-center justify-center">
        {!file ? (
          <div className="flex flex-col items-center gap-6 text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center animate-glow">
              <BarChart3 className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2">Load Diagnostic Data</h2>
              <p className="text-[10px] text-muted leading-relaxed mb-6">
                Upload an audio stream to perform a deep-packet spectral analysis. We visualize the harmonic bins used by identification algorithms.
              </p>
              <label className="px-6 py-2.5 bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:invert transition-all cursor-pointer">
                <input type="file" className="hidden" accept="audio/*" onChange={handleFileUpload} />
                Open Analyzer
              </label>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-30">Diagnostic Map</p>
                  <p className="text-sm font-bold tracking-tight text-white truncate max-w-[200px]">{file.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 glass-panel flex items-center justify-center hover:bg-white/10 transition-all text-white rounded-xl"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setFile(null)}
                  className="px-3 text-[8px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="relative flex-grow flex items-end bg-black/40 rounded-xl border border-border p-4 overflow-hidden h-48">
              <canvas ref={canvasRef} width={800} height={180} className="w-full h-full" />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-30 italic">Live Stream</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="glass-panel p-8 mb-8 text-left">
        <h2 className="text-lg font-bold tracking-tight mb-4">Advanced Waveform Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-muted leading-relaxed">
          <p>
            The <span className="text-white font-medium">Spectral Lab</span> provides a peak-meter and FFT visualizer to identify harmonic density. By observing the spectrogram, you can spot "resonant anomalies"—strong frequency clusters that identification systems target. Our engine reveals these clusters, allowing you to fine-tune the remix factors for optimal autonomy.
          </p>
          <p>
            Using a transient-preserving Phase Vocoder algorithm, the lab ensures that even extreme spectral shifts maintain the rhythmic clarity of the source material. This is crucial for high-tempo music where rhythmic transients are the backbone of the composition.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-accent" />
            <h3 className="text-[9px] uppercase tracking-widest font-bold opacity-30 italic font-bold">FFT Window</h3>
          </div>
          <div className="space-y-2">
            {[1024, 2048, 4096, 8192].map((size) => (
              <label key={size} className="flex items-center justify-between p-3 bg-white/5 border border-border rounded-xl cursor-pointer hover:border-accent/40 transition-all group hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${size === 2048 ? 'bg-accent animate-pulse' : 'bg-white/20 group-hover:bg-white/40'}`} />
                  <span className="text-[10px] font-mono opacity-60 group-hover:opacity-100">{size} Windows</span>
                </div>
                <input type="radio" name="fft" className="accent-accent" defaultChecked={size === 2048} />
              </label>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-accent-pink" />
              <h3 className="text-[9px] uppercase tracking-widest font-bold opacity-30 italic font-bold">Diagnostics</h3>
            </div>
            <p className="text-[11px] text-muted leading-relaxed mb-6">
              Enable Phase Coherency to eliminate metallic artifacts. This stabilizes the transient peaks across the spectral map.
            </p>
            <div className="p-3 bg-accent-pink/5 border border-accent-pink/20 rounded-xl flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-accent-pink shrink-0" />
              <p className="text-[9px] text-accent-pink font-bold uppercase tracking-widest italic">
                PCM verification enabled.
              </p>
            </div>
          </div>
          <button className="w-full py-3.5 mt-6 border border-accent/30 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:border-accent hover:bg-accent/10 transition-all flex items-center justify-center gap-2 group">
            <Zap className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
            Initiate Processing
          </button>
        </div>
      </div>

      <FAQ items={faqs} />
    </div>
  );
};
