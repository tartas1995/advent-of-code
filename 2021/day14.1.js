const fs = require('fs')
const content = fs.readFileSync('./day14.txt', { encoding: 'utf8', flag: 'r' })
const input = content.split("\n\n")
const regex = /(\w+) -> (\w)/
let template = input[0]
const lookUpTable = {}
input[1].split("\n").forEach((l) => {
    const match = l.match(regex)
    lookUpTable[match[1]] = match[2]
})

const untilStep = 10
let cStep = 0

while (cStep < untilStep) {
    const register = []
    for (let ii = 0; ii < template.length-1; ii++) {
        const subs = template.substring(ii, ii+2)
        for (let key in lookUpTable) {
            if (subs === key) {
                register.push([ii+1, lookUpTable[key]])
            }
        }
    }
    let shiftValue = 0
    for (let insertion of register) {
        template = template.slice(0, insertion[0] + shiftValue) 
            + insertion[1] 
            + template.slice(insertion[0] + shiftValue)
        shiftValue++
    }
    cStep++
}

const register = {}
for (let c of template) {
    if (!register[c])register[c] = 0
    register[c]++
}

let lowest = null
let highest = null
for (let key in register) {
    const value = register[key]
    if(lowest === null) lowest = value
    if(highest === null) highest = value
    if(value < lowest) lowest = value
    if(value > highest) highest = value
}

console.log(register)
console.log(lowest)
console.log(highest)
console.log(highest - lowest)