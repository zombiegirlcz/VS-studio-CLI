import React, { useRef, useState, useEffect } from 'react'
import { useUIStore } from '@store'
import { useSwipe } from '@hooks/useSwipe'
import { TabBar, type TabId } from '@components/TabBar'
import { CanvasEngine } from '@canvas/engine'
import { ComponentsPanel } from '@panels/components-panel'
import { PropertiesPanel } from '@panels/properties-panel'
import { CodePanel } from '@panels/code-panel'
import { PreviewPanel } from '@panels/preview-panel'
import { AIPanel } from '@panels/ai-panel'
import BackgroundPanel from '@panels/settings-panel/BackgroundPanel'
import DrawingPanel from '@panels/tools-panel/DrawingPanel'
import { ParticleEngine } from '@creative/particles'
import { BloomOverlay, TrailOverlay, BackgroundTexture } from '@creative/effects'
import DynamicBackground from '@creative/effects/DynamicBackground'
import DrawingCanvas from '@creative/drawing/DrawingCanvas'
import { playDropSound } from '@creative/audio'
import GIFExport from '@panels/export-panel/GIFExport'
import AudioVisualizer from '@creative/audio/AudioVisualizer'
import ParticlePhysicsPanel from '@panels/physics-panel/ParticlePhysicsPanel'
import { useParticlePhysicsStore } from '@panels/physics-panel/ParticlePhysicsPanel'
import GodModeOverlay from '@creative/effects/GodModeOverlay'
import GodModePanel from '@panels/effects-panel/GodModePanel'

export default function App() {
  const zenMode = useUIStore((state) => state.zenMode)
  const toggleZenMode = useUIStore((state) => state.toggleZenMode)
  const showComponentsPanel = useUIStore((state) => state.showComponentsPanel)
  const showPropertiesPanel = useUIStore((state) => state.showPropertiesPanel)
  const showPreviewPanel = useUIStore((state) => state.showPreviewPanel)
  const showCodePanel = useUIStore((state) => state.showCodePanel)
  
  const useMagnetism = useParticlePhysicsStore((state) => state.useMagnetism)
  const magneticForce = useParticlePhysicsStore((state) => state.magneticForce)
  
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  const [activeTab, setActiveTab] = useState<TabId>('canvas')
  const [bloomTrigger, setBloomTrigger] = useState(false)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        <ParticleEngine config={{ particleCount: 80, useMagnetism, magneticForce }} />
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

  // MOBILE LAYOUT
  if (isMobile) {
    const tabs: TabId[] = ['canvas', 'components', 'properties', 'code', 'ai', 'tools', 'export']
    const currentTabIndex = tabs.indexOf(activeTab)

    useSwipe(
      () => {
        // Swipe left = next tab
        if (currentTabIndex < tabs.length - 1) {
          setActiveTab(tabs[currentTabIndex + 1])
        }
      },
      () => {
        // Swipe right = previous tab
        if (currentTabIndex > 0) {
          setActiveTab(tabs[currentTabIndex - 1])
        }
      }
    )

    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#111827', position: 'relative', overflow: 'hidden' }}>
        <DynamicBackground />
        <div style={{ padding: '8px 12px', backgroundColor: '#1f2937', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ fontWeight: 'bold' }}>🎨 TUI Builder</div>
          <button onClick={toggleZenMode} style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Zen (Z)</button>
        </div>
        <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', paddingBottom: '60px' }}>
          {activeTab === 'canvas' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <BackgroundTexture type="noise" intensity={0.015} />
              <ParticleEngine config={{ particleCount: 60, useMagnetism, magneticForce }} />
              <TrailOverlay active={true} />
              <DrawingCanvas containerRef={canvasContainerRef} />
              <GodModeOverlay />
              <div style={{ flex: 1, position: 'relative', zIndex: 10 }} ref={canvasContainerRef} onDrop={handleCanvasDrop}>
                <CanvasEngine />
              </div>
            </div>
          )}
          {activeTab === 'components' && <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}><ComponentsPanel /></div>}
          {activeTab === 'properties' && <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}><PropertiesPanel /></div>}
          {activeTab === 'code' && (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {showPreviewPanel && <div style={{ flex: 1, borderBottom: '1px solid #374151', overflow: 'auto' }}><PreviewPanel /></div>}
              {showCodePanel && <div style={{ flex: 1, overflow: 'auto' }}><CodePanel /></div>}
            </div>
          )}
          {activeTab === 'ai' && <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}><AIPanel /></div>}
          {activeTab === 'tools' && (
            <div style={{ flex: 1, overflow: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderBottom: '1px solid #374151', padding: '12px' }}><h3 style={{ margin: '0 0 8px 0', fontSize: '12px' }}>🎨 Drawing</h3><DrawingPanel /></div>
              <div style={{ borderBottom: '1px solid #374151', padding: '12px' }}><h3 style={{ margin: '0 0 8px 0', fontSize: '12px' }}>👑 God Mode</h3><GodModePanel /></div>
              <div style={{ borderBottom: '1px solid #374151', padding: '12px' }}><h3 style={{ margin: '0 0 8px 0', fontSize: '12px' }}>⚛️ Particles</h3><ParticlePhysicsPanel /></div>
              <div style={{ borderBottom: '1px solid #374151', padding: '12px' }}><h3 style={{ margin: '0 0 8px 0', fontSize: '12px' }}>🔊 Audio</h3><AudioVisualizer /></div>
              <div style={{ padding: '12px' }}><h3 style={{ margin: '0 0 8px 0', fontSize: '12px' }}>🎨 Background</h3><BackgroundPanel /></div>
            </div>
          )}
          {activeTab === 'export' && <div style={{ flex: 1, overflow: 'auto', position: 'relative', padding: '16px' }}><GIFExport /></div>}
        </div>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} isMobile={true} />
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
        position: 'relative',
      }}
    >
      <DynamicBackground />
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
          <ParticleEngine config={{ particleCount: 60, useMagnetism, magneticForce }} />
          <TrailOverlay active={true} />
          <DrawingCanvas containerRef={canvasContainerRef} />
          <GodModeOverlay />
          
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
        <div style={{ display: 'flex' }}>
          {showPropertiesPanel && <PropertiesPanel />}
          <AIPanel />
          <div style={{ width: '280px', borderLeft: '1px solid #374151', overflow: 'auto' }}>
            <DrawingPanel />
            <div style={{ borderTop: '1px solid #374151' }}>
              <GodModePanel />
            </div>
            <div style={{ borderTop: '1px solid #374151' }}>
              <ParticlePhysicsPanel />
            </div>
            <div style={{ borderTop: '1px solid #374151' }}>
              <AudioVisualizer />
            </div>
            <div style={{ borderTop: '1px solid #374151' }}>
              <GIFExport />
            </div>
            <div style={{ borderTop: '1px solid #374151' }}>
              <BackgroundPanel />
            </div>
          </div>
        </div>
      </div>

      <BloomOverlay trigger={bloomTrigger} color="#3b82f6" intensity={0.6} />
    </div>
  )
}
