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
  
  
  /*
  * Pour gérer les redirections, il est possible de le faire grâce aux entêtes de réponse, voir ci-dessous
  *
  * res.writeHead(301, {
  *   "Location": "/"
  * })  // Le code 301 est un code HTTP qui définie que le server redirige l'utilisateur vers une autre page (301 moved permanently)
  * // Il sera toujours accompagné du header "Location" afin de renseigner l'url vers laquelle on souhaite rediriger
  * */
  
  // Lorsque l'on souhaite rendre du HTML il faut le préciser grace à l'entête "Content-Type" qui devra prendre la valeur
  // "text/html"
  res.writeHead(200, {
    "Content-Type": 'text/html'
  })
  res.end(`
    <html>
        <div>Hello</div>
    </html>
  `) // Utilisez des backtick pout rendre du html
})

// server.listen sert à lancer l'écoute du server sur un port précis (ici le 8080)
// la méthode liste s'attend à recevoir obligatoirement le port (8080), optionnellement le host (localhost) et une fonction
// de backlog qui sera executé lors du démarrage du server
server.listen(8080, 'localhost', () => {
  console.log(`Server listening at http://localhost:8080`)
})