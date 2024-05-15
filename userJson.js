import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs'

const port = 3000
const host = "localhost"
const dataPath = path.join(import.meta.dirname, 'src', 'Data')

const server = http.createServer((req,res) => {
  const url = req.url
  
  if (url === '/all') {
    const data = fs.readFileSync(path.join(dataPath, 'all.json'), {encoding: 'utf8'})
    const student =  JSON.parse(data).student
    
    res.writeHead(200, {
      "Content-Type": 'text/json'
    })
    
    res.end(JSON.stringify(student))
    
    return
  }
  if (url.match(/^\/search\//)) {
    
    const name = url.split('/').pop()
    
    fs.readFile(path.join(dataPath, `${name}.json`), {encoding: 'utf8'}, (err, data) => {
      if (err) {
        res.writeHead(404, {
          "Content-type": 'text/json'
        })
        res.end(JSON.stringify({message: 'cet élève n existe pas'}))
        throw err;
      }
      
      res.writeHead(200, {
        "Content-Type": 'text/json'
      })
      return res.end(data)
    })
    
    return
  }
  
  res.writeHead(404, {
    "Content-Type" : 'text/json'
  })
  res.end(JSON.stringify({
    message: "page introuvable"
  }))
})

server.listen(port, host, () => {
  console.log(`API running on http://${host}:${port}`)
})