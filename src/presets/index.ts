import { TUINode } from '@types'

export interface Preset {
  id: string
  name: string
  description: string
  icon: string
  nodes: TUINode[]
}

export const dashboardPreset: Preset = {
  id: 'dashboard',
  name: 'Dashboard',
  description: 'Server monitoring dashboard layout',
  icon: '📊',
  nodes: [
    {
      id: 'dashboard-title',
      type: 'text',
      position: { x: 10, y: 10 },
      size: { width: 300, height: 40 },
      props: { content: '📊 Server Dashboard', bold: true },
    },
    {
      id: 'dashboard-status',
      type: 'box',
      position: { x: 10, y: 60 },
      size: { width: 150, height: 100 },
      props: { borderStyle: 'single', borderColor: 'green' },
    },
    {
      id: 'dashboard-stats',
      type: 'text',
      position: { x: 170, y: 60 },
      size: { width: 150, height: 100 },
      props: { content: 'CPU: 45%\nMem: 62%\nDisk: 78%' },
    },
  ],
}

export const chatUIPreset: Preset = {
  id: 'chat-ui',
  name: 'Chat UI',
  description: 'Messaging interface layout',
  icon: '💬',
  nodes: [
    {
      id: 'chat-header',
      type: 'text',
      position: { x: 10, y: 10 },
      size: { width: 300, height: 30 },
      props: { content: '💬 Chat Room', bold: true },
    },
    {
      id: 'chat-messages',
      type: 'box',
      position: { x: 10, y: 50 },
      size: { width: 300, height: 150 },
      props: { borderStyle: 'single', borderColor: 'blue' },
    },
    {
      id: 'chat-input',
      type: 'text',
      position: { x: 10, y: 210 },
      size: { width: 300, height: 30 },
      props: { content: '> Type message...' },
    },
  ],
}

export const loadingPreset: Preset = {
  id: 'loading-screen',
  name: 'Loading Screen',
  description: 'Progress indicator layout',
  icon: '⏳',
  nodes: [
    {
      id: 'loading-text',
      type: 'text',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 30 },
      props: { content: 'Loading...', bold: true },
    },
    {
      id: 'loading-spinner',
      type: 'spinner',
      position: { x: 100, y: 100 },
      size: { width: 100, height: 30 },
      props: { type: 'dots', color: 'cyan' },
    },
  ],
}

export const formPreset: Preset = {
  id: 'form-wizard',
  name: 'Form Wizard',
  description: 'Multi-step form layout',
  icon: '📝',
  nodes: [
    {
      id: 'form-title',
      type: 'text',
      position: { x: 10, y: 10 },
      size: { width: 300, height: 30 },
      props: { content: 'Setup Wizard - Step 1/3', bold: true },
    },
    {
      id: 'form-field-1',
      type: 'text',
      position: { x: 10, y: 50 },
      size: { width: 300, height: 30 },
      props: { content: 'Name: ___________' },
    },
    {
      id: 'form-field-2',
      type: 'text',
      position: { x: 10, y: 90 },
      size: { width: 300, height: 30 },
      props: { content: 'Email: __________' },
    },
  ],
}

export const supernovaPreset: Preset = {
  id: 'supernova-cli',
  name: 'Supernova CLI',
  description: 'Advanced CLI interface',
  icon: '⭐',
  nodes: [
    {
      id: 'supernova-header',
      type: 'gradient',
      position: { x: 0, y: 0 },
      size: { width: 400, height: 50 },
      props: { colors: ['#00ff00', '#0088ff'], direction: 'horizontal' },
    },
    {
      id: 'supernova-title',
      type: 'text',
      position: { x: 10, y: 10 },
      size: { width: 300, height: 30 },
      props: { content: '⭐ Supernova CLI v1.0', bold: true },
    },
    {
      id: 'supernova-content',
      type: 'box',
      position: { x: 10, y: 60 },
      size: { width: 380, height: 200 },
      props: { borderStyle: 'bold', borderColor: 'cyan' },
    },
  ],
}

export const PRESETS = [
  dashboardPreset,
  chatUIPreset,
  loadingPreset,
  formPreset,
  supernovaPreset,
]

export const loadPreset = (presetId: string): Preset | undefined => {
  return PRESETS.find((p) => p.id === presetId)
}

export const getPresetByName = (name: string): Preset | undefined => {
  return PRESETS.find((p) => p.name === name)
}
