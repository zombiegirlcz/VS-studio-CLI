import React, { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  opacity: number
  size: number
}

interface TrailOverlayProps {
  active?: boolean
  color?: string
}

const TrailOverlay: React.FC<TrailOverlayProps> = ({ active = true, color = '#60a5fa' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailsRef = useRef<Map<string, TrailPoint[]>>(new Map())
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const trailId = `trail-${Date.now() % 1000}`
      const trails = trailsRef.current
      if (!trails.has(trailId)) {
        trails.set(trailId, [])
      }

      const trail = trails.get(trailId)!
      trail.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 0.8,
        size: 4,
      })

      // Keep trail limited
      if (trail.length > 20) {
        trail.shift()
      }

      // Clean old trails
      if (trails.size > 5) {
        const firstKey = trails.keys().next().value
        trails.delete(firstKey)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const trails = trailsRef.current
      trails.forEach((trail) => {
        trail.forEach((point, index) => {
          point.opacity -= 0.05
          point.size *= 0.95

          ctx.fillStyle = `${color.replace(')', `, ${point.opacity})`).replace('rgb', 'rgba')}`
          ctx.beginPath()
          ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
          ctx.fill()
        })

        // Remove dead points
        for (let i = trail.length - 1; i >= 0; i--) {
          if (trail[i].opacity <= 0) {
            trail.splice(i, 1)
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active, color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
}

export default TrailOverlay
