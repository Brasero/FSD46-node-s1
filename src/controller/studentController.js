import fs from 'node:fs';
import path from 'node:path'
import url from 'node:path'
import {calcAverage} from "../utils/utils.js";
import dotenv from "dotenv"
dotenv.config()

const cwd = process.cwd()
const studentFilePath = path.join(cwd, 'src', 'Data', 'students.json')

const {APP_AB, APP_TB, APP_B, APP_P} = process.env



let students = JSON.parse(fs.readFileSync(studentFilePath, {encoding: 'utf8'}))

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

export const mention = (name) => {
  const student = students.find(stud => stud.name.trim().toLowerCase() === name.trim().toLowerCase())
  
  if (!student) {
    console.log(`L'étudiant ${name} n'existe pas.`)
    return
  }
  
  const average = calcAverage(student.notes)
  let mention;
  
  console.log(average)
  
  if (average < 12) {
    student.mention = APP_P
    mention = APP_P
  } else if (average >= 12 && average < 14) {
    student.mention = APP_AB
    mention = APP_AB
  } else if (average >= 14 && average < 16) {
    student.mention = APP_B
    mention = APP_B
  } else {
    student.mention = APP_TB
    mention = APP_TB
  }
  
  students = students.map(stud => {
    if (stud.name === student.name) {
      return student
    }
    return stud
  })
  console.log(`Mention ${mention} attribuée`)
  return students
}

export const saveFile =  () => {
  console.log(students)
  fs.writeFileSync(studentFilePath, JSON.stringify(students, null, 2))
  console.log('Fichier enregistré')
  
}

// exports.more = more // notation commonJS