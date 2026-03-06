import React, { useRef, useEffect, useState } from 'react'
import { create } from 'zustand'

interface GodModeStore {
  isEnabled: boolean
  attractorX: number
  attractorY: number
  power: number
  isAttractor: boolean
  enable: () => void
  disable: () => void
  setAttractor: (x: number, y: number) => void
  setPower: (power: number) => void
  toggleMode: () => void
}

export const useGodModeStore = create<GodModeStore>((set) => ({
  isEnabled: false,
  attractorX: 0,
  attractorY: 0,
  power: 1,
  isAttractor: true,
  enable: () => set({ isEnabled: true }),
  disable: () => set({ isEnabled: false }),
  setAttractor: (x, y) => set({ attractorX: x, attractorY: y }),
  setPower: (power) => set({ power }),
  toggleMode: () => set((state) => ({ isAttractor: !state.isAttractor })),
}))

const GodModeOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isEnabled, attractorX, attractorY, power, isAttractor, disable } =
    useGodModeStore()
  const { setAttractor } = useGodModeStore()

  useEffect(() => {
    if (!isEnabled || !canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setAttractor(e.clientX - rect.left, e.clientY - rect.top)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isEnabled, setAttractor])

  if (!isEnabled) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 999,
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          cursor: isAttractor ? 'grab' : 'crosshair',
        }}
      />
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 999,
        }}
      >
        <circle
          cx={attractorX}
          cy={attractorY}
          r={30 * power}
          fill="none"
          stroke={isAttractor ? '#10b981' : '#ef4444'}
          strokeWidth="2"
          opacity="0.5"
        />
        <circle
          cx={attractorX}
          cy={attractorY}
          r={50 * power}
          fill="none"
          stroke={isAttractor ? '#10b981' : '#ef4444'}
          strokeWidth="1"
          opacity="0.3"
          strokeDasharray="5,5"
        />
        <circle
          cx={attractorX}
          cy={attractorY}
          r="5"
          fill={isAttractor ? '#10b981' : '#ef4444'}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          padding: '10px',
          borderRadius: '6px',
          zIndex: 1001,
          fontSize: '12px',
          color: '#e5e7eb',
          border: '1px solid #374151',
        }}
      >
        <div style={{ marginBottom: '8px' }}>
          God Mode: {isAttractor ? 'Attractor' : 'Repulsor'}
        </div>
        <button
          onClick={() => useGodModeStore.setState((state) => ({ isAttractor: !state.isAttractor }))}
          style={{
            width: '100%',
            padding: '6px',
            backgroundColor: isAttractor ? '#10b981' : '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px',
            marginBottom: '8px',
          }}
        >
          {isAttractor ? 'Switch to Repulsor' : 'Switch to Attractor'}
        </button>
        <button
          onClick={() => disable()}
          style={{
            width: '100%',
            padding: '6px',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Exit God Mode
        </button>
      </div>
    </>
  )
}

export default GodModeOverlay
