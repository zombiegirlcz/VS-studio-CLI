import React, { useEffect, useRef, useState } from 'react'
import { Particle, ParticleEngineConfig, DEFAULT_CONFIG } from './ParticleConfig'
import { useGodModeStore } from '../effects/GodModeOverlay'

interface ParticleCanvasProps {
  config?: Partial<ParticleEngineConfig>
  interactive?: boolean
}

const ParticleEngine: React.FC<ParticleCanvasProps> = ({
  config = DEFAULT_CONFIG,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const fullConfig = { ...DEFAULT_CONFIG, ...config }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Initialize particles
    const particles: Particle[] = []
    for (let i = 0; i < fullConfig.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * fullConfig.maxSpeed,
        vy: (Math.random() - 0.5) * fullConfig.maxSpeed,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 360,
        polarity: Math.random() > 0.5 ? 1 : -1,
      })
    }
    particlesRef.current = particles

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current

      // Update particles
      const { isEnabled: godModeEnabled, attractorX, attractorY, power, isAttractor } =
        useGodModeStore()

      particles.forEach((p, idx) => {
        // Apply gravity
        p.vy += fullConfig.gravity

        // Apply friction
        p.vx *= fullConfig.friction
        p.vy *= fullConfig.friction

        // Apply God Mode (attractor/repulsor)
        if (godModeEnabled) {
          const dx = attractorX - p.x
          const dy = attractorY - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist > 1) {
            const force = (1 / (dist + 1)) * power * (isAttractor ? 1 : -1)
            const angle = Math.atan2(dy, dx)

            p.vx += Math.cos(angle) * force * 0.3
            p.vy += Math.sin(angle) * force * 0.3
          }
        }

        // Apply magnetic force between particles
        if (fullConfig.useMagnetism && fullConfig.magneticForce) {
          particles.forEach((p2, idx2) => {
            if (idx === idx2) return
            const dx = p2.x - p.x
            const dy = p2.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist > 5 && dist < fullConfig.connectionDistance) {
              // Same polarity = repulsion, opposite = attraction
              const isSame = p.polarity === p2.polarity
              const force = isSame ? -fullConfig.magneticForce : fullConfig.magneticForce
              const angle = Math.atan2(dy, dx)
              
              p.vx += Math.cos(angle) * force * 0.1
              p.vy += Math.sin(angle) * force * 0.1
            }
          })
        }

        // Mouse repulsion
        if (interactive) {
          const dx = p.x - mouseRef.current.x
          const dy = p.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < fullConfig.mouseInfluence) {
            const force = (fullConfig.mouseInfluence - dist) / fullConfig.mouseInfluence
            const angle = Math.atan2(dy, dx)
            p.vx += Math.cos(angle) * force * 0.5
            p.vy += Math.sin(angle) * force * 0.5
          }
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      // Draw particles
      particles.forEach((p) => {
        ctx.fillStyle = `hsla(${p.hue}, 80%, 50%, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < fullConfig.connectionDistance) {
            const opacity = (1 - dist / fullConfig.connectionDistance) * 0.3
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [fullConfig, interactive])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}

export default ParticleEngine
