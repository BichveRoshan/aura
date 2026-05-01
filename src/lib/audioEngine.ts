/**
 * Digital Signal Processing Engine (DSP)
 * Utilizes the Web Audio API for 100% client-side harmonic modification.
 * Purpose: Bypassing acoustic fingerprinting while maintaining audio fidelity.
 */
export class AudioEngine {
  private context: AudioContext | null = null;

  private init() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.context;
  }

  /**
   * Processes an AudioBuffer to shift its spectral identity.
   * @param buffer The original audio sample.
   * @param pitchShift Target shift factor (0.95 to 1.05 typically).
   */
  async processAudio(buffer: AudioBuffer, pitchShift: number): Promise<AudioBuffer> {
    const ctx = this.init();
    
    // Offline Context for rendering high-speed exports
    const offlineCtx = new OfflineAudioContext(
      buffer.numberOfChannels,
      buffer.length,
      buffer.sampleRate
    );

    const source = offlineCtx.createBufferSource();
    source.buffer = buffer;

    // Shift playback rate to alter the frequency spectrum
    // Note: In a production 'Phase Vocoder', we would use an IFFT/FFT loop
    // to preserve temporal duration. For this MVP, we use quality resampling.
    source.playbackRate.setValueAtTime(pitchShift, offlineCtx.currentTime);
    
    source.connect(offlineCtx.destination);
    source.start(0);

    return await offlineCtx.startRendering();
  }

  /**
   * Helper to decode file data into an AudioBuffer.
   */
  async decode(file: File): Promise<AudioBuffer> {
    const ctx = this.init();
    const arrayBuffer = await file.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
  }

  /**
   * Converts an AudioBuffer to a downloadable Blob (WAV format).
   */
  toWav(buffer: AudioBuffer): Blob {
    const channelData = [];
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channelData.push(buffer.getChannelData(i));
    }
    
    const interleaved = this.interleave(channelData);
    const wavBuffer = this.createWavBuffer(interleaved, buffer.sampleRate, buffer.numberOfChannels);
    
    return new Blob([wavBuffer], { type: 'audio/wav' });
  }

  private interleave(channels: Float32Array[]): Float32Array {
    const length = channels[0].length * channels.length;
    const result = new Float32Array(length);
    for (let i = 0, j = 0; i < channels[0].length; i++) {
      for (let k = 0; k < channels.length; k++) {
        result[j++] = channels[k][i];
      }
    }
    return result;
  }

  private createWavBuffer(samples: Float32Array, sampleRate: number, channels: number): ArrayBuffer {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * 2, true);
    view.setUint16(32, channels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return buffer;
  }
}
