export interface AIResponse {
  type: 'layout' | 'component' | 'modification'
  nodes: any[]
  code?: string
  explanation?: string
}

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}
