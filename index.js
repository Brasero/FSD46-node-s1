import http from 'node:http'
import path from 'node:path'
import fs from "node:fs";
import querystring from "node:querystring";
import pug from "pug"

const port = 8080;
const host = "localhost";

const viewPath = path.join(import.meta.dirname, 'src', 'view') //Chemin absolu vers le dossier de vues
const dataPath = path.join(import.meta.dirname, 'src', 'Data') //Chemin absolu vers le dossier de Data
const assetsPath = path.join(import.meta.dirname, "src", "assets")

const server = http.createServer((req, res) => {
  
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {
      "Content-Type": "image/x-icon"
    })
    res.end()
    return
  }
  
  // Permet de fournir une feuille de style.
  if (req.url === "/bootstrap") {
    const css = fs.readFileSync(path.join(assetsPath, "bootstrap.min.css"), {encoding: "utf8"})
    res.writeHead(200, {
      "Content-Type": "text/css"
    })
    return res.end(css)
  }
  
  //Je vérifie la route demandée
  if(req.url === '/') {
    //Ensuite, je vérifie la methode
    if(req.method === 'GET') {
      pug.renderFile(path.join(viewPath, "formpug.pug"), {user: {age: 19}}, (err, homePage) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/plain"
          })
          res.end(err.message)
        }
        
        res.writeHead(200, {
          "Content-Type": "text/html"
        })
        res.end(homePage)
      })
    } // Fin de traitement de la methode GET
    
    if(req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString()
      })
      req.on("end", () => {
        const newStudent = querystring.parse(body)
        const notesArray = newStudent.notes.split(',')
        const notes = notesArray.map(note => parseInt(note.replace(" ", "")))
        if (notes.includes(NaN)) {
          res.writeHead(500, {
            "Content-Type": "text/plain"
          })
          return res.end("Merci de ne saisir que des valeurs numérique pour les notes, séparée d'une virgule")
        }
        newStudent.name = newStudent.name.replace(" ", "")
        newStudent.notes = notes;
        const fileName = `${newStudent.name.toLowerCase()}.json`;
        //Creation du fichier json pour newStudent
        fs.writeFile(path.join(dataPath, fileName), JSON.stringify(newStudent, null, 2), (err) => {
          if (err) {
            res.writeHead(500, {
              "Content-Type": "text/plain"
            })
            res.end(err.message)
            return
          }
          
          const all = JSON.parse(fs.readFileSync(path.join(dataPath, "all.json"), {encoding: 'utf8'}))
          all.student.push(newStudent)
          fs.writeFileSync(path.join(dataPath, "all.json"), JSON.stringify(all, null, 2))
          
          res.writeHead(301, {
            "Location": "/"
          })
          res.end()
        })
      })
    }
    
    return
  }
  
  if (req.url === '/users') {
    let html;
    const all = fs.readFileSync(path.join(dataPath, "all.json"), {encoding: "utf8"})
    const {student} = JSON.parse(all)
    
    pug.renderFile(path.join(viewPath, 'users.pug'), {students: student}, (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        })
        return res.end(err.message)
      }
      
      res.writeHead(200, {
        "Content-Type": "text/html"
      })
      return res.end(data)
    })
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