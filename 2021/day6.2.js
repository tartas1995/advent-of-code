const fs = require('fs')
const content = fs.readFileSync('./day6.txt',{encoding:'utf8', flag:'r'})
const numbers = content.split(',').map((v) => {
    return parseInt(v)
})

const untilDay = 256
let day = 0

let fishPerDay = [0,0,0,0,0,0,0,0,0]

for (let n of numbers) {
    fishPerDay[n]++
}

console.log(fishPerDay)

while (day < untilDay) {
    let futureDay = [0,0,0,0,0,0,0,0,0]
    for (let index in fishPerDay) {
        if (index == 0) {
            futureDay[8] = fishPerDay[index]
            futureDay[6] = fishPerDay[index]
        } else {
            futureDay[index-1] += fishPerDay[index]
        }
    }
    fishPerDay = futureDay
    day++
}
console.log(fishPerDay)

let sum = 0
for (let n of fishPerDay) {
    sum += n
}

console.log(sum)