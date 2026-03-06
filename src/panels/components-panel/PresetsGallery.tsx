import React from 'react'
import { useCanvasStore } from '@store'
import { PRESETS } from '@presets'

const PresetsGallery: React.FC = () => {
  const addNode = useCanvasStore((state) => state.addNode)
  const deselectAll = useCanvasStore((state) => state.deselectAll)

  const handleLoadPreset = (presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (!preset) return

    deselectAll()
    preset.nodes.forEach((node) => {
      addNode(node)
    })
  }

  return (
    <div
      style={{
        padding: '12px',
        borderBottom: '1px solid #374151',
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
        Presets
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '6px',
        }}
      >
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleLoadPreset(preset.id)}
            style={{
              padding: '8px',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '4px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: '11px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#374151'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#4b5563'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1f2937'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#374151'
            }}
          >
            <div style={{ fontSize: '14px', marginBottom: '2px' }}>{preset.icon}</div>
            <div style={{ fontWeight: 'bold' }}>{preset.name}</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>{preset.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PresetsGallery
