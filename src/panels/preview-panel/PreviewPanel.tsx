import React from 'react'
import TerminalEmulator from '@/preview/TerminalEmulator'

const PreviewPanel: React.FC = () => {
  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#111827',
        borderRight: '1px solid #374151',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: 'bold', padding: '12px', borderBottom: '1px solid #374151' }}>
        Terminal Preview
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <TerminalEmulator />
      </div>
    </div>
  )
}

export default PreviewPanel
