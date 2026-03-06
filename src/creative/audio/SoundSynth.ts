// Simple procedural sound synthesis
export class SoundSynth {
  private audioContext: AudioContext

  constructor() {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    this.audioContext = new AC()
  }

  playCollisionSound(frequency: number = 400, duration: number = 0.1) {
    const ctx = this.audioContext
    const now = ctx.currentTime

    // Create oscillator
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.value = frequency
    osc.type = 'sine'

    // Envelope
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration)

    osc.start(now)
    osc.stop(now + duration)
  }

  playDropSound() {
    this.playCollisionSound(600, 0.15)
    setTimeout(() => this.playCollisionSound(400, 0.1), 50)
  }

  playSuccessSound() {
    this.playCollisionSound(700, 0.1)
    setTimeout(() => this.playCollisionSound(1000, 0.15), 75)
  }

  playErrorSound() {
    this.playCollisionSound(200, 0.2)
  }
}

let synthInstance: SoundSynth | null = null

export const getSoundSynth = (): SoundSynth => {
  if (!synthInstance) {
    synthInstance = new SoundSynth()
  }
  return synthInstance
}

export const playDropSound = () => {
  try {
    getSoundSynth().playDropSound()
  } catch (e) {
    // AudioContext not available
  }
}

export const playSuccessSound = () => {
  try {
    getSoundSynth().playSuccessSound()
  } catch (e) {
    // AudioContext not available
  }
}
