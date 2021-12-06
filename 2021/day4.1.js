const fs = require('fs')
const content = fs.readFileSync('./day4.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n\n")

const numbers = strings[0].split(',').map((v) => {
    return parseInt(v)
})

const regex = /(\d+)/gm
const boards = []
for (let ii = 1; ii < strings.length; ii++) {
    boards[ii-1] = []
    for (let n of strings[ii].matchAll(regex)) {
        boards[ii-1].push(parseInt(n))
    }
}

let quickestSolveIndex = null
let quickestSolvedBoardIndex = null

for (let ii = 0; ii < boards.length; ii++) {// each board
    let qbsi = null
    for (let xx = 0; xx < 25; xx = xx + 5) { // per row
        let ioln = null //index of latest number
        for (let yy = 0; yy < 5; yy++) { // per field
            // get index of number 
            // and save the index of the number that appears last
            // in the number list and board
            const index = numbers.indexOf(boards[ii][xx+yy])
            if (index === -1)break;
            if (ioln === null){
                ioln = index
            }
            if (index > ioln) {
                ioln = index
            }
        }
        // if ioln is set, set the qbsi to the quickest index
        if (ioln === null) continue;
        if (qbsi === null) {
            qbsi = ioln
        }
        if (qbsi > ioln) {
            qbsi = ioln
        }
    }
    for (let xx = 0; xx < 5; xx++) { // per row
        let ioln = null //index of latest number
        for (let yy = xx; yy < 25; yy = yy + 5) { // per field
            // get index of number 
            // and save the index of the number that appears last
            // in the number list and board
            const index = numbers.indexOf(boards[ii][yy])
            if (index === -1)break;
            if (ioln === null){
                ioln = index
            }
            if (index > ioln) {
                ioln = index
            }
        }
        // if ioln is set, set the qbsi to the quickest index
        if (ioln === null) continue;
        if (qbsi === null) {
            qbsi = ioln
        }
        if (qbsi > ioln) {
            qbsi = ioln
        }
    }
    if (quickestSolveIndex === null) {
        quickestSolveIndex = qbsi
        quickestSolvedBoardIndex = ii
    }
    if (qbsi !== null && quickestSolveIndex > qbsi) {
        quickestSolveIndex = qbsi
        quickestSolvedBoardIndex = ii
    }
}

// calculate restSum and get last number
const lastNumber = numbers[quickestSolveIndex]
const board = boards[quickestSolvedBoardIndex]


let restSum = 0

const numberSubset = numbers.slice(0,quickestSolveIndex+1)

for (let n of board) {
    let index = numberSubset.indexOf(n)
    if (index === -1) {
        restSum += n
    }
}

console.log (restSum, lastNumber)
console.log(lastNumber * restSum)