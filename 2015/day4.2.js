const crypto = require('crypto')
const puzzleInput = 'ckczppom'

let num = -1
let lastHash = ''

do {
    num++
    lastHash = crypto.createHash('md5').update(`${puzzleInput}${num}`).digest('hex')
} while (lastHash.substr(0,6) !== '000000')

console.log(lastHash)
console.log(num)
