import dotenv from 'dotenv'
import readline from "readline";
import Chifoumi from "./src/utils/Chifoumi.js";
dotenv.config()

const {APP_ROCK, APP_SCISSOR, APP_SHEET} = process.env

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const game = new Chifoumi({rock:APP_ROCK, sheet:APP_SHEET, scissor:APP_SCISSOR})

const commands = {
  start: {
    name: 'start <number>',
    description: "Lance une partie de x manches"
  },
  stats: {
    name: 'stats',
    description: "Affiche les statistiques enregistrées"
  },
  reset: {
    name: 'reset',
    description: "Réinitialise les statistique de parties jouées"
  },
  quit: {
    name: 'quit',
    description: "Arrête le jeu."
  }
}


rl.setPrompt("CHIFOUMI> ")
rl.prompt()

rl.on('line', (line) => {

  switch(line) {
    
    case line.match(/^start /) ? line : null :
      game.run(line.split(" ")[1])
      break;
      
    case commands.stats.name:
      game.displayStats()
      break;
      
    case commands.reset.name:
      game.reset()
      break;
      
    case commands.quit.name:
      game.savedFile()
      rl.close()
      break;
  }
  
  rl.prompt()
  
}).on("close", () => {
  console.log('Au revoir!')
  process.exit(0)
})