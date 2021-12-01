const fs = require('fs')
const content = fs.readFileSync('./day1.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n")

const numbers = strings.map((v) => {
    return parseInt(v)
})

let count = 0

let previous = null
for (let number of numbers) {
    if (!!previous) {
        if (number > previous) {
            console.log(`${number} (increased)`)
            count++
        } else {
            console.log(`${number} (decreased)`)
        }
    }
    previous = number;
}

console.log(count)