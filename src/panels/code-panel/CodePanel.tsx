import React, { useMemo } from 'react'
import { useCanvasStore } from '@store'
import { generateInkCode } from '@codegen'
import QRExport from './QRExport'
import JSONExport from './JSONExport'
import { activateExplainMode } from '@ai/explainMode'

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
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          padding: '12px',
          borderBottom: '1px solid #374151',
          display: 'flex',
          gap: '8px',
          position: 'sticky',
          top: 0,
          backgroundColor: '#111827',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleCopy}
          style={{
            flex: 1,
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
            flex: 1,
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
        <button
          onClick={activateExplainMode}
          style={{
            flex: 1,
            padding: '6px 12px',
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            color: '#e5e7eb',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Explain
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <pre
          style={{
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

      <div style={{ borderTop: '1px solid #374151', backgroundColor: '#1f2937', display: 'flex', gap: '4px', padding: '8px' }}>
        <div style={{ flex: 1 }}>
          <QRExport />
        </div>
        <div style={{ flex: 1 }}>
          <JSONExport />
        </div>
      </div>
    </div>
  )
}

export default CodePanel
