const { dir } = require('console')
const fs = require('fs')
const content = fs.readFileSync('./day11.txt',{encoding:'utf8', flag:'r'})

const floor = '.'
const free = 'L'
const occupied = '#'

const rows = content.split('\n')
let field = rows.map(r => r.split(''))
let renderField = null


/**
 * direction labeling
 * 1 2 3
 * 4 X 6
 * 7 8 9
 */
const lookInDirection = (x, y, direction) => {
    let cx = x
    let cy = y
    let sx = 0
    let sy = 0
    if (direction === 1){
        sx = -1
        sy = -1
    } else if (direction === 2) {
        sy = -1
    } else if (direction === 3) {
        sy = -1
        sx = +1
    } else if (direction === 4) {
        sx = -1
    } else if (direction === 6) {
        sx = +1
    } else if (direction === 7) {
        sx = -1
        sy = +1
    } else if (direction === 8) {
        sy = +1
    } else if (direction === 9) {
        sx = +1
        sy = +1
    }
    cy += sy
    cx += sx
    while (cx >= 0 && cy >= 0 && cy <= field.length - 1 && cx <= field[cy].length - 1 && field[cy][cx] === floor) {
        cy += sy
        cx += sx
    } 
    if (cx < 0 || cy < 0 || cy > field.length - 1 || cx > field[cy].length - 1) return null
    return field[cy][cx]
}

const checkFreeField = (x, y) => {
    let ftl = lookInDirection(x, y, 1)
    let ftm = lookInDirection(x, y, 2)
    let ftr = lookInDirection(x, y, 3)
    let fml = lookInDirection(x, y, 4)
    let fmr = lookInDirection(x, y, 6)
    let fbl = lookInDirection(x, y, 7)
    let fbm = lookInDirection(x, y, 8)
    let fbr = lookInDirection(x, y, 9)
    if (ftl === occupied) return free
    if (ftm === occupied) return free
    if (ftr === occupied) return free
    if (fml === occupied) return free
    if (fmr === occupied) return free
    if (fbl === occupied) return free
    if (fbm === occupied) return free
    if (fbr === occupied) return free
    return occupied
}

const checkOccupiedField = (x, y) => {
    let ftl = lookInDirection(x, y, 1)
    let ftm = lookInDirection(x, y, 2)
    let ftr = lookInDirection(x, y, 3)
    let fml = lookInDirection(x, y, 4)
    let fmr = lookInDirection(x, y, 6)
    let fbl = lookInDirection(x, y, 7)
    let fbm = lookInDirection(x, y, 8)
    let fbr = lookInDirection(x, y, 9)
    let nbrOfOccupiedFields = 0
    if (ftl === occupied) nbrOfOccupiedFields++
    if (ftm === occupied) nbrOfOccupiedFields++
    if (ftr === occupied) nbrOfOccupiedFields++
    if (fml === occupied) nbrOfOccupiedFields++
    if (fmr === occupied) nbrOfOccupiedFields++
    if (fbl === occupied) nbrOfOccupiedFields++
    if (fbm === occupied) nbrOfOccupiedFields++
    if (fbr === occupied) nbrOfOccupiedFields++
    return nbrOfOccupiedFields >= 5 ? free : occupied
}

const checkField = (x, y) => {
    const f = field[y][x]
    if (f === floor) {
        return floor
    } else if (f === free) {
        return checkFreeField(x, y)
    } else if (f === occupied) {
        return checkOccupiedField(x, y)
    }
}

const compareFields = (f1, f2) => {
    for (let ii = 0; ii < f1.length; ii++) {
        for (let jj = 0; jj < f1[ii].length; jj++) {
            if (f1[ii][jj] !== f2[ii][jj]) return false
        }
    }
    return true
}

const countOccupiedSeats = (field) => {
    let nbr = 0
    for (let ii = 0; ii < field.length; ii++) {
        for (let jj = 0; jj < field[ii].length; jj++) {
            if (field[ii][jj] === occupied) nbr++
        }
    }
    return nbr
}

const printField = () => {
    const print = field.map(r => r.join('')).join('\n')
    console.log('-------------------------------------------------------------')
    console.log(print)
}

const breakAtRepetition = 5;
let repCounter = 0

let interval = setInterval(() => {
    renderField = []
    for (let ii = 0; ii < field.length; ii++) {
        if (renderField[ii] === undefined) renderField[ii] = []
        for (let jj = 0; jj < field[ii].length; jj++) {
            renderField[ii][jj] = checkField(jj, ii)
        }
    }
    if (compareFields(field, renderField))repCounter++ 
    else repCounter = 0
    if (repCounter >= breakAtRepetition) {
        clearInterval(interval)
        printField()
        console.log('nbr of occupied seats:', countOccupiedSeats(field))
    } else {
        field = renderField
        printField()
    }
}, 100)

//2180 is the solution 