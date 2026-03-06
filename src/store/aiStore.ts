import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AIMessage } from '@ai/adapters'

interface AIStore {
  messages: AIMessage[]
  isLoading: boolean
  selectedAdapter: 'gemini' | 'gpt'
  
  // Messages
  addMessage: (message: AIMessage) => void
  clearMessages: () => void
  
  // Loading
  setLoading: (loading: boolean) => void
  
  // Adapter
  setAdapter: (adapter: 'gemini' | 'gpt') => void
}

export const useAIStore = create<AIStore>()(
  devtools((set) => ({
    messages: [],
    isLoading: false,
    selectedAdapter: 'gemini',

    addMessage: (message: AIMessage) => {
      set((state) => ({
        messages: [...state.messages, message],
      }))
    },

    clearMessages: () => {
      set({ messages: [] })
    },

    setLoading: (loading: boolean) => {
      set({ isLoading: loading })
    },

    setAdapter: (adapter: 'gemini' | 'gpt') => {
      set({ selectedAdapter: adapter })
    },
  }))
)
