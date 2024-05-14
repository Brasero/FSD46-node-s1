import dotenv from 'dotenv'
import readline from "node:readline";
import {extractArg} from "./utils.js";
import {list, more, find, less, addNote} from "./studentController.js";
// dotenv.config() défini les variable d'environnement disponible dans `process.env`
// Il est possible de lui passer en argument un objet d'options, parmis elles, on retrouve
// l'option `path` permettant de préciser le chemin du ou des fichiers d'environnement
// si jamais ils ne sont pas placé à un endroit prévisible par dotenv
dotenv.config(/*{
  path: './.env.prod'
}*/)


const commands = [
  {
    name: "list",
    description: "Liste tout les élèves."
  },
  {
    name: "find <string>",
    description: "Cherche puis affiche les infos d'un élève si il existe."
  },
  {
    name: "more <number>",
    description: "Filtre les élèves en fonction de leur moyenne"
  },
  {
    name: "quit",
    description: "Met fin à l'éxecution du programme"
  },
  {
    name: "less <number>",
    description: "Filtre les élèves en fonction de leur moyenne"
  },
  {
    name: "addNote",
    description: "Ajoute une note à un élève"
  }
]

// readline.createInterface permet de créer une interface utilisateur
// ici ont défini une interface en invite de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// rl.setPrompt() défini le message de l'invite de commande
rl.setPrompt('STUDENT> ')
// rl.prompt() affiche le message défini ci dessus
rl.prompt()

// rl.question() permet de posez une question et de définir une fonction déstinée à traiter
// la réponse de l'utilisateur
// rl.question("qui etes vous ?", (answer) => {
//   console.log(answer)
//   // rl.close() arrête l'éxecution en cours
//   rl.close()
// })

// rl.on() permet de placer un listener sur un évènement particulier
// l'évènement `line` est déclenché lorsque l'utilisateur valide une saisie dans l'invite de commande
// en tapant `entrée`
rl.on('line', (line) => {
  
  if (line.trim() === 'quit') {
    rl.close()
  }
  
  switch (line) {
    case 'list':
      list()
      break;
      
    case line.match(/^find /) ? line : null :
      find(extractArg(line))
      break
    
    case line.match(/^more /) ? line : null :
      more(extractArg(line))
      break
    
    case line.match(/^less /) ? line : null :
      less(extractArg(line))
      break
    
    case 'addNote':
      rl.question("A qui souhaitez vous ajouter une note ? ", (name) => {
        rl.question("Quel note àjouter à "+name, (note) => {
          addNote(name, note)
          rl.prompt()
        })
      })
      break;
    
    default:
      console.group('Commande inconnue')
        console.log('Liste des commandes')
        console.table(commands, ['name', 'description'])
      console.groupEnd()
      break
  }
  rl.prompt()
})
  // l'évènement `close` est déclenché lors de l'arrêt du processus en cours
  .on('close', () => {
  console.log('Bye')
  process.exit();
})