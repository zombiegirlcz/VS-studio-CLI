import { create } from 'zustand'

export interface DrawingState {
  isEnabled: boolean
  color: string
  thickness: number
  enable: () => void
  disable: () => void
  setColor: (color: string) => void
  setThickness: (thickness: number) => void
}

export const useDrawingStore = create<DrawingState>((set) => ({
  isEnabled: false,
  color: '#3b82f6',
  thickness: 2,
  enable: () => set({ isEnabled: true }),
  disable: () => set({ isEnabled: false }),
  setColor: (color) => set({ color }),
  setThickness: (thickness) => set({ thickness }),
}))
