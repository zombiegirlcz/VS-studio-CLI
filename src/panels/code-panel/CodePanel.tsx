import React, { useMemo } from 'react'
import { useCanvasStore } from '@store'
import { generateInkCode } from '@codegen'

const CodePanel: React.FC = () => {
  const nodes = useCanvasStore((state) => state.nodes)

  const code = useMemo(() => {
    return generateInkCode(Array.from(nodes.values()))
  }, [nodes])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    alert('Code copied to clipboard!')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'App.tsx'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#111827',
        borderLeft: '1px solid #374151',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '12px',
          borderBottom: '1px solid #374151',
          display: 'flex',
          gap: '8px',
        }}
      >
        <button
          onClick={handleCopy}
          style={{
            padding: '6px 12px',
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            color: '#e5e7eb',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Copy
        </button>
        <button
          onClick={handleDownload}
          style={{
            padding: '6px 12px',
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            color: '#e5e7eb',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Download
        </button>
      </div>

      <pre
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px',
          color: '#9ca3af',
          fontSize: '11px',
          margin: 0,
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {code}
      </pre>
    </div>
  )
}

export default CodePanel
