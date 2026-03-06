# 🎨 TUI Builder — PWA Visual Editor for Ink

A beautiful, interactive visual editor for building Termux TUI applications with Ink. Design with drag & drop, preview live, export production code.

## Phase 1: ✅ Complete

- ✅ **PWA Setup** — Vite + React + Tailwind + Zustand
- ✅ **Canvas Engine** — Drag & drop visual editor with Box, Text, Spinner, Gradient components
- ✅ **Properties Panel** — Real-time component property editing
- ✅ **Code Generator** — Automatic Ink/JSX code generation
- ✅ **Terminal Preview** — Xterm.js integration for live terminal output
- ✅ **Export** — Download generated .tsx files

## Quick Start

```bash
npm install
npm run dev
```

Server runs on `http://localhost:5173`

## Architecture

```
tui-builder/
├── src/
│   ├── app/                # Main App component
│   ├── canvas/             # Canvas & drag-drop engine
│   ├── panels/             # UI panels (components, properties, code, preview)
│   ├── codegen/            # Code generation (Ink/JSX)
│   ├── preview/            # Terminal preview (Xterm.js)
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
└── package.json
```

## Features (Phase 1)

### Canvas Editor
- **Drag & drop** components onto canvas
- **Multi-select** with Ctrl/Cmd+Click
- **Resize & move** nodes with mouse
- **Real-time** properties panel

### Code Generation
- Auto-generates clean Ink/JSX code
- **Copy to clipboard** or **download .tsx**
- Props automatically serialized

### Terminal Preview
- Xterm.js emulation
- Mock terminal output
- Responsive sizing

### Zen Mode
- Hide all panels (press **Z**)
- Focus on canvas + preview only
- Perfect for presentation mode

## Next Phases (Planned)

- **Phase 2**: Particle effects, bloom, motion blur
- **Phase 3**: Preset gallery, drawing mode, sound synthesis
- **Phase 4**: AI bridge (Gemini/GPT), auto-layout
- **Phase 5**: Termux deploy, offline PWA, physics

## Development

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

---

Built with ❤️ for Termux TUI creators
