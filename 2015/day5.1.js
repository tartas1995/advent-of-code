const fs = require('fs')
const content = fs.readFileSync('./day5.txt',{encoding:'utf8', flag:'r'})

const strings = content.split("\n");

const vowelRegr = /[aeiou]/g
const bannedRegr = /ab|cd|pq|xy/g
const repetitionRegr = /(.)\1/g

let nbrOfNiceStrings = 0

for (const string of strings) {
    let nbrOfVowels = [...string.matchAll(vowelRegr)].length
    let nbrOfBanned = [...string.matchAll(bannedRegr)].length
    let nbrOfRepetition = [...string.matchAll(repetitionRegr)].length
    if (nbrOfVowels >=3 && nbrOfRepetition >=1 && nbrOfBanned === 0) {
        nbrOfNiceStrings++
    }
}

console.log(nbrOfNiceStrings)