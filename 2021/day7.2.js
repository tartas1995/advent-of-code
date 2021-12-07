const fs = require('fs')
const content = fs.readFileSync('./day7.txt',{encoding:'utf8', flag:'r'})
const numbers = content.split(',').map((v) => {
    return parseInt(v)
})

let lowestPosition = null
let highestPosition = null

for (let n of numbers) {
    if (lowestPosition===null) {
        lowestPosition = n
    } else if (n < lowestPosition) {
        lowestPosition = n
    }
    if (highestPosition===null) {
        highestPosition = n
    } else if (n > highestPosition) {
        highestPosition = n
    }
}

let leastFuel = null
let position = null
for (let ii = lowestPosition; ii < highestPosition; ii++) {
    let fuel = 0
    for (let n of numbers) {
        let diff = Math.abs(n-ii)
        /**
         * (n*(n+1))/2 is the same as
         * 1+2+3+4+...+n 
         */
        fuel += (diff*(diff+1))/2 
    }
    if (leastFuel === null) {
        leastFuel = fuel
        position = ii
    } else if (fuel < leastFuel) {
        leastFuel = fuel
        position = ii
    }
}

console.log('position:', position)
console.log('least Fuel:', leastFuel)