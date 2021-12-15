const fs = require('fs')
const content = fs.readFileSync('./day15.test.txt', { encoding: 'utf8', flag: 'r' })
const map = content.split("\n").map((line) => {
    return line.split('').map(n => parseInt(n))
})

/**
 * THIS CODE IS TRYING TO BRUTEFORCE THE SOLUTION
 * PROBABLY WORKS BUT I DONT HAVE TIME FOR IT TO FINISH
 */

const END = { x: map[map.length - 1].length-1, y: map.length - 1}

function findVisit(takenPath, pos) {
    let ii = takenPath.length - 1
    while (ii >= 0) {
        if (pos.x === takenPath[ii].x && pos.y === takenPath[ii].y) {
            return true;
        }
        const xDiff = Math.abs(pos.x - takenPath[ii].x)
        const yDiff = Math.abs(pos.y - takenPath[ii].y)
        const diff = xDiff + yDiff
        ii -= diff
    }
    return false;
}

function calculateRisk(takenPath) {
    let sum = 0
    for (let pos of takenPath) {
        sum += map[pos.y][pos.x]
    }
    return sum
}

function makeDecision(takenPath) {
    const cPos = takenPath[takenPath.length-1]
    if (cPos.x === END.x && cPos.y === END.y) {
        return [calculateRisk(takenPath), takenPath]
    }
    let lowestRisk = null;
    let path = null;
    if (!!map[cPos.y - 1] 
        && !!map[cPos.y - 1][cPos.x] 
        && !findVisit(takenPath, {x: cPos.x, y:cPos.y - 1})) { //up
            let result = makeDecision([...takenPath, {x: cPos.x, y:cPos.y - 1}])
            if (lowestRisk === null || (result[0] !== null && lowestRisk > result[0])) {
                lowestRisk = result[0]
                path = result[1]
            }
    }
    if (!!map[cPos.y + 1] 
        && !!map[cPos.y + 1][cPos.x] 
        && !findVisit(takenPath, {x: cPos.x, y:cPos.y + 1})) { //down
            let result = makeDecision([...takenPath, {x: cPos.x, y:cPos.y + 1}])
            if (lowestRisk === null || (result[0] !== null && lowestRisk > result[0])) {
                lowestRisk = result[0]
                path = result[1]
            }
    }
    if (!!map[cPos.y][cPos.x - 1] 
        && !findVisit(takenPath, {x: cPos.x - 1, y:cPos.y})) { //left
            let result = makeDecision([...takenPath, {x: cPos.x - 1, y:cPos.y}])
            if (lowestRisk === null || (result[0] !== null && lowestRisk > result[0])) {
                lowestRisk = result[0]
                path = result[1]
            }
    }
    if (!!map[cPos.y][cPos.x + 1]
        && !findVisit(takenPath, {x: cPos.x + 1, y:cPos.y})) { //right
            let result = makeDecision([...takenPath, {x: cPos.x + 1, y:cPos.y}])
            if (lowestRisk === null || (result[0] !== null && lowestRisk > result[0])) {
                lowestRisk = result[0]
                path = result[1]
            }
    }
    return [lowestRisk, path]
}

console.log(makeDecision([{x:0,y:0}]))