const fs = require('node:fs')

// fs.readFile("./Data/titanic.txt", {encoding: 'utf8'}, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// })

try {
  const data = fs.readFileSync('./Data/titanic.txt', {encoding: 'utf8'})
  console.log(data)
} catch(e) {
  console.error(e)
  process.exit(0);
}

fs.writeFile('./Data/data.txt', "Insertion simple", (err) => {
  if(err) {
    console.error(err)
    process.exit(0)
  }
  console.log("File saved !")
})

// fs.appendFile()