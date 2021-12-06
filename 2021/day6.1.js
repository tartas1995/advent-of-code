const fs = require('fs')
const content = fs.readFileSync('./day6.txt',{encoding:'utf8', flag:'r'})
const numbers = content.split(',').map((v) => {
    return parseInt(v)
})

const untilDay = 80
let day = 0

while (day < untilDay) {
    for (let index in numbers) {
        numbers[index]--
        if (numbers[index] < 0) {
            numbers.push(8)
            numbers[index] = 6
        }
    }
    day++
}

console.log(numbers.length)