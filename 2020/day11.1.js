const fs = require('fs')
const content = fs.readFileSync('./day11.txt',{encoding:'utf8', flag:'r'})

const floor = '.'
const free = 'L'
const occupied = '#'

const rows = content.split('\n')
rows.pop()
let field = rows.map(r => r.split(''))
let renderField = null

const checkFreeField = (x, y) => {
    const ft = field[y-1]
    const fm = field[y]
    const fb = field[y+1]
    
    let ftl = null
    let ftm = null
    let ftr = null
    let fml = null
    let fmr = null
    let fbl = null
    let fbm = null
    let fbr = null

    if (ft !== undefined) {
        ftl = ft[x-1]
        ftm = ft[x]
        ftr = ft[x+1]
    }

    if (fm !== undefined) {
        fml = fm[x-1]
        fmr = fm[x+1]
    }

    if (fb !== undefined) {
        fbl = fb[x-1]
        fbm = fb[x]
        fbr = fb[x+1]
    }
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
    const ft = field[y-1]
    const fm = field[y]
    const fb = field[y+1]
    
    let ftl = null
    let ftm = null
    let ftr = null
    let fml = null
    let fmr = null
    let fbl = null
    let fbm = null
    let fbr = null

    if (ft !== undefined) {
        ftl = ft[x-1]
        ftm = ft[x]
        ftr = ft[x+1]
    }

    if (fm !== undefined) {
        fml = fm[x-1]
        fmr = fm[x+1]
    }

    if (fb !== undefined) {
        fbl = fb[x-1]
        fbm = fb[x]
        fbr = fb[x+1]
    }
    let nbrOfOccupiedFields = 0
    if (ftl === occupied) nbrOfOccupiedFields++
    if (ftm === occupied) nbrOfOccupiedFields++
    if (ftr === occupied) nbrOfOccupiedFields++
    if (fml === occupied) nbrOfOccupiedFields++
    if (fmr === occupied) nbrOfOccupiedFields++
    if (fbl === occupied) nbrOfOccupiedFields++
    if (fbm === occupied) nbrOfOccupiedFields++
    if (fbr === occupied) nbrOfOccupiedFields++
    return nbrOfOccupiedFields >= 4 ? free : occupied
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
}, 200)

//2489 is the solution 