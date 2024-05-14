export const extractArg = (text) => {
  const elem = text.split(' ')
  if (elem.length < 3) return elem[1];
  return elem[1] + ' ' + elem[2]
}

export const calcAverage = (notes) => {
  const cumul = notes.reduce((acc, curr) => acc + curr, 0)
  return cumul / notes.length
}

//exports.extract = extractArg // export nommé

/*
* module.exports = {
*   extractArg
* } // export par default
* */