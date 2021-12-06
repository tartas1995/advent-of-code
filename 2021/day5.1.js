const fs = require('fs')
const content = fs.readFileSync('./day5.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n")
//0,9 -> 5,9
const regex = /(\d+),(\d+) -> (\d+),(\d+)/g

function printMap(register) {
    for (let ii = 0; ii < register.length; ii++) {
        if (!register[ii])continue;
        let content = ''
        for (let jj = 0; jj < register[ii].length; jj++) {
            content += register[ii][jj] ? register[ii][jj] : '.'
        }
        console.log(content)
    }
}

const lines = strings.map((v) => {
    const match = [...v.matchAll(regex)][0]
    return [
        [parseInt(match[1]),parseInt(match[2])],
        [parseInt(match[3]),parseInt(match[4])],
    ]
})

let register = [];

for (const line of lines) {
    const x1 = line[0][0]
    const x2 = line[1][0]
    const y1 = line[0][1]
    const y2 = line[1][1]
    if (x1 !== x2 && y1 !== y2) {
        continue;
    }
    switch(true) {
        case y1 === y2 && x1 < x2:
            for (let ii = x1; ii <= x2; ii++) {
                if (!register[ii])register[ii] = []
                if (!register[ii][y1])register[ii][y1] = 0
                register[ii][y1]++
            }
            break;
        case y1 === y2 && x1 > x2:
            for (let ii = x2; ii <= x1; ii++) {
                if (!register[ii])register[ii] = []
                if (!register[ii][y1])register[ii][y1] = 0
                register[ii][y1]++
            }
            break;
        case x1 === x2 && y1 < y2:
            for (let ii = y1; ii <= y2; ii++) {
                if (!register[x1])register[x1] = []
                if (!register[x1][ii])register[x1][ii] = 0
                register[x1][ii]++
            }
            break;
        case x1 === x2 && y1 > y2:
            for (let ii = y2; ii <= y1; ii++) {
                if (!register[x1])register[x1] = []
                if (!register[x1][ii])register[x1][ii] = 0
                register[x1][ii]++
            }
            break;
        default:
            break;
    }
}

//printMap(register)

let count = 0
for (let ii = 0; ii < register.length; ii++) {
    if (!register[ii]) {
        continue;
    }
    for (let jj = 0; jj < register[ii].length; jj++) {
        if (register[ii][jj] >= 2) {
            count++
        }
    }
}
console.log(count)