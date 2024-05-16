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


// pug.renderFile(path.join(viewPath, "nav.pug"), {}, (err, data) => {
//   if (err) throw err;
//   console.log(data)
// })

const compileNav = pug.compileFile(path.join(viewPath, "nav.pug"), {pretty: true})
//Pour avoir un rendu du html
// indenté il faut passer par compile ou compileFile et passé en option la propriété `pretty` avec la valeur `true`

const compileForm = pug.compileFile(path.join(viewPath, "formpug.pug"), {pretty: true})

console.log(compileForm({user: {age: 19}}))