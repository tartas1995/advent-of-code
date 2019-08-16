const fs = require('fs')
let sum = 0

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err
  const numbers = String.prototype.split.call(data, '')
  const step = numbers.length / 2
  Array.prototype.forEach.call(numbers, (number, index) => {
    const nextIndex = (index + step) % numbers.length
    const nextNumber = numbers[nextIndex]
    if (nextNumber === number) {
      sum += parseInt(number)
    }
  })
  console.log(sum)
})
