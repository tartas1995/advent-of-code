const fs = require('fs')
const content = fs.readFileSync('./day12.txt', { encoding: 'utf8', flag: 'r' })
const connections = content.split("\n").map(l => l.split('-'))


const start = 'start'
const end = 'end'
const map = {

}

for (let connection of connections) {
    if (!map[connection[0]]) {
        map[connection[0]] = []
    }
    if (!map[connection[1]]) {
        map[connection[1]] = []
    }
    if (connection[1] !== start) {
        map[connection[0]].push(connection[1])
    }
    if (connection[0] !== start) {
        map[connection[1]].push(connection[0])
    }
}

const paths = [[start]]

for (let ii = 0; ii < paths.length; ii++) {
    let path = paths[ii]
    let cc = path[path.length - 1]
    const register = {}
    let usedDouble = false
    if (cc !== end) {
        for (let cave of path) {
            if (cave.toLowerCase() === cave) {
                if (!register[cave]) register[cave] = 0
                if (register[cave] === 1) usedDouble = true
                register[cave]++
            }
        }
        const possiblePaths = map[cc]
        for (let pp of possiblePaths) {
            if (!(usedDouble && pp.toLowerCase() === pp && (path.indexOf(pp) !== -1))) {
                paths.push([...path, pp])
            }
        }
    }
}

const endedPaths = paths.filter((path) => {
    return path[path.length - 1] === end
})

//console.log(endedPaths)
console.log(endedPaths.length)