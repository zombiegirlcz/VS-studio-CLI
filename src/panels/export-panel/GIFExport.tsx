import React, { useRef, useState } from 'react'
import { useCanvasStore } from '@store'
import GIF from 'gif.js'

const GIFExport: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodes = useCanvasStore((state) => state.nodes)

  const handleExportGIF = async () => {
    if (!canvasRef.current) return

    setIsExporting(true)
    setProgress(0)

    try {
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: 800,
        height: 600,
        workerScript: 'https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js',
      })

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('No 2D context')

      canvas.width = 800
      canvas.height = 600

      // Draw frames with animation
      for (let frame = 0; frame < 30; frame++) {
        ctx.fillStyle = '#111827'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw nodes with animation
        nodes.forEach((node, idx) => {
          const offsetY = Math.sin((frame + idx) * 0.2) * 10
          ctx.fillStyle = '#3b82f6'
          ctx.fillRect(node.x + 20, node.y + 20 + offsetY, node.width, node.height)

          ctx.fillStyle = '#e5e7eb'
          ctx.font = '12px sans-serif'
          ctx.fillText(node.type, node.x + 25, node.y + 40 + offsetY)
        })

        gif.addFrame(canvas, { delay: 100 })
        setProgress(Math.round((frame / 30) * 100))
      }

      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `canvas-${Date.now()}.gif`
        a.click()
        URL.revokeObjectURL(url)

        setIsExporting(false)
        setProgress(0)
      })

      gif.render()
    } catch (error) {
      console.error('GIF export error:', error)
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-3 p-4 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200">Export as GIF</h3>

      <button
        onClick={handleExportGIF}
        disabled={isExporting}
        className={`w-full px-3 py-2 rounded font-semibold text-xs transition ${
          isExporting
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {isExporting ? `Exporting... ${progress}%` : '⬇️ Export GIF'}
      </button>

      {isExporting && (
        <div className="w-full bg-gray-900 rounded overflow-hidden h-2">
          <div
            className="bg-green-500 h-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />

      <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
        Exports current canvas nodes as animated GIF with 30 frames.
      </div>
    </div>
  )
}

export default GIFExport
