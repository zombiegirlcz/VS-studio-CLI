import React, { useCallback } from 'react'
import { useCanvasStore, useUIStore } from '@store'
import NodeRenderer from './NodeRenderer'

const CanvasEngine: React.FC = () => {
  const nodes = useCanvasStore((state) => state.nodes)
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds)
  const addNode = useCanvasStore((state) => state.addNode)
  const selectNode = useCanvasStore((state) => state.selectNode)
  const moveNode = useCanvasStore((state) => state.moveNode)
  const deselectAll = useCanvasStore((state) => state.deselectAll)
  const zenMode = useUIStore((state) => state.zenMode)

  const handleCanvasClick = useCallback(() => {
    deselectAll()
  }, [deselectAll])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const nodeType = e.dataTransfer.getData('nodeType') as any
      if (!nodeType) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newNode = {
        id: `node-${Date.now()}`,
        type: nodeType,
        position: { x, y },
        size: { width: 150, height: 60 },
        props: {},
      }

      addNode(newNode)
    },
    [addNode]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#111827',
    border: '1px solid #374151',
    overflow: 'hidden',
  }

  return (
    <div
      style={containerStyle}
      onClick={handleCanvasClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {Array.from(nodes.values()).map((node) => (
        <NodeRenderer
          key={node.id}
          node={node}
          isSelected={selectedNodeIds.has(node.id)}
          onSelect={selectNode}
          onMove={moveNode}
        />
      ))}
      
      {nodes.size === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#6b7280',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: '14px' }}>Drag components here</div>
          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.7 }}>
            or use the components panel
          </div>
        </div>
      )}
    </div>
  )
}

export default CanvasEngine
