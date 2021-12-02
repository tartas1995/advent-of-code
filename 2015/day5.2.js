const fs = require('fs')
const content = fs.readFileSync('./day5.txt',{encoding:'utf8', flag:'r'})

const strings = content.split("\n");

const xxyxxRegr = /(.{2}).*\1/g
const xyxRegr = /(.).\1/g

let nbrOfNiceStrings = 0

for (const string of strings) {
    let nbrOf1 = [...string.matchAll(xxyxxRegr)].length
    let nbrOf2 = [...string.matchAll(xyxRegr)].length
    if (nbrOf1 >=1 && nbrOf2 >=1) {
        nbrOfNiceStrings++
    }
}

console.log(nbrOfNiceStrings)