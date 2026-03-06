# 📁 Struktura Složek — TUI Builder

Čistá, škálovatelná architektura rozdělená podle **zodpovědnosti**, ne podle typu souboru.

---

## 🗂️ Kompletní Strom

```
tui-builder/
│
├── public/
│   ├── icons/                    # PWA ikony (192x192, 512x512)
│   ├── fonts/                    # JetBrains Mono, atd.
│   └── manifest.json             # PWA manifest
│
├── src/
│   │
│   ├── app/                      # 🏠 App shell & routing
│   │   ├── App.tsx
│   │   ├── Layout.tsx
│   │   ├── Router.tsx
│   │   └── index.css
│   │
│   ├── canvas/                   # 🎨 Drag & drop editor
│   │   ├── engine/
│   │   │   ├── CanvasEngine.tsx       # Hlavní canvas komponenta
│   │   │   ├── NodeRenderer.tsx       # Vykreslení TUI nodů
│   │   │   ├── SelectionManager.tsx   # Multi-select, resize
│   │   │   ├── GridSnap.tsx           # Snap to grid logika
│   │   │   └── CanvasShortcuts.ts     # Keyboard shortcuts
│   │   │
│   │   ├── nodes/                     # Každý Ink element = node
│   │   │   ├── BoxNode.tsx
│   │   │   ├── TextNode.tsx
│   │   │   ├── SpinnerNode.tsx
│   │   │   ├── GradientNode.tsx
│   │   │   ├── SpacerNode.tsx
│   │   │   ├── StaticNode.tsx
│   │   │   └── index.ts               # Re-export všech nodů
│   │   │
│   │   └── overlays/
│   │       ├── BloomOverlay.tsx       # Bloom efekt při dropu
│   │       ├── TrailOverlay.tsx       # Motion blur stopy
│   │       └── SelectionBox.tsx       # Výběrový rámeček
│   │
│   ├── panels/                   # 🖥️ UI panely (levý, pravý, spodní)
│   │   │
│   │   ├── components-panel/
│   │   │   ├── ComponentsPanel.tsx    # Levý panel — knihovna komponent
│   │   │   ├── ComponentCard.tsx      # Jedna draggable karta
│   │   │   ├── ComponentSearch.tsx    # Fuzzy search
│   │   │   ├── PresetsGallery.tsx     # Supernova, Dashboard, atd.
│   │   │   └── PresetCard.tsx
│   │   │
│   │   ├── properties-panel/
│   │   │   ├── PropertiesPanel.tsx    # Pravý panel — props editace
│   │   │   ├── BoxProperties.tsx
│   │   │   ├── TextProperties.tsx
│   │   │   ├── SpinnerProperties.tsx
│   │   │   ├── GradientProperties.tsx
│   │   │   └── shared/
│   │   │       ├── ColorPicker.tsx
│   │   │       ├── NumberInput.tsx
│   │   │       ├── SelectInput.tsx
│   │   │       └── ToggleInput.tsx
│   │   │
│   │   ├── preview-panel/
│   │   │   ├── PreviewPanel.tsx       # Spodní levý — Xterm.js
│   │   │   ├── TerminalEmulator.tsx   # Xterm.js wrapper
│   │   │   └── PreviewToolbar.tsx     # Run, Stop, Clear
│   │   │
│   │   └── code-panel/
│   │       ├── CodePanel.tsx          # Spodní pravý — vygenerovaný kód
│   │       ├── CodeEditor.tsx         # Syntax highlight (read-only)
│   │       ├── CodeToolbar.tsx        # Copy, Download, QR
│   │       └── QRExport.tsx           # QR kód pro Termux
│   │
│   ├── codegen/                  # ⚙️ Canvas → Ink kód
│   │   ├── ASTBuilder.ts              # Canvas nodes → AST
│   │   ├── InkCodegen.ts              # AST → JSX string
│   │   ├── ImportResolver.ts          # Auto-detekce importů
│   │   ├── PropsSerializer.ts         # Props → JSX atributy
│   │   ├── Formatter.ts               # Prettier output
│   │   └── templates/
│   │       ├── base.template.ts       # Základní App wrapper
│   │       ├── withHooks.template.ts  # S useState, useEffect
│   │       └── withAI.template.ts     # S AI agent napojením
│   │
│   ├── preview/                  # 👁️ Live terminal preview
│   │   ├── PreviewRunner.ts           # Spouští kód v sandboxu
│   │   ├── AnsiRenderer.ts            # ANSI escape → HTML
│   │   ├── MockInkRuntime.ts          # Simulace Ink bez Node.js
│   │   └── WebContainerBridge.ts      # StackBlitz WebContainers (opt.)
│   │
│   ├── ai/                       # 🤖 AI Agent Bridge
│   │   ├── adapters/
│   │   │   ├── GeminiAdapter.ts       # Google Gemini API
│   │   │   ├── GPTAdapter.ts          # OpenAI GPT API
│   │   │   └── BaseAdapter.ts         # Společné rozhraní
│   │   │
│   │   ├── prompts/
│   │   │   ├── systemPrompt.ts        # TUI expert system prompt
│   │   │   ├── generateLayout.ts      # "Vytvoř layout pro..."
│   │   │   ├── modifyComponent.ts     # "Uprav tuto komponentu..."
│   │   │   └── explainCode.ts         # "Vysvětli tento kód..."
│   │   │
│   │   ├── parsers/
│   │   │   ├── ResponseParser.ts      # AI JSON → canvas nodes
│   │   │   └── CodeParser.ts          # AI kód → canvas nodes
│   │   │
│   │   └── AgentPanel.tsx             # UI pro AI chat
│   │
│   ├── creative/                 # ✨ Vizuální & imerzivní vrstva
│   │   ├── particles/
│   │   │   ├── ParticleEngine.tsx     # WebGL/Canvas 2D particle BG
│   │   │   ├── ParticleConfig.ts      # Konfigurace částic
│   │   │   ├── Attractor.ts           # Gravitační attractor (Bůh mód)
│   │   │   └── MagneticField.ts       # Magnetismus +/- polarita
│   │   │
│   │   ├── effects/
│   │   │   ├── BloomEffect.ts         # Post-processing bloom
│   │   │   ├── MotionBlur.ts          # Trail efekty
│   │   │   └── BackgroundTexture.ts   # Digitální šum / papír
│   │   │
│   │   ├── audio/
│   │   │   ├── SoundSynth.ts          # Procedurální zvuky při dropu
│   │   │   ├── AudioVisualizer.ts     # Mikrofon / audio vstup
│   │   │   └── CollisionSound.ts      # Zvuk srážky komponent
│   │   │
│   │   └── export/
│   │       ├── GifExporter.ts         # Canvas → GIF
│   │       └── VideoExporter.ts       # Canvas → MP4
│   │
│   ├── store/                    # 🗄️ Zustand state management
│   │   ├── canvasStore.ts             # Nodes, selection, history
│   │   ├── codeStore.ts               # Vygenerovaný kód
│   │   ├── uiStore.ts                 # Zen mód, panely, sidebar
│   │   ├── aiStore.ts                 # AI stav, history
│   │   ├── settingsStore.ts           # User preferences
│   │   └── index.ts                   # Re-export všech storů
│   │
│   ├── hooks/                    # 🪝 Sdílené custom hooks
│   │   ├── useCanvas.ts               # Canvas operace
│   │   ├── useCodegen.ts              # Generování kódu
│   │   ├── useKeyboardShortcuts.ts    # Global shortcuts
│   │   ├── useZenMode.ts              # Zen mód toggle
│   │   ├── usePresets.ts              # Načítání presetů
│   │   ├── useAI.ts                   # AI volání
│   │   └── useTerminal.ts             # Xterm.js lifecycle
│   │
│   ├── presets/                  # 🗂️ Hotové TUI layouty
│   │   ├── dashboard.preset.ts
│   │   ├── chat-ui.preset.ts
│   │   ├── loading-screen.preset.ts
│   │   ├── form-wizard.preset.ts
│   │   ├── supernova-cli.preset.ts
│   │   └── index.ts
│   │
│   ├── types/                    # 📐 TypeScript typy
│   │   ├── canvas.types.ts            # TUINode, Position, Size
│   │   ├── ink.types.ts               # Ink props typy
│   │   ├── ai.types.ts                # AI response typy
│   │   └── index.ts
│   │
│   ├── utils/                    # 🔧 Pomocné funkce
│   │   ├── ansi.utils.ts              # ANSI manipulace
│   │   ├── color.utils.ts             # Barvy, konverze
│   │   ├── tree.utils.ts              # Stromové operace (nodes)
│   │   ├── clipboard.utils.ts         # Copy/paste
│   │   └── termux.utils.ts            # Termux-specific helpers
│   │
│   └── config/                   # ⚙️ Konfigurace
│       ├── ink.config.ts              # Ink verze, dostupné komponenty
│       ├── shortcuts.config.ts        # Keyboard shortcuts mapa
│       ├── theme.config.ts            # Dark/light téma
│       └── ai.config.ts               # API endpointy, modely
│
├── tests/                        # 🧪 Testy
│   ├── unit/
│   │   ├── codegen/
│   │   └── utils/
│   ├── integration/
│   │   ├── canvas.test.ts
│   │   └── ai-bridge.test.ts
│   └── e2e/
│       └── builder.spec.ts
│
├── docs/                         # 📚 Dokumentace
│   ├── architecture.md
│   ├── codegen.md
│   ├── ai-bridge.md
│   └── presets.md
│
├── scripts/                      # 🚀 Build & deploy skripty
│   ├── termux-deploy.sh           # One-click Termux deploy
│   ├── generate-icons.ts          # PWA ikony generátor
│   └── validate-presets.ts        # Validace preset souborů
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔑 Pravidla Struktury

Čtyři principy, které drží projekt čistý dlouhodobě:

| Pravidlo | Popis |
|----------|-------|
| **Složka = zodpovědnost** | `canvas/` řeší jen canvas, `codegen/` jen generování — žádné míchání |
| **`index.ts` re-exporty** | Každá složka má `index.ts` → import z `@/canvas` místo `@/canvas/engine/CanvasEngine` |
| **Typy centrálně** | Všechny sdílené typy v `types/` — nikdy inline v komponentách |
| **Kreativní vrstva izolovaná** | `creative/` je čistě volitelná — dá se vypnout bez dopadu na zbytek |

---

## ⚡ Path Aliasy (vite.config.ts)

```typescript
resolve: {
  alias: {
    '@':        './src',
    '@canvas':  './src/canvas',
    '@panels':  './src/panels',
    '@codegen': './src/codegen',
    '@ai':      './src/ai',
    '@store':   './src/store',
    '@types':   './src/types',
    '@utils':   './src/utils',
    '@presets': './src/presets',
  }
}
```

Importy pak vypadají čistě všude v projektu:

```typescript
// ✅ Čistě
import { canvasStore } from '@store/canvasStore';
import { BoxNode }     from '@canvas/nodes';
import { generateInkCode } from '@codegen/InkCodegen';

// ❌ Bordel
import { canvasStore } from '../../../store/canvasStore';
```
