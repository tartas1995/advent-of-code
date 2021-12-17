const fs = require('fs')
const content = fs.readFileSync('./day17.txt', { encoding: 'utf8', flag: 'r' })
const regex = /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/

/*
WEIRD bruteforce. I couldn-t be asked to do this correctly
*/
const match = content.match(regex)
const startPosition = { x: parseInt(match[1]), y: parseInt(match[3]) }
const endPosition = { x: parseInt(match[2]), y: parseInt(match[4]) }
const area = {
    start: startPosition,
    end: endPosition,
}
console.log(area)

function checkIfInArea(pos) {
    return area.start.x <= pos.x && area.end.x >= pos.x
        && area.start.y <= pos.y && area.end.y >= pos.y
}

let xVelocity = 0

const validVelocities = []

while (xVelocity <= area.end.x) {
    let yVelocity = area.start.y
    let yV
    do {
        let cPos = {x:0,y:0}
        let step = 0
        yV = yVelocity
        while (cPos.y >= area.start.y && cPos.x < area.end.x && !checkIfInArea(cPos)) {
            let xV = xVelocity - step
            cPos.x += xV > 0 ? xV : 0
            cPos.y += yV
            yV--
            step++
        }
        if (checkIfInArea(cPos)) {
            validVelocities.push([xVelocity, yVelocity])
        }
        yVelocity++
    } while (yVelocity < 10000)
    xVelocity++
}

console.log(validVelocities)
console.log(validVelocities.length)