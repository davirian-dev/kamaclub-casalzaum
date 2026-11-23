// Player de Música Sexy Lounge
// Combina arquivo de áudio real (MP3 de alta qualidade) com fallback sintetizado via Web Audio API

class SexyLoungeAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.5; // 50%
  private gainNode: GainNode | null = null;
  private timer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioElement = new Audio('/audio/sexy-lounge.mp3');
        this.audioElement.loop = true;
        this.audioElement.volume = this.volume;
        this.audioElement.preload = 'auto';
      } catch (e) {
        console.warn('Audio element error:', e);
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Fallback: síntese de acordes de sintetizador aveludado caso o áudio falhe
  private playSensualChord(freqs: number[], duration: number) {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    freqs.forEach((freq) => {
      try {
        const osc = this.ctx!.createOscillator();
        const noteGain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        const now = this.ctx!.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.2, now + 0.8);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        osc.connect(noteGain);
        noteGain.connect(filter);
        filter.connect(this.gainNode!);

        osc.start(now);
        osc.stop(now + duration + 0.5);
      } catch {
        // Ignora erros de oscilador
      }
    });
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.isPlaying = true;

    // Tentativa 1: Reproduzir arquivo MP3 nativo
    if (this.audioElement) {
      this.audioElement.currentTime = 0;
      this.audioElement.volume = this.volume;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Reprodução iniciada com sucesso
          })
          .catch((err) => {
            console.warn('Erro ao tocar MP3, acionando fallback sintetizado:', err);
            this.startSynthesizer();
          });
        return;
      }
    }

    // Fallback sintetizado
    this.startSynthesizer();
  }

  private startSynthesizer() {
    this.initContext();
    const progressions = [
      [146.83, 220.00, 261.63, 329.63, 349.23], // Dm9
      [196.00, 246.94, 329.63, 392.00],         // G13
      [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj9
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am9
    ];

    let step = 0;
    const loop = () => {
      if (!this.isPlaying) return;
      this.playSensualChord(progressions[step % progressions.length], 4.5);
      step++;
      this.timer = window.setTimeout(loop, 4000);
    };

    loop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioPlayer = new SexyLoungeAudioPlayer();
