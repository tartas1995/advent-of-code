const fs = require('fs')
const content = fs.readFileSync('./day11.txt', { encoding: 'utf8', flag: 'r' })
const values = content.split("\n").map((line) => {
    return line.split('').map(v => parseInt(v))
})

function printMap(values){
    console.log(values.map(v => v.join('')).join("\n"))
}

const numberOfValue = values.length * values[0].length

let day = 0
let found = false

while (!found) {
    let count = 0
    let flashes = []
    for (let lineN in values) {
        for (let colN in values[lineN]) {
            values[lineN][colN]++
            if (values[lineN][colN] > 9) {
                flashes.push([lineN, colN])
            }
        }
    }
    for (let ii = 0; ii < flashes.length; ii++) {
        count++
        let flash = flashes[ii]
        let lineN = parseInt(flash[0])
        let colN = parseInt(flash[1])
        for (let ll = -1; ll < 2; ll++) {
            for (let cc = -1; cc < 2; cc++) {
                if (!!values[lineN+ll]) {
                    if (!!values[lineN+ll][colN+cc]) {
                        if (values[lineN+ll][colN+cc] === 9) {
                            flashes.push([lineN+ll,colN+cc])
                        }
                        values[lineN+ll][colN+cc]++
                    }
                }
            }
        }
    }
    while (flashes.length > 0) {
        let flash = flashes.shift()
        values[flash[0]][flash[1]] = 0
    }
    if (count === numberOfValue) {
        found = true
    }
    day++
}
console.log("result:")
printMap(values)
console.log("step", day)