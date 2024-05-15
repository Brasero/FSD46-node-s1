import fs from 'node:fs'
import path from "node:path";
const dataPath = path.join(process.cwd(), 'src', 'Data')

const dataArray = [
  'Alan',
  'Alice',
  "Antoine",
  "Bernard",
  "Clarisse",
  "Sonia",
  "Sophie"
]
const all = {
  student: []
}
dataArray.forEach(name => {
  const data = JSON.parse(fs.readFileSync(path.join(dataPath, `${name}.json`), {encoding: 'utf8'}))
  all.student.push(data)
})

fs.writeFile(path.join(dataPath, 'all.json'), JSON.stringify(all, null, 2), () => {
  console.log('Done')
})