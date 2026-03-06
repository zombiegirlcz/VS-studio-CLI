import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIStore {
  zenMode: boolean
  toggleZenMode: () => void
  showComponentsPanel: boolean
  showPropertiesPanel: boolean
  showPreviewPanel: boolean
  showCodePanel: boolean
  togglePanel: (panel: 'components' | 'properties' | 'preview' | 'code') => void
}

export const useUIStore = create<UIStore>()(
  devtools((set) => ({
    zenMode: false,
    showComponentsPanel: true,
    showPropertiesPanel: true,
    showPreviewPanel: true,
    showCodePanel: true,

    toggleZenMode: () => {
      set((state) => {
        if (state.zenMode) {
          // Exit zen mode
          return {
            zenMode: false,
            showComponentsPanel: true,
            showPropertiesPanel: true,
            showPreviewPanel: true,
            showCodePanel: true,
          }
        } else {
          // Enter zen mode
          return {
            zenMode: true,
            showComponentsPanel: false,
            showPropertiesPanel: false,
            showPreviewPanel: false,
            showCodePanel: false,
          }
        }
      })
    },

    togglePanel: (panel: 'components' | 'properties' | 'preview' | 'code') => {
      set((state) => {
        switch (panel) {
          case 'components':
            return { showComponentsPanel: !state.showComponentsPanel }
          case 'properties':
            return { showPropertiesPanel: !state.showPropertiesPanel }
          case 'preview':
            return { showPreviewPanel: !state.showPreviewPanel }
          case 'code':
            return { showCodePanel: !state.showCodePanel }
          default:
            return state
        }
      })
    },
  }))
)
