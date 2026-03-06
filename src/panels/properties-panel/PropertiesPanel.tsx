import React from 'react'
import { useCanvasStore } from '@store'
import { TUINode } from '@types'

const PropertiesPanel: React.FC = () => {
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds)
  const getNode = useCanvasStore((state) => state.getNode)
  const updateNode = useCanvasStore((state) => state.updateNode)

  const selectedNodeId = Array.from(selectedNodeIds)[0]
  const selectedNode = selectedNodeId ? getNode(selectedNodeId) : undefined

  const handlePropChange = (key: string, value: any) => {
    if (!selectedNode) return
    const newProps = { ...selectedNode.props, [key]: value }
    updateNode(selectedNode.id, { props: newProps })
  }

  return (
    <div
      style={{
        width: '250px',
        height: '100%',
        backgroundColor: '#111827',
        borderLeft: '1px solid #374151',
        overflowY: 'auto',
        padding: '12px',
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
        Properties
      </div>

      {selectedNode ? (
        <div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
              Node ID
            </div>
            <input
              type="text"
              value={selectedNode.id}
              disabled
              style={{
                width: '100%',
                padding: '6px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                color: '#e5e7eb',
                borderRadius: '4px',
                fontSize: '11px',
              }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
              Type: {selectedNode.type}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
              Position: ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
              Size: {Math.round(selectedNode.size.width)} x {Math.round(selectedNode.size.height)}
            </div>
          </div>

          {selectedNode.type === 'text' && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
                Content
              </div>
              <textarea
                value={selectedNode.props.content || ''}
                onChange={(e) => handlePropChange('content', e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px',
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  color: '#e5e7eb',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  minHeight: '60px',
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div style={{ color: '#6b7280', fontSize: '12px' }}>
          Select a node to edit properties
        </div>
      )}
    </div>
  )
}

export default PropertiesPanel
