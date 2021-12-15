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

const untilStep = 40
let cStep = 0

let nodes = {}
for (let ii = 0; ii < template.length-1; ii++) {
    const subs = template.substring(ii, ii+2)
    if (!nodes[subs]) nodes[subs] = 0
    nodes[subs]++ 
}
while (cStep < untilStep) {
    let newNodes = {}
    for (let key in lookUpTable) {
        if (nodes[key]) {
            let lk = key[0]+lookUpTable[key]
            if (!newNodes[lk]) newNodes[lk] = 0
            newNodes[lk] += nodes[key]
            let rk = lookUpTable[key]+key[1]
            if (!newNodes[rk]) newNodes[rk] = 0
            newNodes[rk] += nodes[key]
        }
    }
    nodes = newNodes
    cStep++
}

const register = {}
for (let key in nodes) {
    if (!register[key[0]])register[key[0]] = 0
    register[key[0]] += nodes[key]
}
register[template[template.length-1]]++

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