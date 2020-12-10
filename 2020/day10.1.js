const fs = require('fs')
const content = fs.readFileSync('./day10.txt',{encoding:'utf8', flag:'r'})

const regex = /(\d+)/g

let nbrs = content.match(regex).map(e => parseInt(e)).sort((a,b) => {
    if (a === b)return 0
    if (a > b)return 1
    if (a < b)return -1
})

let difference = {
    0:0,
    1:0,
    2:0,
    3:1 //bc last jump to build-in adapter
}

let lastN = 0
for (let n of nbrs) {
    difference[n - lastN]++
    lastN = n
}

console.log(difference)
console.log(difference[1] * difference[3])

//1820 is too low

/**
 * chair preduces wrong jolts
 * output of joltage adapter as input
 * adapter accepts upto -3 to produce output
 * build-in adapter output is 3 higher than the hightest adapter in your bag
 * chair output is 0
 */

