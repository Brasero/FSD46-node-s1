import dotenv from 'dotenv'
import readline from "node:readline";
// dotenv.config() défini les variable d'environnement disponible dans `process.env`
dotenv.config(/*{
  path: './.env.prod'
}*/)

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

// rl.question() permet de posez une question et de définir une fonction déstinée à traiter la réponse de l'utilisateur
// rl.question("qui etes vous ?", (answer) => {
//   console.log(answer)
//   // rl.close() arrête l'éxecution en cours
//   rl.close()
// })

// rl.on() permet de placer un listener sur un évènement particulier
// l'évènement `line` est déclenché lorsque l'utilisateur valide une saisie dans l'invite de commande en tapant `entrée`
rl.on('line', (line) => {
  console.log('j ai entendu ' + line)
  rl.prompt()
})
  // l'évènement `close` est déclenché lors de l'arrêt du processus en cours
  .on('close', () => {
  console.log('Bye')
  process.exit();
})