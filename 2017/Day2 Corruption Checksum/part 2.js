const fs = require('fs')
let sum = 0

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err
  const rows = String.prototype.split.call(data, '\r\n')
  Array.prototype.forEach.call(rows, (row, index) => {
    const numbers = String.prototype.split.call(row, '\t')
    let found = false
    Array.prototype.forEach.call(numbers, (jNumber, j) => {
      jNumber = parseInt(jNumber)
      if (!found) {
        Array.prototype.forEach.call(numbers, (kNumber, k) => {
          kNumber = parseInt(kNumber)
          if (j !== k) {
            const bigger = jNumber >= kNumber ? jNumber : kNumber
            const smaller = jNumber <= kNumber ? jNumber : kNumber
            if (bigger % smaller === 0) {
              found = true
              sum += bigger / smaller
            }
          }
        })
      }
    })
  })
  console.log(sum)
})
