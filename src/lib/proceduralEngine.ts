
import { AudioContext } from 'standardized-audio-context';

export class ProceduralEngine {
  private ctx: AudioContext | null = null;
  private masterGain: any = null;
  private filter: any = null;
  private delay: any = null;
  private oscillators: any[] = [];
  private isPlaying: boolean = false;
  private tempo: number = 90;
  private interval: any = null;

  async init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.filter = this.ctx.createBiquadFilter();
    this.delay = this.ctx.createDelay(1.0);
    const delayGain = this.ctx.createGain();

    this.masterGain.gain.value = 0.5;
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 2000;
    this.delay.delayTime.value = 0.3;
    delayGain.gain.value = 0.4;

    this.masterGain.connect(this.filter);
    this.filter.connect(this.ctx.destination);
    
    // Feedback loop
    this.filter.connect(this.delay);
    this.delay.connect(delayGain);
    delayGain.connect(this.delay);
    delayGain.connect(this.filter);
  }

  setVolume(val: number) {
    if (this.masterGain) this.masterGain.gain.setTargetAtTime(val, this.ctx!.currentTime, 0.1);
  }

  setFilter(freq: number) {
    if (this.filter) this.filter.frequency.setTargetAtTime(freq, this.ctx!.currentTime, 0.1);
  }

  setTempo(bpm: number) {
    this.tempo = bpm;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  private playTone() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    
    // Pentatonic scale-ish
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00];
    const freq = notes[Math.floor(Math.random() * notes.length)] * (Math.random() > 0.5 ? 1 : 2);
    
    osc.type = Math.random() > 0.8 ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    g.gain.setValueAtTime(0, this.ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    
    osc.connect(g);
    g.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 1);
  }

  regenerate() {
    // Shuffles patterns or resets context state for variation
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const step = (60 / this.tempo) * 500; // Half notes
    this.interval = setInterval(() => this.playTone(), step);
  }

  stop() {
    this.isPlaying = false;
    if (this.interval) clearInterval(this.interval);
  }

  getAnalyser() {
    if (!this.ctx) return null;
    const analyser = this.ctx.createAnalyser();
    this.filter.connect(analyser);
    return analyser;
  }
}
