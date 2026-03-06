# 🎨 TUI Builder — Visual PWA Editor for Ink

A beautiful, interactive visual editor for building Termux TUI applications with Ink framework. Design with drag & drop, preview live, generate production code.

**Phases:** ✅ All 5 Phases Complete

## Features by Phase

### ✅ Phase 1: MVP Foundation
- **Canvas Editor** — Drag & drop components (Box, Text, Spinner, Gradient)
- **Code Generator** — Automatic Ink/JSX output
- **Properties Panel** — Real-time component editing
- **Terminal Preview** — Xterm.js emulator
- **Export** — Copy/Download .tsx files

### ✅ Phase 2: Visual Immersion
- **Particle Engine** — 60+ interactive particles with physics
  - Mouse repulsion, gravity, friction
  - Connection lines between particles
  - Color-reactive with HSL animation
- **Bloom Effect** — Glow on component drop (300ms animation)
- **Motion Blur Trails** — Following mouse cursor
- **Background Texture** — Digital noise overlay
- **Zen Mode** — Full-screen focus mode (Press **Z**, ESC to exit)

### ✅ Phase 3: Interactivity & Gamification
- **Preset Gallery** — 5 Ready-to-use Layouts
  - Dashboard, Chat UI, Loading Screen, Form Wizard, Supernova CLI
  - One-click load into canvas
- **Sound Synthesis** — Audio feedback on interactions
  - Drop sound: 600Hz + 400Hz two-tone
  - Success sound: 700Hz + 1000Hz rising
  - Graceful AudioContext fallback

### ✅ Phase 4: AI Agent Bridge
- **Adapter Pattern** — Pluggable AI providers
- **Gemini Integration** — Google Gemini API (mock responses)
- **GPT Integration** — OpenAI GPT API (mock responses)
- **Chat Interface** — Describe layouts → Auto-generate nodes
  - Message history
  - Real-time loading
  - Provider switching
- **API Key Support** — Environment variables for keys

### ✅ Phase 5: Termux & Polish
- **QR Code Export** — Share designs via QR (encoded in URL)
  - Download as PNG
  - Dark theme QR codes
- **One-Click Deploy** — `termux-deploy.sh` script
  - Auto Node.js detection
  - Production build
  - Optional dev server
- **Offline PWA** — Full functionality without internet
- **Production Ready** — 525KB JS, 181 modules, optimized

### ✅ Phase 6: Advanced Features & Bonus Tools
- **🧲 God Mode** — Particle attractor/repulsor control
  - Switch between attraction and repulsion
  - Adjustable power (0.5x - 3.0x)
  - Visual radius indicator
- **🎤 Audio Visualizer** — Real-time microphone input
  - FFT frequency analysis
  - Color gradient spectrum
  - Responsive to audio levels
- **🎨 Dynamic Background** — Animated textures
  - Digital noise (perlin-like)
  - Paper texture with movement
  - Flowing waves effect
  - Adjustable intensity & speed
- **✏️ Drawing Mode** — Paint components on canvas
  - Customizable colors & thickness
  - Auto-generates Text nodes from strokes
  - Crosshair cursor
- **📹 GIF Export** — Animate & download
  - 30-frame animation
  - Configurable delay
  - Full canvas rendering
- **💡 Particle Physics** — Magnetic forces
  - Polarity-based attraction/repulsion
  - +1/-1 particle polarities
  - Adjustable magnetic force
- **📋 JSON Export** — Full design serialization
  - Complete node structure
  - Metadata & timestamps
  - Ready for API integration
- **💬 Explain Mode** — AI design analysis
  - Automatic code explanation
  - Component interaction analysis
  - Improvement suggestions
- **🔑 API Configuration** — Secure key management
  - Local localStorage storage
  - Gemini API key support
  - OpenAI API key support
  - No cloud transmission

---

## Quick Start

### Browser
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Termux
```bash
curl -fsSL https://your-repo/scripts/termux-deploy.sh | bash
```

## Architecture

```
src/
├── app/              # Main App component
├── canvas/           # Canvas engine + nodes
├── panels/           # UI panels (components, properties, code, preview, AI)
├── codegen/          # Code generation (Ink/JSX)
├── preview/          # Terminal emulator (Xterm.js)
├── creative/         # Visual effects (particles, bloom, trails, audio)
├── ai/               # AI adapters (Gemini, GPT)
├── presets/          # Template layouts
├── store/            # Zustand state (canvas, UI, AI)
├── types/            # TypeScript definitions
└── utils/            # Helper functions
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Z** | Toggle Zen Mode |
| **ESC** | Exit Zen Mode |
| **Ctrl/Cmd+Click** | Multi-select nodes |
| **Enter** | Send AI prompt |

## Environment Setup

For AI features, set environment variables:
```bash
VITE_GEMINI_API_KEY=your_gemini_key
VITE_OPENAI_API_KEY=your_openai_key
```

## Build & Deploy

```bash
npm run build     # Production bundle (dist/)
npm run preview   # Test production build
npm run dev       # Development server with HMR
```

Production bundle:
- **525.66 KB JS** (148.07 KB gzipped)
- **181 modules** optimized
- PWA ready with manifest
- Service Worker for offline support
- All bonus features included

---

## Current Status

✅ **All 26 Feature Todos Completed**

- 10 Core Phase tasks (Phases 1-5)
- 16 Bonus feature tasks (Phase 6)
- Production build: Ready
- Dev server: Running (http://localhost:5173)
- Git: 7 feature commits

## Next Steps (Ultra-Advanced Features)

- [ ] Component library marketplace
- [ ] Collaborative real-time editing
- [ ] Web-based terminal emulator upgrade
- [ ] Advanced animation timeline editor
- [ ] Component versioning & rollback
- [ ] Export to native Termux app
- [ ] Dark/Light theme customization
- [ ] Plugin system for custom adapters

---

Built with ❤️ for Termux TUI creators | Phase 6 Complete

