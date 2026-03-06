import React, { useEffect, useRef, useState } from 'react'
import { create } from 'zustand'

interface DynamicBgStore {
  type: 'digital-noise' | 'paper-texture' | 'flowing-waves'
  intensity: number
  speed: number
  setType: (type: 'digital-noise' | 'paper-texture' | 'flowing-waves') => void
  setIntensity: (intensity: number) => void
  setSpeed: (speed: number) => void
}

export const useDynamicBgStore = create<DynamicBgStore>((set) => ({
  type: 'digital-noise',
  intensity: 0.05,
  speed: 1,
  setType: (type) => set({ type }),
  setIntensity: (intensity) => set({ intensity }),
  setSpeed: (speed) => set({ speed }),
}))

interface DynamicBackgroundProps {
  className?: string
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const { type, intensity, speed } = useDynamicBgStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth || 1280
    canvas.height = canvas.offsetHeight || 720

    const animate = () => {
      timeRef.current += speed * 0.016

      if (type === 'digital-noise') {
        // Animated digital noise with perlin-like effect
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          // Simple value noise using sine
          const x = (i % (canvas.width * 4)) / 4
          const y = Math.floor(i / (canvas.width * 4))
          const noise =
            Math.sin((x * 0.01 + timeRef.current * 0.1) * Math.PI) *
              Math.sin((y * 0.01 + timeRef.current * 0.05) * Math.PI) *
              127.5 +
            127.5
          const grain = Math.random() * 50

          data[i] = (noise + grain) / 2
          data[i + 1] = (noise + grain) / 2
          data[i + 2] = (noise + grain) / 2
          data[i + 3] = Math.min(intensity * 255, 100)
        }

        ctx.putImageData(imageData, 0, 0)
      } else if (type === 'paper-texture') {
        // Animated paper with subtle movement
        ctx.fillStyle = '#111827'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.08})`
        for (let i = 0; i < 500; i++) {
          const x =
            (Math.random() * canvas.width + timeRef.current * speed * 5) %
            canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 2 + 0.5
          ctx.fillRect(x, y, size, size)
        }
      } else if (type === 'flowing-waves') {
        // Flowing wave effect
        ctx.fillStyle = '#111827'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = `rgba(99, 102, 241, ${intensity * 0.3})`
        ctx.lineWidth = 1

        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          for (let x = 0; x < canvas.width; x += 10) {
            const y =
              canvas.height / 2 +
              Math.sin((x * 0.01 + timeRef.current * 0.05 + i) * Math.PI) *
                50 +
              Math.cos((x * 0.005 + timeRef.current * 0.08 + i) * Math.PI) * 30
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [type, intensity, speed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default DynamicBackground
