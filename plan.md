# 🎨 Plán Projektu: Visual TUI Builder + Kreativní Vrstva

Spojujeme dvě vize — **funkční PWA TUI editor** pro Termux a **imerzivní vizuální zážitek** navržený kreativním týmem. Výsledek je nástroj, který je stejně užitečný jako krásný.

---

## 🧭 Celková Vize

```
┌─────────────────────────────────────────────────┐
│  "Digitální pískoviště pro terminálové tvůrce"  │
│                                                 │
│  Stavíš TUI rozhraní vizuálně → vidíš živý      │
│  terminál → exportuješ funkční kód → napojíš   │
│  AI agenta → sdílíš jako umělecké dílo          │
└─────────────────────────────────────────────────┘
```

---

## 📋 Fáze Projektu (5 sprintů)

### 🔵 Fáze 1 — Základ (Sprint 1–2, ~2 týdny)
*Cíl: Funkční MVP bez ozdůbek*

- [ ] Vite PWA setup, Tailwind dark theme, Zustand store
- [ ] Canvas s drag & drop — **Box, Text, Spinner, Gradient**
- [ ] Properties panel — základní Ink props
- [ ] Code generator → čistý Ink/JSX výstup
- [ ] Xterm.js live terminal preview
- [ ] Export `.tsx` souboru

---

### 🟣 Fáze 2 — Vizuální Immerze (Sprint 3, ~1 týden)
*Kreativní tým: senzorická vrstva*

- [ ] **Particle canvas** jako živé pozadí editoru — reaguje na pohyb myši
- [ ] **Barevná reaktivita** komponent — při přetahování zanechávají světelnou stopu (motion blur)
- [ ] **Bloom efekt** při dropnutí komponenty na canvas — krátká záře
- [ ] **Dynamické pozadí** — jemný digitální šum / stará papírová textura (volitelné)
- [ ] **Zen mód** — jedno tlačítko skryje všechny panely, zůstane jen canvas + preview

---

### 🟡 Fáze 3 — Interaktivita & Gamifikace (Sprint 4, ~1 týden)
*Kreativní tým: zapojení uživatele*

- [ ] **Galerie presetů** — hotové TUI layouty s názvy:
  - `Dashboard`, `Chat UI`, `Loading Screen`, `Form Wizard`, `Supernova CLI`
- [ ] **"Bůh" mód pro canvas** — gravitační attractor/repulsor pro částice pozadí
- [ ] **Kreslení komponent** — tažením myši "maluje" nové Text/Box streamy
- [ ] **Kolizní zvuková syntéza** — jemný procedurální tón při dropnutí komponenty
- [ ] **Export do GIF/Video** — nahrání canvas animace pro sdílení

---

### 🟠 Fáze 4 — AI Agent Bridge (Sprint 5, ~1 týden)
*Napojení Gemini + GPT*

- [ ] **Gemini adapter** — `"Vytvoř TUI pro monitoring serveru"` → auto-generuje canvas
- [ ] **GPT adapter** — `"Vylepši layout"` → AI modifikuje existující nodes
- [ ] **Explain mód** — AI vysvětlí vygenerovaný kód česky/anglicky
- [ ] **Strukturovaný JSON output** z AI → přímo do Zustand canvas store
- [ ] Prompt templates specifické pro Ink TUI

---

### 🔴 Fáze 5 — Termux & Polish (průběžně)
*Produkční kvalita*

- [ ] QR kód pro přenos kódu do Termuxu
- [ ] One-click deploy script (`curl | bash`)
- [ ] Offline PWA — plně funkční bez internetu
- [ ] **Fyzikální vylepšení pozadí** — magnetismus částic (+ / − polarita)
- [ ] **Audio vizualizér** — volitelné napojení na mikrofon / audio soubor

---

## 🗺️ Architektura na Jednom Pohledu

```
┌──────────────────────────────────────────────────────────────┐
│                    PWA TUI Builder                           │
│                                                              │
│  ┌─────────────┐  ┌──────────────────┐  ┌────────────────┐  │
│  │  Components │  │   Canvas Engine  │  │  Properties    │  │
│  │  Panel      │  │                  │  │  Panel         │  │
│  │             │  │  [Particle BG]   │  │                │  │
│  │  📦 Box     │  │  ┌────────────┐  │  │  flexDir ▼     │  │
│  │  📝 Text    │→→│  │ TUI Nodes  │  │  │  padding [1]   │  │
│  │  ⏳ Spinner │  │  │ + Bloom FX │  │  │  color [green] │  │
│  │  🌈 Gradient│  │  └────────────┘  │  │                │  │
│  │             │  │                  │  │  [AI Suggest]  │  │
│  │  PRESETS    │  │  [Zen Mode 🧘]   │  │                │  │
│  │  Supernova  │  └──────────────────┘  └────────────────┘  │
│  └─────────────┘                                             │
│                                                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐   │
│  │  Terminal Preview       │  │  Generated Code          │   │
│  │  [Xterm.js live]        │  │  import { Box } from..  │   │
│  │  $ node app.js          │  │  export default App..   │   │
│  │  > Hello Termux! ⠙      │  │  [Copy] [Download] [QR] │   │
│  └─────────────────────────┘  └─────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AI Bridge: [Gemini] [GPT]  "Popiš svůj TUI..."      │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Prioritizační Matice

| Feature | Dopad | Složitost | Priorita |
|---------|-------|-----------|----------|
| Canvas + Code Gen | 🔴 Kritický | Střední | **P0** |
| Xterm.js Preview | 🔴 Kritický | Nízká | **P0** |
| Presets galerie | 🟠 Vysoký | Nízká | **P1** |
| Particle BG + Bloom | 🟡 Střední | Nízká | **P1** |
| AI Bridge (Gemini) | 🔴 Kritický | Vysoká | **P1** |
| Zen mód | 🟡 Střední | Velmi nízká | **P2** |
| Zvuková syntéza | 🟢 Bonusový | Střední | **P3** |
| GIF/Video export | 🟢 Bonusový | Vysoká | **P3** |
| Audio vizualizér | 🟢 Bonusový | Vysoká | **P3** |

---

## 💡 Klíčové Rozhodnutí pro Tým

Tři věci k odsouhlasení před prvním commitem:

1. **Canvas engine** — `@xyflow/react` pro rychlý start vs. custom canvas pro plnou kontrolu nad particle efekty
2. **Preview sandbox** — Xterm.js s mock ANSI (jednodušší) vs. WebContainers / StackBlitz runtime (skutečný Node.js v browseru)
3. **Kreativní vrstva** — particle efekty jako **oddělená WebGL vrstva** (Three.js / vanilla Canvas 2D) pod hlavním React UI, aby nesnižovaly výkon editoru

Nejrychlejší cesta k demo-ready stavu je **Fáze 1 + Zen mód + Presets** — to už samo o sobě udělá silný dojem při prezentaci týmu.
