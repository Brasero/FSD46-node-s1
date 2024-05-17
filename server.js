import http from 'node:http'
import pug from 'pug'
import {join} from 'node:path'
import dotenv from 'dotenv'
import fs from 'node:fs'
import querystring from "querystring";
dotenv.config()

const viewPath = join(import.meta.dirname, "view")
const dataPath = join(import.meta.dirname, 'Data')
const assetsPath = join(import.meta.dirname, "assets")




const toast = {
  statut: null,
  message: null
}

const server = http.createServer((req, res) => {
  toast.statut = null
  toast.message = null
  const throwCompilationError = (fileName) => {
    res.writeHeader(500, {
      "Content-Type" : "text/plain"
    })
    res.end(`
      Internal server error.
      ${APP_ENV === 'development' && `Une erreur s'est produite lors de la compilation du fichier ${fileName}.pug`}
    `)
  }
  
  const writeSuccessHeader = (mimeType) => {
    res.writeHead(200, {
      "Content-Type" : mimeType
    })
  }
  
  const url = req.url
  if (url === '/favicon.ico') {
    res.writeHead(200, {
      "Content-Type" : "image/x-icon"
    })
    return res.end()
  }
  
  if (url.match(/^\/styles\//)) {
    const styleSheetName = url.split('/').pop()
    const styleSheet = fs.readFileSync(join(assetsPath, 'css', `${styleSheetName}.css`), {encoding: 'utf8'});
    writeSuccessHeader("text/css")
    return res.end(styleSheet);
  }
  
  if (url === '/') {
    if(req.method === 'GET') {
      pug.renderFile(join(viewPath, "home.pug"), {toast}, (err, page) => {
        if (err) {
          throwCompilationError('home')
          return
        }
        writeSuccessHeader('text/html')
        res.end(page)
      })
    }
    
    if (req.method === 'POST') {
      let body = "";
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on("end", () => {
        const data = querystring.parse(body)
        if (!data.name || !data.birthdate) {
          res.writeHead(400, {
            "Content-Type": "text/html"
          })
          toast.statut = 'error'
          toast.message = "Please, fill all inputs"
          pug.renderFile(join(viewPath, 'home.pug'), {toast}, (err, page) => {
            if (err) {
              throwCompilationError('home')
              return
            }
            res.end(page)
          })
        } else {
          const students = JSON.parse(fs.readFileSync(join(dataPath, 'all.json'), {encoding: "UTF-8"}))
          const name = data.name.trim()
          const birth = data.birthdate
          students.push({name, birth})
          fs.writeFileSync(join(dataPath, `${name.replace(" ", "")}.json`), JSON.stringify({name, birth}, null, 2))
          fs.writeFileSync(join(dataPath, "all.json"), JSON.stringify(students, null, 2))
          toast.statut = "success"
          toast.message = "Student added successfully"
          pug.renderFile(join(viewPath, "home.pug"), {toast}, (err, page) => {
            if (err) {
              throwCompilationError('home')
              return
            }
            writeSuccessHeader('text/html')
            res.end(page)
          })
        }
      })
    }
    return
  }
  
  if (url === '/users') {
    const students = JSON.parse(fs.readFileSync(join(dataPath, "all.json"), {encoding: "UTF-8"}))
    pug.renderFile(join(viewPath, "users.pug"), {students}, (err, page) => {
      if (err) {
        throwCompilationError('users')
        return
      }
      writeSuccessHeader("text/html")
      res.end(page)
    })
    return
  }
  
  if (url.match(/^\/delete\//)) {
    const name = url.split('/').pop()
    const students = JSON.parse(fs.readFileSync(join(dataPath, "all.json"), {encoding: "UTF-8"}))
    const studentUpdated = students.filter(student => student.name !== name)
    try {
      fs.unlinkSync(join(dataPath, `${name}.json`))
    } catch(e) {
      throwCompilationError('user')
      return
    }
    fs.writeFileSync(join(dataPath, "all.json"), JSON.stringify(studentUpdated, null, 2))
    toast.statut = "success"
    toast.message = "Student deleted"
    pug.renderFile(join(viewPath, "users.pug"), {toast, students: studentUpdated}, (err, page) => {
      if (err) {
        throwCompilationError("users")
        return
      }
      writeSuccessHeader('text/html')
      res.end(page)
    })
    return
  }
  
  
  pug.renderFile(join(viewPath, "404.pug"), {}, (err, page) => {
    if (err) {
      throwCompilationError('404')
    }
    res.writeHead(404, {
      "Content-Type" : "text/html"
    })
    res.end(page)
  })
})

const {APP_ENV, APP_HOST, APP_PORT} = process.env

server.listen(APP_PORT, APP_HOST, () => {
  if (APP_ENV === 'development') {
    console.log(`Listening at http://${APP_HOST}:${APP_PORT}`)
  }
})