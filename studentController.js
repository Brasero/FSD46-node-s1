import fs from 'node:fs';


const students = JSON.parse(fs.readFileSync('./Data/students.json', {encoding: 'utf8'}))

export const list = () => {
  const names = students.map(student => student.name)
  console.log(names.join('\n'))
}

export const find = (name) => {
  const student = students.find((student) => student.name.trim().toLowerCase() === name.trim().toLowerCase())
  if (!student) {
    console.log(`L'élève ${name} n'existe pas.`)
    return
  }
  console.table(student)
}

export const more = (num) => {
  const filterStudent =  students.filter(student => {
    return (student.notes.reduce((acc, curr) => acc + curr, 0) / student.notes.length) > num
  })
  
  console.table(filterStudent)
}

export const less = (num) => {
  const filterStudent =  students.filter(student => {
    return (student.notes.reduce((acc, curr) => acc + curr, 0) / student.notes.length) < num
  })
  
  console.table(filterStudent)
}

export const addNote = (name, note) => {
  const student = students.find(stud => stud.name.trim().toLowerCase() === name.trim().toLowerCase())
  const sanitizeNote = parseFloat(note.trim())
  
  if (!student) {
    console.log("L'élève "+ name + " n'existe pas")
    return
  }
  student.notes.push(sanitizeNote)
  console.log('Note ajoutée')
}

// exports.more = more // notation commonJS