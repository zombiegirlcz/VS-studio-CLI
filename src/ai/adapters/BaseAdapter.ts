export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface AIRequest {
  prompt: string
  context?: Record<string, any>
  mode: 'generate' | 'modify' | 'explain'
}

export interface AIResponse {
  success: boolean
  content: string
  nodes?: any[]
  code?: string
  explanation?: string
  error?: string
}

export abstract class BaseAdapter {
  abstract name: string
  abstract generateLayout(prompt: string): Promise<AIResponse>
  abstract modifyComponent(prompt: string, nodeId: string): Promise<AIResponse>
  abstract explainCode(code: string): Promise<AIResponse>
}
