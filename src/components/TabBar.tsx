import React from 'react'

export type TabId = 'canvas' | 'components' | 'properties' | 'code' | 'ai' | 'tools' | 'export'

interface Tab {
  id: TabId
  label: string
  icon: string
}

const TABS: Tab[] = [
  { id: 'canvas', label: 'Canvas', icon: '🎨' },
  { id: 'components', label: 'Comps', icon: '🧩' },
  { id: 'properties', label: 'Props', icon: '⚙️' },
  { id: 'code', label: 'Code', icon: '💻' },
  { id: 'ai', label: 'AI', icon: '✨' },
  { id: 'tools', label: 'Tools', icon: '🛠️' },
  { id: 'export', label: 'Export', icon: '📤' },
]

interface TabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  isMobile: boolean
}

export function TabBar({ activeTab, onTabChange, isMobile }: TabBarProps) {
  if (!isMobile) return null

  const currentIndex = TABS.findIndex(t => t.id === activeTab)

  const handleSwipeLeft = () => {
    if (currentIndex < TABS.length - 1) {
      onTabChange(TABS[currentIndex + 1].id)
    }
  }

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      onTabChange(TABS[currentIndex - 1].id)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#1f2937',
        borderTop: '2px solid #3b82f6',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '2px',
        zIndex: 100,
        overflow: 'auto',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {TABS.map((tab, idx) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1,
            minWidth: '45px',
            height: '56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
            color: activeTab === tab.id ? '#ffffff' : '#9ca3af',
            border: activeTab === tab.id ? '2px solid #60a5fa' : 'none',
            cursor: 'pointer',
            fontSize: '10px',
            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
            borderRadius: '4px',
            transition: 'all 0.2s',
            padding: '4px 0',
          }}
        >
          <div style={{ fontSize: '20px', lineHeight: '1' }}>{tab.icon}</div>
          <div style={{ fontSize: '8px', lineHeight: '1' }}>{tab.label}</div>
        </button>
      ))}
    </div>
  )
}
