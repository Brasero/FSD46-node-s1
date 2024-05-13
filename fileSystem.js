const fs = require('node:fs')

// readFile et readFileSync permettent tous les deux de lire le contenu d'un fichier,
// la premiere de manière asynchrone, et la seconde de manière synchrone.
// readFile s'attend à recevoir :
// Le chemin du fichier à lire
// Un objet d'option (optionnel) {encoding: 'utf8'} -> permet de récupérer une string au lieu d'un Buffer
// Une fonction de callback, qui sera appelée lorsque le fichier a été lu en entier et qui elle même prend en attributs "err" et "data"
// "err" sera différent de null si une erreur s'est produite lors de la lecture du fichier
// si la lecture s'est déroulé sans souci alors le resultat se trouvera dans "data"

// fs.readFile("./Data/titanic.txt", {encoding: 'utf8'}, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// })


// Dans sa version synchrone readFileSync() devra être wrapper par un try & catch afin de catcher l'erreur générer en cas de problem.
try {
  const data = fs.readFileSync('./Data/titanic.txt', {encoding: 'utf8'})
  console.log(data)
} catch(e) {
  console.error(e)
  process.exit(0);
}

// La méthode "writeFile" permet d'écrire dans un fichier de manière asynchrone.
// Elle s'attend à recevoir le chemin du fichier dans lequel écrire (le créera s'il n'existe pas)
// Les données à insérer.
// Une fonction de callback qui sera appelée en cas d'erreur.
// writeFile existe aussi en version synchrone : writeFileSync
// /!\ writeFile écrase le contenu existant du fichier /!\
// Pour insérer du contenu à la suite de celui qui existe déjà, utilisez la méthode appendFile()
fs.writeFile('./Data/data.txt', "Insertion simple", (err) => {
  if(err) {
    console.error(err)
    process.exit(0)
  }
  console.log("File saved !")
})