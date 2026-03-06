export default function MinimalApp() {
  console.log('MinimalApp rendering...')
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#111827',
      color: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>Hello TUI Builder</h1>
    </div>
  )
}
