import dotenv from 'dotenv'
import readline from "node:readline";
dotenv.config(/*{
  path: './.env.prod'
}*/)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.setPrompt('STUDENT> ')
rl.prompt()

// rl.question("qui etes vous ?", (answer) => {
//   console.log(answer)
//
//   rl.close()
// })

rl.on('line', (line) => {
  console.log('j ai entendu ' + line)
  rl.prompt()
}).on('close', () => {
  console.log('Bye')
  process.exit();
})