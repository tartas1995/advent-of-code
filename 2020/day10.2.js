const fs = require('fs')
const content = fs.readFileSync('./day10.txt',{encoding:'utf8', flag:'r'})

const regex = /(\d+)/g

let nbrs = content.match(regex).map(e => parseInt(e)).sort((a,b) => {
    if (a === b)return 0
    if (a > b)return 1
    if (a < b)return -1
})

nbrs.unshift(0)
nbrs.push(nbrs[nbrs.length - 1] + 3)

let chunks = [];

let lastN = 0
let currentChunk = [];
for (let n of nbrs) {
    if (n - lastN !== 3) {
        if (currentChunk.length) chunks.push(currentChunk)
        currentChunk = []
    }
    currentChunk.push(n)
    lastN = n
}
chunks.push(currentChunk)

let nbrOfArrangements = 0

for (let ii = 0; ii < chunks.length; ii++) {
    const ch = chunks[ii]
    console.log('-------------------')
    console.log('current node', ch)
    console.log('-------------------')
    let fp = 0
    for (let jj = ii+1; jj < ii+4 && jj < chunks.length; jj++) {
        const nc = chunks[jj]
        console.log(nc)
        if (nc.length === 1) fp++
        else {
            fp++
            break;
        }
    }
    console.log(fp)
    console.log('-------------------')
    if (fp > 1) nbrOfArrangements += fp
}

console.log(chunks)
console.log(nbrOfArrangements)

// calculate the number of possible arrangement to connect your phone with
// the output in the chair
// 133 is too low

/**
 * chair preduces wrong jolts
 * output of joltage adapter as input
 * adapter accepts upto -3 to produce output
 * build-in adapter output is 3 higher than the hightest adapter in your bag
 * chair output is 0
 */

