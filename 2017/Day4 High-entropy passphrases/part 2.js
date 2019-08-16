const fs = require('fs')
let counter = 0

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err
  const rows = String.prototype.split.call(data, '\r\n')
  Array.prototype.forEach.call(rows, (row) => {
    const words = String.prototype.split.call(row, ' ')
    const wordsLength = words.length
    if (wordsLength > 1) {
      const letterSets = []
      Array.prototype.forEach.call(words, (word) => {
        const letters = String.prototype.split.call(word, '')
        let object = {}
        Array.prototype.forEach.call(letters, (letter) => {
          if (object[letter] === undefined) {
            object = { ...object, [letter]: 1 }
          } else {
            object[letter]++
          }
        })
        letterSets.push(object)
      })
      let validLetterSetsCounter = 0
      Array.prototype.forEach.call(letterSets, (jSet, j) => {
        let valid = true
        Array.prototype.forEach.call(letterSets, (kSet, k) => {
          if (j !== k) {
            let differenceFound = false
            const keys = Object.keys(jSet).length > Object.keys(kSet).length ? Object.keys(jSet) : Object.keys(kSet)
            Array.prototype.forEach.call(keys, (key) => {
              if (kSet[key] === undefined || jSet[key] !== kSet[key]) {
                differenceFound = true
              }
            })
            if (!differenceFound) {
              valid = false
            }
          }
        })
        if (valid) {
          validLetterSetsCounter++
        }
      })
      if (validLetterSetsCounter === wordsLength) {
        counter++
      }
    }
  })
  console.log(counter)
})
