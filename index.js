import http from 'node:http'

const server = http.createServer((req, res) => {
  const url = req.url.replace('/', '')
  
  // if (url === 'favicon.ico') {
  //   res.writeHead(200, {
  //     "Content-Type": "image/x-icon"
  //   })
  //
  //   res.end()
  //   return
  // }
  
  res.writeHead(200, {
    "Content-Type": 'text/html'
  })
  res.end(`
    <html>
        <div>Hello</div>
    </html>
  `) // Utilisez des backtick pout rendre du html (ps : pensez à mettre la bonne entête "Content-Type: text/html"
})

server.listen(8080, 'localhost', () => {
  console.log(`Server listening at 8080`)
})