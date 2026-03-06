import React from 'react'

export type TabId = 'canvas' | 'components' | 'properties' | 'code' | 'ai' | 'tools' | 'export'

interface Tab {
  id: TabId
  label: string
  icon: string
}

const TABS: Tab[] = [
  { id: 'canvas', label: 'Canvas', icon: '🎨' },
  { id: 'components', label: 'Components', icon: '🧩' },
  { id: 'properties', label: 'Properties', icon: '⚙️' },
  { id: 'code', label: 'Code', icon: '</>' },
  { id: 'ai', label: 'AI', icon: '✨' },
  { id: 'tools', label: 'Tools', icon: '🛠️' },
  { id: 'export', label: 'Export', icon: '💾' },
]

interface TabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  isMobile: boolean
}

export function TabBar({ activeTab, onTabChange, isMobile }: TabBarProps) {
  if (!isMobile) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#1f2937',
        borderTop: '1px solid #374151',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '8px',
        zIndex: 100,
        overflow: 'auto',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1,
            minWidth: '50px',
            height: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
            color: activeTab === tab.id ? '#ffffff' : '#9ca3af',
            border: 'none',
            cursor: 'pointer',
            fontSize: '10px',
            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
            borderRadius: '4px',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: '18px' }}>{tab.icon}</div>
          <div style={{ fontSize: '9px' }}>{tab.label}</div>
        </button>
      ))}
    </div>
  )
}
