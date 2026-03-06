import React from 'react'
import ComponentCard from './ComponentCard'
import PresetsGallery from './PresetsGallery'

const ComponentsPanel: React.FC = () => {
  const components = [
    { type: 'box', icon: '📦', label: 'Box' },
    { type: 'text', icon: '📝', label: 'Text' },
    { type: 'spinner', icon: '⏳', label: 'Spinner' },
    { type: 'gradient', icon: '🌈', label: 'Gradient' },
  ]

  return (
    <div
      style={{
        width: '200px',
        height: '100%',
        backgroundColor: '#111827',
        borderRight: '1px solid #374151',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          Components
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4px',
          }}
        >
          {components.map((comp) => (
            <ComponentCard
              key={comp.type}
              type={comp.type}
              icon={comp.icon}
              label={comp.label}
            />
          ))}
        </div>
      </div>

      <PresetsGallery />
    </div>
  )
}

export default ComponentsPanel
