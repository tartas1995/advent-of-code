const fs = require('fs')
const content = fs.readFileSync('./day15.txt', { encoding: 'utf8', flag: 'r' })
const map = content.split("\n").map((line) => {
    return line.split('').map(n => parseInt(n))
})

function drawMap(map, path) {
    for (let line in map) {
        let str = ""
        for (let col in map[line]) {
            let found = false
            for (let node of path) {
                if (node.x === parseInt(col) && node.y === parseInt(line)) found = true
            }
            if (!found) {
                str += map[line][col]  
            } else {
                str += `\x1b[46m\x1b[37m${map[line][col]}\x1b[0m`
            }  
        }
        console.log(str)
    }
}

/**
 * DIJKSTRA ALGORITHMUS
 */

function getPossiblePaths(pos) {
    let paths = []
    if (map[pos.y - 1] && map[pos.y - 1][pos.x]) paths.push({x:pos.x, y: pos.y - 1}) //up
    if (map[pos.y + 1] && map[pos.y + 1][pos.x]) paths.push({x:pos.x, y: pos.y + 1}) //down
    if (map[pos.y] && map[pos.y][pos.x - 1]) paths.push({x:pos.x-1, y: pos.y}) // left
    if (map[pos.y] && map[pos.y][pos.x + 1]) paths.push({x:pos.x+1, y: pos.y}) //right
    return paths
}

function findNodeInArray(array, node) {
    for (let n of array) {
        if (n.x === node.x && n.y === node.y) {
            return true
        }
    }
    return false
}

function getShortestNode(distances, visited) {
    let shortest = null
    for (let key in distances) {
        const node = distances[key]
        if ((shortest === null || node.cost < shortest.cost )
            && !findNodeInArray(visited,node)) {
            shortest = node
        }
    }
    return shortest
}

function nodeToString(node) {
    return `${node.y},${node.x}`
}


const START = { x: 0, y: 0}
const END = { x: map[map.length - 1].length-1, y: map.length - 1}

let visited = []
let distances = {}
map.forEach((row, y) => {
    return row.forEach((v, x) => {
        if (START.y === y && START.x === x) {
            distances[nodeToString({x,y})] = {cost: 0, x, y}
        } else {
            distances[nodeToString({x,y})] = {cost: Infinity, x, y}
        }
    })
})

let lastCost = null

let node = null
while (node = getShortestNode(distances, visited)) {
    if (lastCost === null || lastCost < node.cost) {
        lastCost = node.cost
        console.log(lastCost)
    }
    if (node.x === END.x && node.y === END.y) break;
    const cost = node.cost
    const paths = getPossiblePaths(node)
    for (let nn of paths) {
        if (nn.x === START.x && nn.y === START.y) continue
        const newDis = cost+map[nn.y][nn.x]
        const nodeStr = nodeToString(nn)
        if (distances[nodeStr].cost > newDis) {
            distances[nodeStr].cost = newDis
            distances[nodeStr].via = node
        }
    }
    visited.push(node)
}

let shortestPath = [distances[nodeToString(END)]]
while (!!shortestPath[shortestPath.length-1].via) {
        const node = shortestPath[shortestPath.length-1].via
        const nodeStr = nodeToString(node)
        shortestPath.push(distances[nodeStr])
    }

shortestPath.reverse()

//drawMap(map,shortestPath)

console.log(distances[nodeToString(END)])


