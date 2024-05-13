const fs = require('node:fs');

/*
* 02 Exercice read students
  Les données sont dans le dossier Data et dans le fichier student.txt
  
  1. Lisez le fichier à l'aide de la méthode asynchrone.
  1.(bis) Pour la suite, utilisez l'approche synchrone afin de récupérer les données que vous pourrez exploiter par la suite dans le script.
  
  2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 de moyenne strictement.
  
  3. Recherchez dans le tableau l'étudiant qui a eu la meilleur node.
  
  4. Récupérez les données dans un objet student, puis ajoutez chaque étudiant dans un tableau students.
  
  // { name : null, note : null, address : null}; // structure de l'objet
  const students = []; // tableau pour récupérer les données.
  
  5. Ordonnez maintenant l'ensemble des données dans le tableau.
* */
// Lecture du fichier de manière asynchrone
// fs.readFile("./Data/students.json", {encoding: 'utf8'}, (err, data) => {
//   if (err) {
//     console.error(err)
//     process.exit(0)
//   }
//   console.log(data)
// })

// Lecture du fichier de manière synchrone
// On déclare `studentsText` et `students` à l'avance afin que ces variables existent en dehors du bloc try & catch
// Dans tous les cas si jamais la lecture du fichier echoue le processus n'ira pas plus loin grâce à `process.exit()`
// située dans le catch

let studentsText;
let students = [];

try {
  studentsText = fs.readFileSync("./Data/students.json", {encoding: 'utf8'})
  students = JSON.parse(studentsText)
} catch(e) {
  console.error(e)
  process.exit(0)
}

// Si la lecture du fichier s'est bien passée on déclare un tableau `more17`
// déstiné à contenir le nom de tous les élèves ayant une moyenne strictement supérieure à 17

const more17 = [];

// On boucle sur tous les élèments du tableau students
for (let student of students) {
  // On calcule la moyenne de chaque étudiant
  const cumul = student.notes.reduce((acc, curr) => acc + curr, 0)
  const moy = cumul / student.notes.length
  // Si sa moyenne est supérieure à 17 on pousse son nom dans le tableau `more17`
  if (moy > 17) {
    more17.push(student.name)
  }
}

console.log(`Les éléves ayant une moyenne supérieure à 17 sont ${more17.join(", ")}`)

// La variable bestStudent sera déstinée à contenir les information du meilleur élève en fonction de sa moyenne
let bestStudent = null;

for (let student of students) {
  // on calcule la moyenne de l'élève
  const cumul = student.notes.reduce((acc, curr) => acc + curr, 0)
  const moy = cumul / student.notes.length
  
  // Si `bestStudent` contient quelque chose et que la moyenne de l'élève du tour de boucle est supérieure
  // à celle de l'élève enregistrée dans `bestStudent` alors on remplace ce dérnier par notre élève actuel
  if (bestStudent && moy > bestStudent.moy) {
    bestStudent = {
      student,
      moy
    }
  }
  // Sinon, `bestStudent` est donc vide, il suffit d'y enregistrer notre élève actuel
  else {
    bestStudent = {
      student,
      moy
    }
  }
}

console.log(`L'éléve avec la meilleur moyenne est ${bestStudent.student.name} avec une moyenne de ${bestStudent.moy}`)

// Meme logique que l'éxo du dessus, mais cette fois-ci, on cherche l'élève avec la meilleure note parmis toute
for (let student of students) {
  
  const bestNote = student.notes.reduce((acc, curr) => acc < curr ? curr : acc, 0)
  if (bestStudent && bestStudent.bestNote < bestNote) {
    bestStudent = {
      student,
      bestNote
    }
  } else {
    bestStudent = {
      student,
      bestNote
    }
  }
}

console.log(`L'élève avec la meilleur note est ${bestStudent.student.name} avec la note de ${bestStudent.bestNote}`)

// Pour le tri du tableau, on utilise la méthode sort(),
// cette dernière s'attend à recevoir une fonction représentant l'algorithme de tri que l'on souhaite utiliser.
// Voir doc MDN pour plus d'info sur les méthodes de tableau

students.sort((a, b) => (a.notes.reduce((acc, curr) => acc + curr, 0) / a.notes.length) - (b.notes.reduce((acc, curr) => acc + curr, 0) / b.notes.length))

console.log(students)

const newStudents = [
  {name: "Emma Johnson",notes: [16, 18, 17],address: "789 Maple Avenue, Toronto"},
  {name: "Diego Hernandez",notes: [14, 15, 16],address: "456 Avenida de la Constitución, Mexico City"}
];

const newArrayStudents = students.concat(newStudents);

async function saveFile(data) {
  await fs.writeFile('./Data/students.json', JSON.stringify(data), console.error)
  console.log('File saved !')
}

saveFile(newArrayStudents)

const studentsUppercased = newArrayStudents.map(student => {
  return {
    ...student,
    name: student.name.toUpperCase()
  }
})

saveFile(studentsUppercased)