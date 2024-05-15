import path from 'node:path'
import fs from 'node:fs'

const cwd = process.cwd()
class Chifoumi {
  
  constructor({rock, sheet, scissor}) {
    this.filePath = path.join(cwd, 'src', 'Data', 'chifoumi.json')
    this.rock = rock
    this.sheet = sheet
    this.scissor = scissor
    this.storedGame = []
    let stats;
    try {
      const fileString = fs.readFileSync(this.filePath, {encoding: 'utf8'})
      stats = JSON.parse(fileString)
    } catch(e) {
      stats = {
        game: {
          qte: 0,
          j1: 0,
          j2: 0,
          equality: 0
        },
        manche: {
          qte: 0,
          j1: 0,
          j2: 0,
          equality: 0
        }
      }
    }
    this.stats = stats
  }
  
  getRandomSigne () {
    const signes = [this.rock, this.scissor, this.sheet]
    return [
      signes[Math.floor(Math.random() * signes.length)],
      signes[Math.floor(Math.random() * signes.length)]
    ]
  }
  
  run(time) {
    this.stats.game.qte++
    const game = {
      winner: null,
      history: []
    }
    
    for (let mancheNb = 0; mancheNb < time; mancheNb++) {
      this.stats.manche.qte++
      const manche = {
        nb: mancheNb + 1,
        winner: null
      }
      const [signe1, signe2] = this.getRandomSigne()
      console.log(`Manche n ${mancheNb+1}, J1 : ${signe1} vs J2 : ${signe2}`)
      const winner = this.getWinner(signe1, signe2)
      
      if(!winner) {
        console.log("égalité")
        this.stats.manche.equality++
      } else {
        console.log(`Le joueur ${winner} à gagné la manche`)
        this.stats.manche[`j${winner}`]++
        manche.winner = winner
      }
      game.history.push(manche)
    }
    this.getGameWinner(game.history)
    
    this.storedGame.push(game)
  }
  getWinner(signe1, signe2) {
    if (signe1 === signe2) {
      return null;
    }
    
    switch(signe1) {
      case this.rock:
        return signe2 === this.sheet ? 2 : 1
      
      case this.sheet:
        return signe2 === this.scissor ? 2 : 1
      
      case this.scissor:
        return signe2 === this.rock ? 2 : 1
    }
  }
  
  getGameWinner(manches) {
    const winners = manches.reduce((acc, curr) => {
      if(curr.winner) {
        acc[`j${curr.winner}`]++
      }
      return acc
    }, {
      j1: 0,
      j2: 0
    })
    if (winners.j1 === winners.j2) {
      console.log("La partie s'est soldé par un match nul")
      this.stats.game.equality++
    } else if (winners.j1 > winners.j2) {
      console.log("Le joueur 1 à gagné la partie avec " + winners.j1 + " points")
      this.stats.game.j1++
    } else {
      console.log("Le joueur 2 à gagné la partie avec " + winners.j2 + " points")
      this.stats.game.j2++
    }
  }
  
  displayStats () {
    const {game, manche} = this.stats
    console.group("Statistique des parties")
      console.log(`Nombre de partie jouée : ${game.qte}`)
      console.log(`Nombre de partie gagnée par J1 : ${game.j1}`)
      console.log(`Nombre de partie gagnée par J2 : ${game.j2}`)
      console.log(`Nombre de partie nul : ${game.equality}`)
      console.group("Statistique des manches")
        console.log(`Nombre de manche jouée : ${manche.qte}`)
        console.log(`Nombre de manche gagnée par J1 : ${manche.j1}`)
        console.log(`Nombre de manche gagnée par J2 : ${manche.j2}`)
        console.log(`Nombre de manche nul : ${manche.equality}`)
      console.groupEnd()
    console.groupEnd()
  }
  
  
  reset() {
    this.stats =  {
      game: {
        qte: 0,
        j1: 0,
        j2: 0,
        equality: 0
      },
      manche: {
        qte: 0,
        j1: 0,
        j2: 0,
        equality: 0
      }
    }
  }
  
  savedFile() {
    const statString = JSON.stringify(this.stats, null, 2)
    fs.writeFileSync(this.filePath, statString)
    console.log("Statistique sauvegardées")
  }
}

export default Chifoumi