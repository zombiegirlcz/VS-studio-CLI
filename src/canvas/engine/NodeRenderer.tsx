import React from 'react'
import { TUINode } from '@types'

interface NodeRendererProps {
  node: TUINode
  isSelected: boolean
  onSelect: (nodeId: string, multiSelect?: boolean) => void
  onMove?: (nodeId: string, position: { x: number; y: number }) => void
  onResize?: (nodeId: string, width: number, height: number) => void
}

const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  isSelected,
  onSelect,
  onMove,
  onResize,
}) => {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: node.position.x,
    top: node.position.y,
    width: node.size.width,
    height: node.size.height,
    cursor: 'move',
    border: isSelected ? '2px solid #3b82f6' : '1px solid #6b7280',
    backgroundColor: 'rgba(31, 41, 55, 0.7)',
    padding: '8px',
    borderRadius: '4px',
    overflow: 'hidden',
    userSelect: 'none',
  }

  const contentStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#e5e7eb',
    fontFamily: 'monospace',
  }

  const renderContent = () => {
    switch (node.type) {
      case 'box':
        return <div style={contentStyle}>Box</div>
      case 'text':
        return (
          <div style={contentStyle}>
            {node.props.content || 'Text'}
          </div>
        )
      case 'spinner':
        return <div style={contentStyle}>⠙ Spinner</div>
      case 'gradient':
        return <div style={contentStyle}>🌈 Gradient</div>
      default:
        return <div style={contentStyle}>{node.type}</div>
    }
  }

  return (
    <div
      style={baseStyle}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(node.id, e.metaKey || e.ctrlKey)
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        const startX = e.clientX
        const startY = e.clientY
        const startPosX = node.position.x
        const startPosY = node.position.y

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - startX
          const deltaY = moveEvent.clientY - startY
          onMove?.(node.id, { x: startPosX + deltaX, y: startPosY + deltaY })
        }

        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }}
    >
      {renderContent()}
    </div>
  )
}

export default NodeRenderer
