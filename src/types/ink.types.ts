export interface TextProps {
  content: string
  color?: string
  bold?: boolean
  italic?: boolean
}

export interface BoxProps {
  borderStyle?: 'single' | 'double' | 'round' | 'bold'
  borderColor?: string
  backgroundColor?: string
  padding?: number
}

export interface SpinnerProps {
  type?: 'dots' | 'line' | 'arc'
  color?: string
}

export interface GradientProps {
  direction?: 'horizontal' | 'vertical'
  colors: string[]
}

export interface InkProps {
  flexDirection?: 'row' | 'column'
  padding?: number | [number, number]
  margin?: number | [number, number]
  width?: number | string
  height?: number | string
}
