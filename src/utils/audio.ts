// Player de Áudio Sexy & Lounge gerado nativamente via Web Audio API
// Sem precisar de arquivos pesados de mp3 ou conexão externa!

class SexyLoungeAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.28; // Padrão 28%
  private gainNode: GainNode | null = null;
  private timer: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Gera acordes suaves de piano elétrico / pad de sintetizador sensual (Neo-Soul / Lo-Fi lounge)
  private playSensualChord(freqs: number[], duration: number) {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const noteGain = this.ctx!.createGain();

      // Forma de onda suave (triangle / sine)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Envelope suave de ataque e decaimento lento (efeito aveludado)
      const now = this.ctx!.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.08, now + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Filtro passa-baixa para som aveludado e acolhedor
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);

      osc.connect(noteGain);
      noteGain.connect(filter);
      filter.connect(this.gainNode!);

      osc.start(now);
      osc.stop(now + duration + 0.5);
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
    this.initContext();
    this.isPlaying = true;

    // Progressão sensual clássica: Dm9 -> G13 -> Cmaj9 -> Am9
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
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioPlayer = new SexyLoungeAudioPlayer();
