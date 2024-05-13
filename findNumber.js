let count = 0;
const search = Math.floor(Math.random() * 100)

console.log("Devinez un chiffre entre 0 et 100")

process.stdin.on('data', (chunk) => {
  const number = parseInt(chunk);
  count++;
  
  if (isNaN(number)) {
    console.log("Merci de saisir une valeur numérique");
    return
  }
  
  if (count > 10) {
    console.log("Perdu vous avez dépassé le nombre d'éssai ")
    process.exit(0);
  }
  
  if (number > search) {
    console.log("Le chiffre rechérché est plus petit")
  } else if (number < search) {
    console.log("Le chiffre rechérché est plus grand")
  } else {
    console.log(`Vous avez gagné en ${count} essais`)
    process.exit(0);
  }
  
})