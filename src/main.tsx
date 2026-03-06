import React from 'react'
import ReactDOM from 'react-dom/client'
import SimpleApp from './app/App.simple'
import './index.css'

try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SimpleApp />
    </React.StrictMode>,
  )
} catch (e) {
  console.error('React render error:', e)
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `<div style="color: red; padding: 20px;">ERROR: ${String(e)}</div>`
  }
}
