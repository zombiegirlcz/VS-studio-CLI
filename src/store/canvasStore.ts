import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TUINode, CanvasState, Position, Size } from '@types'

interface CanvasStore extends CanvasState {
  // Mutations
  addNode: (node: TUINode) => void
  removeNode: (nodeId: string) => void
  updateNode: (nodeId: string, updates: Partial<TUINode>) => void
  moveNode: (nodeId: string, position: Position) => void
  resizeNode: (nodeId: string, size: Size) => void
  
  // Selection
  selectNode: (nodeId: string, multiSelect?: boolean) => void
  deselectNode: (nodeId: string) => void
  deselectAll: () => void
  
  // History
  undo: () => void
  redo: () => void
  
  // Utils
  getNode: (nodeId: string) => TUINode | undefined
  getAllNodes: () => TUINode[]
}

export const useCanvasStore = create<CanvasStore>()(
  devtools(
    persist(
      (set, get) => ({
        nodes: new Map(),
        selectedNodeIds: new Set(),
        history: [[]],
        historyIndex: 0,

        addNode: (node: TUINode) => {
          set((state) => {
            const newNodes = new Map(state.nodes)
            newNodes.set(node.id, node)
            return { nodes: newNodes }
          })
        },

        removeNode: (nodeId: string) => {
          set((state) => {
            const newNodes = new Map(state.nodes)
            newNodes.delete(nodeId)
            const newSelected = new Set(state.selectedNodeIds)
            newSelected.delete(nodeId)
            return { nodes: newNodes, selectedNodeIds: newSelected }
          })
        },

        updateNode: (nodeId: string, updates: Partial<TUINode>) => {
          set((state) => {
            const newNodes = new Map(state.nodes)
            const node = newNodes.get(nodeId)
            if (node) {
              newNodes.set(nodeId, { ...node, ...updates })
            }
            return { nodes: newNodes }
          })
        },

        moveNode: (nodeId: string, position: Position) => {
          get().updateNode(nodeId, { position })
        },

        resizeNode: (nodeId: string, size: Size) => {
          get().updateNode(nodeId, { size })
        },

        selectNode: (nodeId: string, multiSelect?: boolean) => {
          set((state) => {
            const newSelected = multiSelect 
              ? new Set(state.selectedNodeIds) 
              : new Set<string>()
            newSelected.add(nodeId)
            return { selectedNodeIds: newSelected }
          })
        },

        deselectNode: (nodeId: string) => {
          set((state) => {
            const newSelected = new Set(state.selectedNodeIds)
            newSelected.delete(nodeId)
            return { selectedNodeIds: newSelected }
          })
        },

        deselectAll: () => {
          set({ selectedNodeIds: new Set() })
        },

        undo: () => {
          set((state) => {
            if (state.historyIndex > 0) {
              return { historyIndex: state.historyIndex - 1 }
            }
            return state
          })
        },

        redo: () => {
          set((state) => {
            if (state.historyIndex < state.history.length - 1) {
              return { historyIndex: state.historyIndex + 1 }
            }
            return state
          })
        },

        getNode: (nodeId: string) => {
          return get().nodes.get(nodeId)
        },

        getAllNodes: () => {
          return Array.from(get().nodes.values())
        },
      }),
      {
        name: 'canvas-store',
      }
    )
  )
)
