import React from 'react'
import { useCanvasStore } from '@store'

const JSONExport: React.FC = () => {
  const nodes = useCanvasStore((state) => state.nodes)

  const handleExportJSON = () => {
    const json = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: { x: node.x, y: node.y },
        size: { width: node.width, height: node.height },
        props: node.props,
        children: node.children,
      })),
    }

    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `canvas-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExportJSON}
      className="w-full px-3 py-2 bg-cyan-600 text-white rounded text-xs font-semibold hover:bg-cyan-700 transition"
    >
      📋 Export as JSON
    </button>
  )
}

export default JSONExport
