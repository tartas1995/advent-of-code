const fs = require('fs')
const content = fs.readFileSync('./day1.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n")

const numbers = strings.map((v) => {
    return parseInt(v)
})

let count = 0

let previous = null
for (let ii = 0; ii < numbers.length - 2; ii++) {
    const sum = numbers[ii] + numbers[ii + 1] + numbers[ii + 2]
    if (!!previous) {
        if (sum > previous) {
            console.log(`${sum} (increased)`)
            count++
        } else {
            console.log(`${sum} (decreased)`)
        }
    }
    previous = sum
}

console.log(count)