import React, { useState } from 'react'
import { useAIStore } from '@store'

const APIConfigPanel: React.FC = () => {
  const { selectedAdapter } = useAIStore((state) => ({
    selectedAdapter: state.selectedAdapter,
  }))

  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('GEMINI_API_KEY') || '')
  const [gptKey, setGptKey] = useState(localStorage.getItem('OPENAI_API_KEY') || '')

  const handleSaveGemini = () => {
    if (geminiKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', geminiKey)
      alert('Gemini API key saved!')
    }
  }

  const handleSaveGPT = () => {
    if (gptKey.trim()) {
      localStorage.setItem('OPENAI_API_KEY', gptKey)
      alert('OpenAI API key saved!')
    }
  }

  return (
    <div className="space-y-3 p-4 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200">API Configuration</h3>

      <div className="space-y-2">
        <label className="text-xs text-gray-400">Google Gemini API Key</label>
        <input
          type="password"
          value={geminiKey}
          onChange={(e) => setGeminiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-200"
        />
        <button
          onClick={handleSaveGemini}
          className="w-full px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Gemini Key
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-gray-400">OpenAI API Key</label>
        <input
          type="password"
          value={gptKey}
          onChange={(e) => setGptKey(e.target.value)}
          placeholder="sk-..."
          className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-200"
        />
        <button
          onClick={handleSaveGPT}
          className="w-full px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save OpenAI Key
        </button>
      </div>

      <div className="text-xs text-gray-500 bg-gray-900 p-2 rounded">
        Keys are stored locally in your browser. Get them from:
        <br />• Google AI Studio (gemini)
        <br />• OpenAI Platform (gpt)
      </div>
    </div>
  )
}

export default APIConfigPanel
