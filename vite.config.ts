import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@canvas': path.resolve(__dirname, './src/canvas'),
      '@panels': path.resolve(__dirname, './src/panels'),
      '@codegen': path.resolve(__dirname, './src/codegen'),
      '@ai': path.resolve(__dirname, './src/ai'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@presets': path.resolve(__dirname, './src/presets'),
      '@creative': path.resolve(__dirname, './src/creative'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
