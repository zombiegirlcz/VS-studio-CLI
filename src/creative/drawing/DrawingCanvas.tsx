import React, { useEffect, useRef } from 'react'
import { useDrawingStore } from './DrawingStore'
import { useCanvasStore } from '@store'

interface DrawingCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const lastX = useRef(0)
  const lastY = useRef(0)

  const { isEnabled, color, thickness, disable } = useDrawingStore()
  const { addNode } = useCanvasStore()

  useEffect(() => {
    if (!isEnabled || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth || window.innerWidth
    canvas.height = canvas.offsetHeight || window.innerHeight

    const handleMouseDown = (e: MouseEvent) => {
      if (!isEnabled) return
      isDrawing.current = true
      const rect = canvas.getBoundingClientRect()
      lastX.current = e.clientX - rect.left
      lastY.current = e.clientY - rect.top
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current || !isEnabled || !ctx) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ctx.strokeStyle = color
      ctx.lineWidth = thickness
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      ctx.moveTo(lastX.current, lastY.current)
      ctx.lineTo(x, y)
      ctx.stroke()

      lastX.current = x
      lastY.current = y
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDrawing.current) return
      isDrawing.current = false

      // Generate text component from drawing
      const rect = canvas.getBoundingClientRect()
      const x = Math.min(lastX.current, e.clientX - rect.left)
      const y = Math.min(lastY.current, e.clientY - rect.top)

      const drawingWidth = Math.abs(e.clientX - rect.left - lastX.current)
      const drawingHeight = Math.abs(e.clientY - rect.top - lastY.current)

      if (drawingWidth > 20 && drawingHeight > 20) {
        addNode({
          id: 'text-' + Date.now(),
          type: 'Text',
          x: x / 10,
          y: y / 10,
          width: Math.max(30, drawingWidth / 10),
          height: 20,
          props: {
            text: 'Drawn element',
            color: color,
          },
          children: [],
        })
      }
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', () => {
      isDrawing.current = false
    })

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isEnabled, color, thickness, addNode])

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
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          cursor: 'crosshair',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          padding: '10px',
          borderRadius: '6px',
          zIndex: 1001,
          fontSize: '12px',
          color: '#e5e7eb',
          border: '1px solid #374151',
        }}
      >
        <div style={{ marginBottom: '8px' }}>Drawing Mode (Esc to exit)</div>
        <button
          onClick={() => disable()}
          style={{
            width: '100%',
            padding: '6px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Exit Drawing
        </button>
      </div>
    </>
  )
}

export default DrawingCanvas
