export type TUINodeType = 'box' | 'text' | 'spinner' | 'gradient' | 'spacer' | 'static'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface TUINode {
  id: string
  type: TUINodeType
  position: Position
  size: Size
  props: Record<string, any>
  children?: string[] // IDs of child nodes
  parentId?: string
}

export interface CanvasState {
  nodes: Map<string, TUINode>
  selectedNodeIds: Set<string>
  clipboard?: TUINode
  history: TUINode[][]
  historyIndex: number
}
