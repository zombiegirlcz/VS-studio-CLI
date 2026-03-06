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

  let filePath = req.url === '/' ? 'index.html' : req.url
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
          res.writeHead(200, { 
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          })
          res.end(data2)
        }
      })
    } else {
      const contentType = getContentType(filePath)
      const isIndexHtml = path.basename(filePath) === 'index.html'
      const cacheControl = isIndexHtml 
        ? 'no-cache, no-store, must-revalidate' 
        : 'public, max-age=3600'
      
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': cacheControl
      })
      res.end(data)
    }
  })
})

server.listen(5173, '0.0.0.0', () => {
  console.log('Server listening on port 5173')
  console.log('Main app: http://localhost:5173/')
  console.log('Debug: http://localhost:5173/debug')
  console.log('Serving from:', distDir)
})
