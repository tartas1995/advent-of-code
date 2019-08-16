const fs = require('fs')
let counter = 0

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err
  const rows = String.prototype.split.call(data, '\r\n')
  Array.prototype.forEach.call(rows, (row) => {
    const words = String.prototype.split.call(row, ' ')
    if (words.length > 1) {
      const set = new Set(words)
      if (set.size === words.length) {
        counter++
      }
    }
  })
  console.log(counter)
})
