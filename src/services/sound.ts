class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private activeDroneOsc1: OscillatorNode | null = null;
  private activeDroneOsc2: OscillatorNode | null = null;
  private activeDroneGain: GainNode | null = null;
  private currentTrackOsc: OscillatorNode | null = null;
  private currentTrackGain: GainNode | null = null;
  private trackInterval: number | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.activeDroneGain) {
      this.activeDroneGain.gain.value = muted ? 0 : 0.05 * this.volume;
    }
    if (this.currentTrackGain) {
      this.currentTrackGain.gain.value = muted ? 0 : 0.15 * this.volume;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.activeDroneGain && !this.isMuted) {
      this.activeDroneGain.gain.value = 0.05 * this.volume;
    }
    if (this.currentTrackGain && !this.isMuted) {
      this.currentTrackGain.gain.value = 0.15 * this.volume;
    }
  }

  public playKeyClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.value = 1200;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Audio failure graceful fallback
    }
  }

  public playWindowOpen() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  public playWindowClose() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.1);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }

  public playDiskSeek() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 180 + Math.random() * 80;
        gain.gain.setValueAtTime(0.03 * this.volume, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.035);
      }
    } catch {}
  }

  public playClueDiscovered() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A Major arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12 * this.volume, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.36);
      });
    } catch {}
  }

  public playBootChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Majestic retro-futuristic chime: C major 9 chord with gentle decay
      const freqs = [130.81, 196.00, 261.63, 329.63, 392.00, 493.88];
      freqs.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = i < 2 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.07 * this.volume, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + 1.9);
      });
    } catch {}
  }

  public playErrorBeep() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);

      gain.gain.setValueAtTime(0.1 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  public startSubHarmonicDrone() {
    this.initCtx();
    if (!this.ctx || this.activeDroneOsc1) return;

    try {
      const now = this.ctx.currentTime;
      this.activeDroneOsc1 = this.ctx.createOscillator();
      this.activeDroneOsc2 = this.ctx.createOscillator();
      this.activeDroneGain = this.ctx.createGain();

      // Fundamental 62.5 Hz with 7.83 Hz beat frequency (Schumann Sub-Harmonic)
      this.activeDroneOsc1.type = 'sine';
      this.activeDroneOsc1.frequency.setValueAtTime(62.5, now);

      this.activeDroneOsc2.type = 'sine';
      this.activeDroneOsc2.frequency.setValueAtTime(62.5 + 7.83, now);

      this.activeDroneGain.gain.setValueAtTime(this.isMuted ? 0 : 0.03 * this.volume, now);

      this.activeDroneOsc1.connect(this.activeDroneGain);
      this.activeDroneOsc2.connect(this.activeDroneGain);
      this.activeDroneGain.connect(this.ctx.destination);

      this.activeDroneOsc1.start(now);
      this.activeDroneOsc2.start(now);
    } catch {}
  }

  public stopSubHarmonicDrone() {
    if (this.activeDroneOsc1) {
      try {
        this.activeDroneOsc1.stop();
        this.activeDroneOsc2?.stop();
        this.activeDroneOsc1.disconnect();
        this.activeDroneOsc2?.disconnect();
        this.activeDroneGain?.disconnect();
      } catch {}
      this.activeDroneOsc1 = null;
      this.activeDroneOsc2 = null;
      this.activeDroneGain = null;
    }
  }

  // Synthesize ambient track playback for AetherWave Media Player
  public playTrackPreset(preset: string, onVisualData?: (freqData: Uint8Array) => void) {
    this.stopTrack();
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const analyser = this.ctx.createAnalyser();
      analyser.fftSize = 64;

      let baseFreq = 220;
      let waveType: OscillatorType = 'sine';

      switch (preset) {
        case 'schumann_resonance':
          baseFreq = 146.83; // D3
          waveType = 'sine';
          break;
        case 'pulsar_drift':
          baseFreq = 329.63; // E4
          waveType = 'triangle';
          break;
        case 'aleutian_hydrophone':
          baseFreq = 98.00; // G2
          waveType = 'sawtooth';
          break;
        case 'vlf_broadcast':
          baseFreq = 440.00; // A4
          waveType = 'square';
          break;
        case 'tape_decay':
        default:
          baseFreq = 174.61; // F3
          waveType = 'triangle';
          break;
      }

      osc.type = waveType;
      osc.frequency.setValueAtTime(baseFreq, now);

      gain.gain.setValueAtTime(this.isMuted ? 0 : 0.12 * this.volume, now);

      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(this.ctx.destination);

      osc.start(now);
      this.currentTrackOsc = osc;
      this.currentTrackGain = gain;

      // Provide visualizer loop data
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const interval = window.setInterval(() => {
        if (!this.currentTrackOsc) {
          window.clearInterval(interval);
          return;
        }
        analyser.getByteFrequencyData(dataArray);
        if (onVisualData) {
          onVisualData(dataArray);
        }
      }, 50);

      this.trackInterval = interval;
    } catch {}
  }

  public stopTrack() {
    if (this.trackInterval) {
      clearInterval(this.trackInterval);
      this.trackInterval = null;
    }
    if (this.currentTrackOsc) {
      try {
        this.currentTrackOsc.stop();
        this.currentTrackOsc.disconnect();
        this.currentTrackGain?.disconnect();
      } catch {}
      this.currentTrackOsc = null;
      this.currentTrackGain = null;
    }
  }
}

export const sound = new SoundService();
