const fs = require('fs')
const content = fs.readFileSync('./day1.txt',{encoding:'utf8', flag:'r'})


insts = content.split('')

let startingPoint = 0

let manualBreak = 5

for (let ii in insts) {
    const inst = insts[ii]
    if (inst === '(') startingPoint++
    if (inst === ')') startingPoint--
    console.log(ii, startingPoint, inst)
    if (startingPoint === -1) {
        console.log(parseInt(ii) + 1)
        break
    }
    //if (ii > manualBreak) break
}