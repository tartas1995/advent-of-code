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
    const xs = x1 < x2 ? 1 : x1 === x2 ? 0 : -1
    const ys = y1 < y2 ? 1 : y1 === y2 ? 0 : -1
    let xc = x1;
    let yc = y1;
    while (
        ((xs === 1 && xc <= x2) || (xs === -1 && xc >= x2) || (xs === 0)) &&
        ((ys === 1 && yc <= y2) || (ys === -1 && yc >= y2) || (ys === 0))
    ){
        if (!register[xc])register[xc] = []
        if (!register[xc][yc])register[xc][yc] = 0
        register[xc][yc]++
        xc = xc + xs
        yc = yc + ys
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