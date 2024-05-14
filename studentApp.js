import {extractArg} from "./utils.js"
import {list, more, find} from "./studentController.js";

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