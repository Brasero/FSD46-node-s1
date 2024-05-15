import http from 'node:http';
import path from 'node:path'
import fs from "node:fs";
import querystring from "node:querystring";

const port = 8080
const host = "localhost"
const viewPath = path.join(import.meta.dirname, 'src', 'view')

const server = http.createServer((req, res) => {
  
  const url = req.url
  console.log(url)
  if (url === '/' && req.method === 'GET') {
    const page = fs.readFileSync(path.join(viewPath, 'form.html'), {encoding: 'utf8'})
    res.writeHead(200, {
      "Content-Type": 'text/html'
    })
    res.end(page)
    return
  }
  if (url === "/" && req.method === 'POST') {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString()
    })
    req.on("end", () => {
      console.log(body)
      
      // const dataArray = body.split("&")
      // const obj = {};
      //
      // dataArray.forEach((data) => {
      //   const [key, value] = data.split("=")
      //   obj[key] = value
      // })
      // console.log(obj)
      
      // querystring.parse() va remplacer le code situé juste au-dessus, le résultat final est le même
      const queryObj = querystring.parse(body)
      
      console.log(queryObj)
      res.writeHead(201, {
        'Content-Type' : 'text/html'
      })
      res.end()
    })
    return
  }
  
  res.writeHead(404, {
    "Content-Type": 'text/html'
  })
  res.end(fs.readFileSync(path.join(viewPath, '404.html'), {encoding: 'utf8'}))
  
})

server.listen(port, host, () => {
  console.log(`Listening at http://${host}:${port}`)
})