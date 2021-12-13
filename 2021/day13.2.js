const fs = require('fs')
const content = fs.readFileSync('./day13.txt', { encoding: 'utf8', flag: 'r' })
const input = content.split("\n\n")
const dots = input[0].split("\n")
    .map(line => line.split(',')
    .map(n => parseInt(n)))
const regex = /(y|x)=(\d+)/
const folds = input[1].split("\n")
    .map((line) => {
        const match = line.match(regex)
        return [match[1] === 'x' ? 0 : 1, parseInt(match[2])]
    })

let result = [...dots]
const untilFolds = -1 // disable with negative value
let cf = 0

while ((untilFolds < 0 || cf < untilFolds) && cf < folds.length) {
    let fold = folds[cf]
    let temp = []
    for (let dot of result) {
        if (dot[fold[0]] > fold[1]) {
            const diff = dot[fold[0]] - fold[1]
            const pos = fold[1] - diff
            dot[fold[0]] = pos
            temp.push(dot)
        } else {
            temp.push(dot)
        }
    }
    result = temp
    cf++
}

const register = []
let biggestX = null
let biggestY = null
for (let dot of result) {
    if (biggestX === null) biggestX = dot[0]
    if (biggestY === null) biggestY = dot[1]
    if (biggestX < dot[0]) biggestX = dot[0]
    if (biggestY < dot[1]) biggestY = dot[1]
} 

for (let ii = 0; ii <= biggestY; ii++) {
    register.push([])
    for (let jj = 0; jj <= biggestX; jj++) {
        register[ii].push(false)
    }
}

for (let dot of result) {
    try {
        register[dot[1]][dot[0]] = true
    } catch (e) {
        console.log(dot)
    }
}

let counter = 0

for (let line of register) {
    let str = ''
    for (let bool of line) {
        if (bool) counter++
        str += bool ? '#' : '.'
    }
    console.log(str)
}

console.log(counter)