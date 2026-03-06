import React, { useEffect, useRef } from 'react'

interface BackgroundTextureProps {
  type?: 'noise' | 'grain' | 'paper'
  intensity?: number
}

const BackgroundTexture: React.FC<BackgroundTextureProps> = ({
  type = 'noise',
  intensity = 0.03,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate noise
    if (type === 'noise' || type === 'grain') {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255
        data[i] = noise // R
        data[i + 1] = noise // G
        data[i + 2] = noise // B
        data[i + 3] = intensity * 255 // A
      }

      ctx.putImageData(imageData, 0, 0)
    } else if (type === 'paper') {
      // Simple paper texture
      ctx.fillStyle = '#111827'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.1})`
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 3
        ctx.fillRect(x, y, size, size)
      }
    }
  }, [type, intensity])

  return (
    <canvas
      ref={canvasRef}
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

export default BackgroundTexture
