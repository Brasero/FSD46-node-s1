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

// fs.readFile("./Data/students.json", {encoding: 'utf8'}, (err, data) => {
//   if (err) {
//     console.error(err)
//     process.exit(0)
//   }
//   console.log(data)
// })

let studentsText;
let students;

try {
  studentsText = fs.readFileSync("./Data/students.json", {encoding: 'utf8'})
  students = JSON.parse(studentsText)
} catch(e) {
  console.error(e)
  process.exit(0)
}

const more17 = [];


for (let student of students) {
  const cumul = student.notes.reduce((acc, curr) => acc + curr, 0)
  const moy = cumul / student.notes.length
  if (moy > 17) {
    more17.push(student.name)
  }
}

console.log(`Les éléves ayant une moyenne supérieure à 17 sont ${more17.join(", ")}`)
let bestStudent = null;

for (let student of students) {
  const cumul = student.notes.reduce((acc, curr) => acc + curr, 0)
  const moy = cumul / student.notes.length
  if (bestStudent && moy > bestStudent.moy) {
    bestStudent = {
      student,
      moy
    }
  } else {
    bestStudent = {
      student,
      moy
    }
  }
}

console.log(`L'éléve avec la meilleur moyenne est ${bestStudent.student.name} avec une moyenne de ${bestStudent.moy}`)

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

students.sort((a, b) => (a.notes.reduce((acc, curr) => acc + curr, 0) / a.notes.length) - (b.notes.reduce((acc, curr) => acc + curr, 0) / b.notes.length))

console.log(students)