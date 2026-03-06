const http = require('http')
const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, 'dist')
console.log('Serving from:', distDir)

const getContentType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase()
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
  }
  return types[ext] || 'application/octet-stream'
}

const server = http.createServer((req, res) => {
  // Debug page
  if (req.url === '/debug') {
    fs.readFile(path.join(__dirname, 'index.debug.html'), (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(data || '<h1>Debug page not found</h1>')
    })
    return
  }

  // Super debug page
  if (req.url === '/super-debug') {
    fs.readFile(path.join(__dirname, 'index.super-debug.html'), (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(data || '<h1>Super debug page not found</h1>')
    })
    return
  }

  // Diagnostic page
  if (req.url === '/diagnostic') {
    fs.readFile(path.join(__dirname, 'diagnostic.html'), (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(data || '<h1>Diagnostic page not found</h1>')
    })
    return
  }

  // Service Worker
  if (req.url === '/sw.js') {
    fs.readFile(path.join(__dirname, 'public/sw.js'), (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('SW not found')
        return
      }
      res.writeHead(200, { 
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      })
      res.end(data)
    })
    return
  }

  let filePath = req.url === '/' ? 'index.html' : req.url
  // Strip query string for file lookup
  filePath = filePath.split('?')[0]
  filePath = path.join(distDir, filePath)
  
  // Prevent directory traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403, { 'Content-Type': 'text/html' })
    res.end('<h1>403 Forbidden</h1>')
    return
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // File not found - try index.html for SPA routing
      fs.readFile(path.join(distDir, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.end('<h1>404 Not Found</h1>')
        } else {
          // Add cache busting for dev
          let html = data2.toString()
          const bust = Date.now()
          html = html.replace(/(assets\/[^"']+)/g, `$1?t=${bust}`)
          
          res.writeHead(200, { 
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          })
          res.end(html)
        }
      })
    } else {
      const contentType = getContentType(filePath)
      const isIndexHtml = path.basename(filePath) === 'index.html'
      const cacheControl = isIndexHtml 
        ? 'no-cache, no-store, must-revalidate' 
        : 'public, max-age=3600'
      
      let responseData = data
      let headers = {
        'Content-Type': contentType,
        'Cache-Control': cacheControl
      }
      
      // Cache busting for index.html
      if (isIndexHtml) {
        let html = data.toString()
        const bust = Date.now()
        html = html.replace(/(assets\/[^"']+)/g, `$1?t=${bust}`)
        responseData = html
        headers['Pragma'] = 'no-cache'
        headers['Expires'] = '0'
      }
      
      res.writeHead(200, headers)
      res.end(responseData)
    }
  })
})

server.listen(5173, '0.0.0.0', () => {
  console.log('Server listening on port 5173')
  console.log('Main app: http://localhost:5173/')
  console.log('Debug: http://localhost:5173/debug')
  console.log('Serving from:', distDir)
})
