export interface PromptTemplate {
  id: string
  name: string
  category: 'ui' | 'logic' | 'data' | 'effect'
  description: string
  prompt: string
  suggestedComponents?: string[]
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'dashboard-layout',
    name: 'Dashboard Layout',
    category: 'ui',
    description: 'Generate a dashboard with cards, metrics, and charts',
    prompt: `Create a TUI dashboard layout with:
- Header with title and date
- Grid of metric cards showing KPIs
- Status indicators (✓ active, ✗ inactive)
- Navigation sidebar
Use Ink Box, Text, and custom styling for a professional look.`,
    suggestedComponents: ['Box', 'Text', 'Grid'],
  },
  {
    id: 'form-wizard',
    name: 'Form Wizard',
    category: 'logic',
    description: 'Multi-step form with validation',
    prompt: `Create a multi-step form wizard for Ink TUI with:
- Step indicators (1→2→3)
- Form fields (text, select, checkbox)
- Next/Back/Submit buttons
- Input validation messages
- Progress bar showing completion`,
    suggestedComponents: ['Box', 'Text', 'Input', 'Select'],
  },
  {
    id: 'loading-state',
    name: 'Loading Animation',
    category: 'effect',
    description: 'Animated loading spinner and progress',
    prompt: `Generate an animated loading component with:
- Rotating spinner (| / - \\ sequence)
- Percentage progress indicator
- Loading message text
- Estimated time remaining
- Smooth animation using setInterval`,
    suggestedComponents: ['Text', 'Box'],
  },
  {
    id: 'data-table',
    name: 'Data Table',
    category: 'data',
    description: 'Scrollable table with sorting and filtering',
    prompt: `Create an interactive data table for Ink TUI with:
- Header row with column names
- Data rows with alternating background colors
- Sortable columns (click header to sort)
- Filter/search bar at top
- Scrollable viewport with page info`,
    suggestedComponents: ['Box', 'Text', 'Input'],
  },
  {
    id: 'menu-system',
    name: 'Menu System',
    category: 'ui',
    description: 'Interactive vertical or horizontal menu',
    prompt: `Generate a TUI menu system with:
- Menu items with descriptions
- Keyboard navigation (↑↓ arrow keys)
- Highlighting of selected item
- Enter to select, ESC to cancel
- Sub-menus or dropdown support
- Keyboard shortcuts for quick access`,
    suggestedComponents: ['Box', 'Text'],
  },
  {
    id: 'notification-toast',
    name: 'Toast Notification',
    category: 'ui',
    description: 'Temporary notification messages',
    prompt: `Create a toast notification system for Ink TUI with:
- Different styles for success, warning, error, info
- Auto-dismiss after 3 seconds
- Position in corner (top-right, bottom-left, etc.)
- Multiple stacked notifications
- Close button or manual dismissal`,
    suggestedComponents: ['Box', 'Text'],
  },
  {
    id: 'code-viewer',
    name: 'Code Syntax Viewer',
    category: 'data',
    description: 'Display code with syntax highlighting',
    prompt: `Generate a code viewer component that:
- Shows code with line numbers
- Keyword highlighting (imports, functions, etc.)
- Dark theme for readability
- Copy-to-clipboard button
- Language indicator (JavaScript, Python, etc.)
- Scrollable for long files`,
    suggestedComponents: ['Box', 'Text'],
  },
  {
    id: 'chat-interface',
    name: 'Chat Interface',
    category: 'ui',
    description: 'Conversation display with message bubbles',
    prompt: `Create a chat interface for Ink TUI with:
- Message history scrollable view
- User messages (right-aligned, light background)
- Bot messages (left-aligned, darker background)
- Timestamp for each message
- Input field at bottom for new messages
- Typing indicator animation`,
    suggestedComponents: ['Box', 'Text', 'Input'],
  },
  {
    id: 'file-browser',
    name: 'File Browser',
    category: 'data',
    description: 'Navigate filesystem with keyboard',
    prompt: `Generate a file browser component with:
- Current directory path display
- File/folder listing with icons
- Keyboard navigation (↑↓ to move, → to open folder)
- Folder indicator ([folder_name/])
- File size and modification date
- Breadcrumb navigation`,
    suggestedComponents: ['Box', 'Text'],
  },
  {
    id: 'settings-panel',
    name: 'Settings Panel',
    category: 'logic',
    description: 'Configuration options and preferences',
    prompt: `Create a settings panel with:
- Toggle switches for boolean options
- Dropdown selects for choice options
- Input fields for text config
- Reset to defaults button
- Save/Cancel buttons
- Section grouping (General, Display, Advanced)`,
    suggestedComponents: ['Box', 'Text', 'Select'],
  },
]

export const getPromptByCategory = (category: string): PromptTemplate[] => {
  return promptTemplates.filter((p) => p.category === category)
}

export const getPromptById = (id: string): PromptTemplate | undefined => {
  return promptTemplates.find((p) => p.id === id)
}
