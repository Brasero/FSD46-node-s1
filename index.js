import os from 'node:os';

process.stdin.on('data', (chunk) => {
  console.log(chunk.toString())
  process.exit()
})

process.stdout.write("coucou")