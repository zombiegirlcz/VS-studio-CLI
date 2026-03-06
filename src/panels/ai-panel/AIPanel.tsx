import React, { useState } from 'react'
import { useAIStore } from '@store'
import { useCanvasStore } from '@store'
import { GeminiAdapter, GPTAdapter } from '@ai/adapters'

const AIPanel: React.FC = () => {
  const messages = useAIStore((state) => state.messages)
  const isLoading = useAIStore((state) => state.isLoading)
  const selectedAdapter = useAIStore((state) => state.selectedAdapter)
  const addMessage = useAIStore((state) => state.addMessage)
  const setLoading = useAIStore((state) => state.setLoading)
  const setAdapter = useAIStore((state) => state.setAdapter)
  const addNode = useCanvasStore((state) => state.addNode)

  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    addMessage({
      role: 'user',
      content: input,
      timestamp: Date.now(),
    })

    setLoading(true)

    try {
      const adapter = selectedAdapter === 'gemini' ? new GeminiAdapter() : new GPTAdapter()
      const response = await adapter.generateLayout(input)

      addMessage({
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
      })

      // Load generated nodes if available
      if (response.nodes) {
        response.nodes.forEach((node) => addNode(node))
      }
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: 'Error: ' + String(error),
        timestamp: Date.now(),
      })
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  return (
    <div
      style={{
        width: '300px',
        height: '100%',
        backgroundColor: '#111827',
        borderLeft: '1px solid #374151',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '12px', borderBottom: '1px solid #374151' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
          🤖 AI Agent
        </div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
          <button
            onClick={() => setAdapter('gemini')}
            style={{
              flex: 1,
              padding: '6px',
              backgroundColor: selectedAdapter === 'gemini' ? '#3b82f6' : '#1f2937',
              color: '#e5e7eb',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            Gemini
          </button>
          <button
            onClick={() => setAdapter('gpt')}
            style={{
              flex: 1,
              padding: '6px',
              backgroundColor: selectedAdapter === 'gpt' ? '#3b82f6' : '#1f2937',
              color: '#e5e7eb',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            GPT
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: '#6b7280', fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
            Describe your TUI design...
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: msg.role === 'user' ? '#3b82f6' : '#1f2937',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '11px',
              maxWidth: '100%',
              wordWrap: 'break-word',
            }}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ color: '#6b7280', fontSize: '11px' }}>Thinking...</div>
        )}
      </div>

      <div style={{ padding: '12px', borderTop: '1px solid #374151' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe layout..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '6px',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              color: '#e5e7eb',
              borderRadius: '3px',
              fontSize: '11px',
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              padding: '6px 10px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px',
              opacity: isLoading || !input.trim() ? 0.5 : 1,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIPanel
