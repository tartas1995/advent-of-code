const fs = require('fs')
const content = fs.readFileSync('./day18.txt', { encoding: 'utf8', flag: 'r' })
const lines = content.split("\n").map((line) => {
    return JSON.parse(line)
})


/**
 * if splits triggers explode then explode before next split
 */
function reduce(number) {
    //exploses
    //splits
}

let current = null

for (let line of lines) {
    if (current === null) {
        current = line
    } else {
        current = [current, line]
    }
}
console.log(lines)