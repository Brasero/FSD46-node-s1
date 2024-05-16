import pug from 'pug';
import path from 'node:path'

const viewPath = path.join(import.meta.dirname, 'src', 'view')

const template = `
if age >= 18
  h1 Accès autorisé
else
  h1 Accès non autorisé
`;

// const compileTemplate = pug.compile(template)
//
// console.log(compileTemplate({age: 17}))

// pug.render(template, { age : 19}, (err, data) => {
//   if (err) throw err;
//   console.log(data)
// })

// pug.renderFile(path.join(viewPath, "age.pug"), { age : 19 }, (err, data) => {
//   if (err) throw err;
//    console.log(data)
//  })

pug.renderFile(path.join(viewPath, "user.pug"), { user: {isAdmin: true} }, (err, data) => {
  if (err) throw err;
  console.log(data)
})

const compileFile = pug.compileFile(path.join(viewPath, "user.pug"))

console.log(compileFile({user: {isAdmin: true}}))