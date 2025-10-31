import http from 'http'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
}

const server = http.createServer(async (req, res) => {
  try {
    // Remove query string if present
    const cleanUrl = req.url.split('?')[0]
    const filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl)

    const ext = path.extname(filePath)
    const mimeType = mimeTypes[ext] || 'text/plain'
    const data = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': mimeType })
    res.end(data)
  } catch (err) {
    console.error(err)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('File not found')
  }
})

server.listen(8080, () => console.log('Server running at http://localhost:8080'))
