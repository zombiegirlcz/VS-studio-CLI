import React, { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { useCanvasStore } from '@store'
import { generateInkCode } from '@codegen'

const QRExport: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodes = useCanvasStore((state) => state.nodes)

  useEffect(() => {
    if (!canvasRef.current) return

    const code = generateInkCode(Array.from(nodes.values()))
    const encodedCode = encodeURIComponent(code)
    const qrData = `https://tui-builder.vercel.app/import?code=${encodedCode}`

    QRCode.toCanvas(canvasRef.current, qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#e5e7eb',
        light: '#111827',
      },
    }).catch((err) => {
      console.error('QR generation error:', err)
    })
  }, [nodes])

  const handleDownloadQR = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.href = canvasRef.current.toDataURL()
    link.download = 'tui-qr.png'
    link.click()
  }

  return (
    <div style={{ padding: '12px', textAlign: 'center' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
        QR Code Export
      </div>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #374151',
          borderRadius: '4px',
          marginBottom: '8px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <button
        onClick={handleDownloadQR}
        style={{
          width: '100%',
          padding: '6px',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '11px',
        }}
      >
        Download QR
      </button>
      <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '8px' }}>
        Scan to share design
      </div>
    </div>
  )
}

export default QRExport
