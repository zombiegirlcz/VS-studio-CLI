export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  polarity?: 1 | -1  // +1 or -1 for magnetism
}

export interface ParticleEngineConfig {
  particleCount: number
  maxSpeed: number
  connectionDistance: number
  friction: number
  gravity: number
  mouseInfluence: number
  magneticForce?: number
  useMagnetism?: boolean
}

export const DEFAULT_CONFIG: ParticleEngineConfig = {
  particleCount: 50,
  maxSpeed: 2,
  connectionDistance: 150,
  friction: 0.98,
  gravity: 0.1,
  mouseInfluence: 100,
  magneticForce: 0.5,
  useMagnetism: false,
}
