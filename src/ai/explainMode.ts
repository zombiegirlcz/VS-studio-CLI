import { useAIStore } from '@store'
import { useCanvasStore } from '@store'

export const activateExplainMode = async () => {
  const nodes = useCanvasStore.getState().nodes
  const addMessage = useAIStore.getState().addMessage

  const nodeDescriptions = Array.from(nodes.values())
    .map((n) => `- ${n.type} at (${n.x}, ${n.y}): ${n.props?.text || 'no text'}`)
    .join('\n')

  const prompt = `Vysvětli tento TUI design jako bys mluvil vývojáři:

  Struktura canvas:
  ${nodeDescriptions}

  Jaký je účel těchto komponent? Jak spolu komunikují?`

  addMessage({
    role: 'user',
    content: prompt,
    timestamp: Date.now(),
  })

  // Simulate AI response
  addMessage({
    role: 'assistant',
    content: `Váš TUI design se skládá z následujících komponent:
    
    1. **Layout**: Komponenty jsou rozmístěny na pásu (${nodes.size} prvků)
    2. **Purpose**: Tvoří interaktivní rozhraní pro uživatele
    3. **Interaction**: Lze je aktualizovat přetažením a úpravou vlastností
    
    Doporučuji přidat event handlers pro lepší interaktivitu.`,
    timestamp: Date.now(),
  })
}
