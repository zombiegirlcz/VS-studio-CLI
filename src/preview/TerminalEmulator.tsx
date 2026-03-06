import React, { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

const TerminalEmulator: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminalInstanceRef = useRef<Terminal | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    const terminal = new Terminal({
      theme: {
        background: '#111827',
        foreground: '#e5e7eb',
        cursor: '#3b82f6',
      },
      fontFamily: 'monospace',
      fontSize: 12,
    })

    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    terminal.open(terminalRef.current)

    // Mock terminal output
    terminal.writeln('\x1b[1;32mTUI Builder Terminal Preview\x1b[0m')
    terminal.writeln('$ Node.js environment ready')
    terminal.write('$ ')

    const handleResize = () => {
      try {
        fitAddon.fit()
      } catch (e) {
        // Ignore fit errors
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    terminalInstanceRef.current = terminal

    return () => {
      window.removeEventListener('resize', handleResize)
      terminal.dispose()
    }
  }, [])

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#111827',
      }}
    />
  )
}

export default TerminalEmulator
