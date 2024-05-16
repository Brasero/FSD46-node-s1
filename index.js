import http from "node:http"
// Décomposition de l'objet `path`, je ne récupère que la fonction `join`
import {join} from "node:path";
import fs from "fs";
import pug from 'pug'
import dotenv from 'dotenv'

dotenv.config()

const viewPath = join(import.meta.dirname, 'src', 'view')
const assetsPath = join(import.meta.dirname, "src", 'assets')

const menuItems = [
  {path: '/', title: 'Home', isActive: true},
  {path: '/about-me', title: 'About', isActive: false},
  {path: '/references', title: 'References', isActive: false},
  {path: '/contact-me', title: 'Contact', isActive: false}
];

const server = http.createServer((req, res) => {
  
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {
      "Content-Type": "image/x-icon"
    })
    return res.end()
  }
  
  if (req.url === "/bootstrap") {
    const bootstrap = fs.readFileSync(join(assetsPath, 'bootstrap.min.css'), {encoding: 'utf8'})
    res.writeHead(200, {
      "Content-Type": "text/css"
    })
    return res.end(bootstrap)
  }
  
  if (req.url === '/') {
    
    pug.renderFile(join(viewPath, 'home.pug'), {menuItems}, (err, page) => {
      if (err) {
        return res.end(err.message)
      }
      res.writeHead(200, {
        "Content-Type": "text/html"
      })
      res.end(page)
    })
    
    return
  }
  
  res.writeHead(404, {
    "Content-Type": "text/html"
  })
  res.end('Not found')
})

//On récupére l'host et le port à partir des variables d'environnements

const {APP_PORT, APP_HOST} = process.env

server.listen(APP_PORT, APP_HOST, () => {
  console.log(`Listening at http://${APP_HOST}:${APP_PORT}`)
})