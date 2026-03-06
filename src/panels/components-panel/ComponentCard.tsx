import React from 'react'

interface ComponentCardProps {
  type: string
  icon: string
  label: string
}

const ComponentCard: React.FC<ComponentCardProps> = ({ type, icon, label }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('nodeType', type)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        padding: '12px',
        margin: '4px',
        backgroundColor: '#1f2937',
        border: '1px solid #374151',
        borderRadius: '4px',
        cursor: 'grab',
        transition: 'all 0.2s',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.backgroundColor = '#374151'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#4b5563'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.backgroundColor = '#1f2937'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#374151'
      }}
    >
      <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{label}</div>
    </div>
  )
}

export default ComponentCard
