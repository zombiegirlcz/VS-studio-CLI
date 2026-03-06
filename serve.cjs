const http = require('http')
const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, 'dist')
console.log('Serving from:', distDir)

const server = http.createServer((req, res) => {
  console.log('Request:', req.url)
  
  let filePath = req.url === '/' ? 'index.html' : req.url
  filePath = path.join(distDir, filePath)
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('File not found, serving index.html:', err.message)
      fs.readFile(path.join(distDir, 'index.html'), (err2, data2) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data2 || '<h1>Error</h1>')
      })
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    }
  })
})

server.listen(5173, '0.0.0.0', () => {
  console.log('Server listening on port 5173')
})
