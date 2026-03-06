import { BaseAdapter, AIResponse } from './BaseAdapter'

export class GPTAdapter extends BaseAdapter {
  name = 'GPT'
  private apiKey: string

  constructor(apiKey?: string) {
    super()
    this.apiKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY || ''
  }

  async generateLayout(prompt: string): Promise<AIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        content: 'OpenAI API key not configured',
        error: 'Missing VITE_OPENAI_API_KEY',
      }
    }

    try {
      // Mock response for demo
      const mockNodes = [
        {
          id: `gpt-node-${Date.now()}`,
          type: 'box',
          position: { x: 20, y: 20 },
          size: { width: 280, height: 100 },
          props: { borderStyle: 'single', borderColor: 'cyan' },
        },
      ]

      return {
        success: true,
        content: `GPT Generated: ${prompt}`,
        nodes: mockNodes,
      }
    } catch (error) {
      return {
        success: false,
        content: 'Error calling GPT API',
        error: String(error),
      }
    }
  }

  async modifyComponent(prompt: string, nodeId: string): Promise<AIResponse> {
    return {
      success: true,
      content: `GPT modified component ${nodeId}`,
    }
  }

  async explainCode(code: string): Promise<AIResponse> {
    return {
      success: true,
      content: 'GPT explanation coming soon',
      explanation: code,
    }
  }
}
