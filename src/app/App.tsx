import React, { useRef, useState } from 'react'
import { useUIStore } from '@store'
import { CanvasEngine } from '@canvas/engine'
import { ComponentsPanel } from '@panels/components-panel'
import { PropertiesPanel } from '@panels/properties-panel'
import { CodePanel } from '@panels/code-panel'
import { PreviewPanel } from '@panels/preview-panel'
import { ParticleEngine } from '@creative/particles'
import { BloomOverlay, TrailOverlay, BackgroundTexture } from '@creative/effects'
import { playDropSound } from '@creative/audio'
import './index.css'

export default function App() {
  const zenMode = useUIStore((state) => state.zenMode)
  const toggleZenMode = useUIStore((state) => state.toggleZenMode)
  const showComponentsPanel = useUIStore((state) => state.showComponentsPanel)
  const showPropertiesPanel = useUIStore((state) => state.showPropertiesPanel)
  const showPreviewPanel = useUIStore((state) => state.showPreviewPanel)
  const showCodePanel = useUIStore((state) => state.showCodePanel)
  
  const [bloomTrigger, setBloomTrigger] = useState(false)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  const handleCanvasDrop = () => {
    playDropSound()
    setBloomTrigger(true)
    setTimeout(() => setBloomTrigger(false), 300)
  }

  if (zenMode) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#111827',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BackgroundTexture type="noise" intensity={0.02} />
        <ParticleEngine config={{ particleCount: 80 }} />
        <TrailOverlay active={true} />
        
        <div
          style={{
            flex: 1,
            display: 'flex',
            gap: '0px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ flex: 1 }} ref={canvasContainerRef} onDrop={handleCanvasDrop}>
            <CanvasEngine />
          </div>
        </div>
        
        <BloomOverlay trigger={bloomTrigger} color="#3b82f6" intensity={0.8} />
        
        <button
          onClick={toggleZenMode}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '8px 12px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            zIndex: 1000,
          }}
        >
          Exit Zen Mode (ESC)
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111827',
      }}
    >
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: '#1f2937',
          borderBottom: '1px solid #374151',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          🎨 TUI Builder — Phase 3 (Presets + Sound)
        </div>
        <button
          onClick={toggleZenMode}
          style={{
            padding: '6px 12px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Zen Mode (Z)
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: '0px',
          position: 'relative',
        }}
      >
        {showComponentsPanel && <ComponentsPanel />}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <BackgroundTexture type="noise" intensity={0.015} />
          <ParticleEngine config={{ particleCount: 60 }} />
          <TrailOverlay active={true} />
          
          <div 
            style={{ 
              flex: 1, 
              position: 'relative',
              zIndex: 10,
            }}
            ref={canvasContainerRef}
            onDrop={handleCanvasDrop}
          >
            <CanvasEngine />
          </div>

          <div
            style={{
              height: '200px',
              display: 'flex',
              borderTop: '1px solid #374151',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {showPreviewPanel && (
              <div style={{ flex: 1, borderRight: '1px solid #374151' }}>
                <PreviewPanel />
              </div>
            )}
            {showCodePanel && <div style={{ flex: 1 }}>
              <CodePanel />
            </div>}
          </div>
        </div>
        {showPropertiesPanel && <PropertiesPanel />}
      </div>

      <BloomOverlay trigger={bloomTrigger} color="#3b82f6" intensity={0.6} />
    </div>
  )
}
