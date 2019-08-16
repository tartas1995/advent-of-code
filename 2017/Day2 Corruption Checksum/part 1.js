const fs = require('fs')
let sum = 0

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err
  const rows = String.prototype.split.call(data, '\r\n')
  Array.prototype.forEach.call(rows, (row, index) => {
    const numbers = String.prototype.split.call(row, '\t')
    let lowest = null
    let highest = null
    Array.prototype.forEach.call(numbers, (number) => {
      number = parseInt(number)
      if (lowest == null) lowest = number
      if (highest == null) highest = number
      if (lowest > number) lowest = number
      if (highest < number) highest = number
    })
    const difference = highest - lowest
    sum += difference
  })
  console.log(sum)
})
