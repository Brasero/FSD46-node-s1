const fs = require('node:fs')

const commands = [
  {
    name: "list",
    description: "Liste tout les élèves."
  },
  {
    name: 'find <string>',
    description: "Cherche puis affiche les infos d'un élève si il existe."
  },
  {
    name: 'more <number>',
    description: "Filtre les élèves en fonction de leur moyenne"
  }
]


process.stdin.on("data", (chunk) => {
  const data = chunk.toString()
  const text = data.replace("\r?\n", '')
})