import http from 'node:http'
import path from 'node:path'
import fs from "node:fs";

const port = 8080;
const host = "localhost";

const viewPath = path.join(import.meta.dirname, 'src', 'view') //Chemin absolu vers le dossier de vues
const dataPath = path.join(import.meta.dirname, 'src', 'Data') //Chemin absolu vers le dossier de Data

const server = http.createServer((req, res) => {
  
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {
      "Content-Type": "image/x-icon"
    })
    res.end()
    return
  }
  
  //Je vérifie la route demandée
  if(req.url === '/') {
    //Ensuite, je vérifie la methode
    if(req.method === 'GET') {
      try {
        const homePage = fs.readFileSync(path.join(viewPath, 'form.html'), {encoding: 'utf8'})
        res.writeHead(200, {
          "Content-Type": "text/html"
        })
        res.end(homePage)
      } catch(e) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        })
        res.end(e.message)
      }
    }
    
    return
  }
  
  res.writeHead(404, {
    "Content-Type" : "text/html"
  })
  const page404 = fs.readFileSync(path.join(viewPath, "404.html"), {encoding: "utf8"})
  res.end(page404)
})

server.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`)
})