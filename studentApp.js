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

const extractArg = (text) => {
  const elem = text.split(' ')
  if (elem.length < 3) return elem[1];
  return elem[1] + ' ' + elem[2]
}

const students = JSON.parse(fs.readFileSync('./Data/students.json', {encoding: 'utf8'}))

const list = () => {
  const names = students.map(student => student.name)
  console.log(names.join('\n'))
}

const find = (name) => {
  const student = students.find((student) => student.name.trim().toLowerCase() === name.trim().toLowerCase())
  if (!student) {
    console.log(`L'élève ${name} n'existe pas.`)
    return
  }
  console.table(student)
}

const more = (num) => {
  const filterStudent =  students.filter(student => {
    return (student.notes.reduce((acc, curr) => acc + curr, 0) / student.notes.length) > num
  })
  
  console.table(filterStudent)
}

process.stdin.on("data", (chunk) => {
  const data = chunk.toString()
  const text = data.replace("\r\n", '')
  let arg;
  
  switch (text) {
    
    case 'list':
      list()
      return
    
    case text.match(/^find /) ? text : null :
      arg = extractArg(text)
      find(arg)
      return
    
    case text.match(/^more /) ? text : null:
      arg = extractArg(text)
      more(arg)
      return
    
    default:
      console.group('Commande inconnu, voici la liste des commandes')
        console.table(commands)
      console.groupEnd()
  }
})