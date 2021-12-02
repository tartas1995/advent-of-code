const fs = require('fs')
const content = fs.readFileSync('./day6.test.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n");

// 418954 is too high

const grid = []

for (let i = 0; i < 1000; i++) {
    grid[i] = []
    for (let j = 0; j < 1000; j++) {
        grid[i][j] = false
    }
}

const turn = (x,y,tox,toy,value) => {
    for (let i = x; i <= tox; i++) {
        for (let j = y; j <= toy; j++) {
            grid[i][j] = value
        }
    }
}

const toggle = (x,y,tox,toy) => {
    for (let i = x; i <= tox; i++) {
        for (let j = y; j <= toy; j++) {
            grid[i][j] = !grid[i][j]
        }
    }
}

const regex = /(turn off|turn on|toggle) (\d+),(\d+) through (\d+),(\d+)/g

for (const string of strings) {
    if (string === '') break;
    const matches = [...string.matchAll(regex)][0]
    const ind = matches[1]
    const x = matches[2]
    const y = matches[3]
    const tox = matches[4]
    const toy = matches[5]
    switch (ind) {
        case 'turn on':
            turn(x,y,tox,toy,true)
            break
        case 'turn off':
            turn(x,y,tox,toy,false)
            break
        case 'toggle':
            toggle(x,y,tox,toy)
            break
    }
}

let nbrOfLights = 0

for (const line of grid) {
    for (const light of line) {
        if (light) nbrOfLights++
    }
}

console.log(nbrOfLights)