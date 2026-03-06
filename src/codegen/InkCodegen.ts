import { TUINode } from '@types'

export const generateInkCode = (nodes: TUINode[]): string => {
  if (nodes.length === 0) {
    return `import React from 'react'

export default function App() {
  return <div>Hello TUI!</div>
}`
  }

  let imports = new Set(['React', 'Box', 'Text'])
  let components = ''

  // Generate component code from nodes
  const rootNodes = nodes.filter((n) => !n.parentId)
  
  rootNodes.forEach((node) => {
    components += generateNodeCode(node, nodes, imports)
  })

  const importList = Array.from(imports).map((imp) => {
    if (imp === 'React') return 'React'
    if (imp === 'Box') return 'Box'
    if (imp === 'Text') return 'Text'
    return imp
  }).join(', ')

  return `import React from 'react'
import { ${importList} } from 'ink'

export default function App() {
  return (
    ${components}
  )
}
`
}

function generateNodeCode(node: TUINode, allNodes: TUINode[], imports: Set<string>): string {
  const indent = '    '
  let code = ''

  switch (node.type) {
    case 'box': {
      imports.add('Box')
      const props = buildProps(node.props)
      code += `${indent}<Box${props}>`
      const children = allNodes.filter((n) => n.parentId === node.id)
      children.forEach((child) => {
        code += generateNodeCode(child, allNodes, imports)
      })
      code += `${indent}</Box>\n`
      break
    }

    case 'text': {
      imports.add('Text')
      const props = buildProps(node.props)
      code += `${indent}<Text${props}>${node.props.content || ''}</Text>\n`
      break
    }

    case 'spinner': {
      imports.add('Spinner')
      const props = buildProps(node.props)
      code += `${indent}<Spinner${props} />\n`
      break
    }

    default:
      code += `${indent}{/* ${node.type} */}\n`
  }

  return code
}

function buildProps(props: Record<string, any>): string {
  const propEntries = Object.entries(props).filter(([, value]) => value !== undefined && value !== null && value !== '')

  if (propEntries.length === 0) return ''

  const propsStr = propEntries
    .map(([key, value]) => {
      if (typeof value === 'string') return `${key}="${value}"`
      if (typeof value === 'number') return `${key}={${value}}`
      if (typeof value === 'boolean') return `${key}={${value}}`
      return null
    })
    .filter(Boolean)
    .join(' ')

  return propsStr ? ` ${propsStr}` : ''
}
