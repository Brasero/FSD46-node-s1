import http from 'node:http'
import {shuffle} from './src/utils/shuffle.js';
import fs from 'node:fs'
import path from 'node:path'

const users = ['Alan','Sophie','Bernard','Elie'];
const port = 8080
const host = 'localhost'
const dirname = import.meta.dirname //__dirname commonjs
//const filename = import.meta.filename // __filename commonjs
const viewPath = path.join(dirname, 'src', 'view')


const server = http.createServer((req, res) => {
  const url = req.url.replace('/', '')
  const header = fs.readFileSync(path.join(viewPath, '__header.html'), {encoding: 'utf8'})
  const footer = fs.readFileSync(path.join(viewPath, '__footer.html'), {encoding: 'utf8'})
  
  if (url === 'favicon.ico') {
    res.writeHead(200, {
      "Content-Type": "image/x-icon"
    })
    res.end()
    return
  }
  if (url === '') {
    console.log(users)
    res.writeHead(200, {
      "Content-Type": 'text/html'
    })
    let html = header +`
            <ul>
    `
    users.forEach((user) => {
      html += `<li>${user}</li>`
    })
    
    html += `
      </ul>
      <a href="/shuffle">Shuffle</a>
    ` + footer
    res.end(html)
    return
  }
  if (url === 'shuffle') {
    shuffle(users)
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    
    let html = header + `
            <ul>
    `
    users.forEach((user) => {
      html += `<li>${user}</li>`
    })
    
    html += `
      </ul>
      <a href="/shuffle">Shuffle</a>
    ` + footer
    
    res.end(html)
    return
  }
  
  res.writeHead(404, {
    "Content-Type": 'text/html'
  })
  res.end(fs.readFileSync(path.join(viewPath, '404.html'), {encoding: 'utf8'}))
})

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})