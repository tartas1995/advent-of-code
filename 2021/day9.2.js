const fs = require('fs')
const content = fs.readFileSync('./day9.txt', { encoding: 'utf8', flag: 'r' })
const rows = content.split("\n")
const values = rows.map((s) => {
    return s.split('').map(n => parseInt(n))
})

let lowPoints = []

for (let ii = 0; ii < values.length; ii++) {
    for (let kk = 0; kk < values[ii].length; kk++) {
        // grab numbers
        // current number, north number,...
        let cn = values[ii][kk]
        let nn = values[ii-1] !== undefined ? values[ii-1][kk] : 9
        let wn = values[ii][kk-1] !== undefined ? values[ii][kk-1] : 9
        let on = values[ii][kk+1] !== undefined ? values[ii][kk+1] : 9
        let sn = values[ii+1] !== undefined ? values[ii+1][kk] : 9
        if (cn < nn && cn < wn && cn < on && cn < sn) {
            lowPoints.push([ii,kk])
        }
    }
}

let biggestBasins = [0,0,0]

function checkIfPartOfbasin(basin, ii, kk) {
    let found = false
    for (let field of basin) {
        if (field[0] === ii && field[1] === kk) found = true
    }
    return found
}

for (let lowPoint of lowPoints) {
    let basin = [[lowPoint[0],lowPoint[1]]]
    let checkedIndex = -1
    while (basin.length - 1 !== checkedIndex) {
        let index = checkedIndex + 1
        let ii = basin[index][0]
        let kk = basin[index][1]
        let nn = values[ii-1] !== undefined ? values[ii-1][kk] : 9
        let wn = values[ii][kk-1] !== undefined ? values[ii][kk-1] : 9
        let on = values[ii][kk+1] !== undefined ? values[ii][kk+1] : 9
        let sn = values[ii+1] !== undefined ? values[ii+1][kk] : 9
        if (nn !== 9 && !checkIfPartOfbasin(basin, ii-1, kk)) {
            basin.push([ii - 1, kk])
        }
        if (wn !== 9 && !checkIfPartOfbasin(basin, ii, kk - 1)) {
            basin.push([ii, kk - 1])
        }
        if (on !== 9 && !checkIfPartOfbasin(basin, ii, kk + 1)) {
            basin.push([ii, kk + 1])
        }
        if (sn !== 9 && !checkIfPartOfbasin(basin, ii+1, kk)) {
            basin.push([ii + 1, kk])
        }
        checkedIndex = index
    }
    if (basin.length > biggestBasins[0]) {
        biggestBasins[0] = basin.length
        biggestBasins.sort((a,b) => {return a -b})
    }
}

console.log(biggestBasins)
console.log(biggestBasins[0] * biggestBasins[1] * biggestBasins[2])