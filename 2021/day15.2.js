const fs = require('fs')
const { createCanvas } = require('canvas')
const { execSync } = require("child_process")
const content = fs.readFileSync('./day15.txt', { encoding: 'utf8', flag: 'r' })
const map = content.split("\n").map((line) => {
    let row = line.split('').map(n => parseInt(n))
    const temp = [...row]
    for (let ii = 1; ii < 5; ii++) {
        row.push(...temp.map((n) => {
            let r = (n + ii) % 9
            r = r === 0 ? 9 : r
            return r
        }))
    }
    return row
})

let temp = [...map]
for (let ii = 1; ii < 5; ii++) {
    map.push(...temp.map((line) => {
        return line.map((n) => {
            let r = (n + ii) % 9
            r = r === 0 ? 9 : r
            return r
        })
    }))
}


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

function registerVisit(array, node) {
    array[nodeToString(node)] = true
}

function findNodeInArray(array, node) {
    return array[nodeToString(node)]
}

function registerDistanceInLookUp(node,cost) {
    if (findNodeInArray(visited,node)) return
    if (!qFSDT[cost]) qFSDT[cost] = []
    qFSDT[cost].push(nodeToString(node))
}

function unregisterDistanceInLookUp(node) {
    if (!qFSDT[node.cost]) return
    const str = nodeToString(node)
    qFSDT[node.cost] = qFSDT[node.cost].filter((n) => {
        return n !== str
    })
}

function getNextNode() {
    while(qFSDT[currentCost] === undefined 
        || qFSDT[currentCost].length === 0) {
        currentCost++
    }
    return qFSDT[currentCost].shift()
}

function nodeToString(node) {
    return `${node.y},${node.x}`
}

// animation render
let nbrOfFrame = 0
const pixelSize = 2
function resize(value) {
    return value * pixelSize
}
function renderImage(node, defaultColor = "#FFFFFF") {
    const canvas = createCanvas(resize(END.x + 1), resize(END.y + 1))
    const context = canvas.getContext("2d")
    context.fillStyle = "#000000"
    context.fillRect(0, 0, resize(END.x + 1), resize(END.y + 1))
    context.fillStyle = defaultColor
    let nn = node
    while (nn.via !== undefined) {
        context.fillRect(resize(nn.x),resize(nn.y), pixelSize, pixelSize)
        nn = nn.via
    }
    context.fillStyle = "#0000FF"
    context.fillRect(0, 0,  pixelSize,  pixelSize)
    context.fillStyle = "#FF0000"
    context.fillRect( resize(END.x), resize(END.y),  pixelSize,  pixelSize)
    const buffer = canvas.toBuffer("image/png")
    fs.writeFileSync(`${process.argv[2]}${nbrOfFrame}.png`, buffer)
    nbrOfFrame++
}


const START = { x: 0, y: 0}
const END = { x: map[map.length - 1].length-1, y: map.length - 1}

let visited = []
let currentCost = 0
let qFSDT = {//quickFindShortestDistanceTable
    0: ['0,0']
} 
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
while (node = distances[getNextNode()]) {
    if (lastCost === null || lastCost < node.cost) {
        lastCost = node.cost
        console.log("new Cost:",lastCost)
    }
    if (node.x === END.x && node.y === END.y) break;
    const cost = node.cost
    const paths = getPossiblePaths(node)
    for (let nn of paths) {
        if (nn.x === START.x && nn.y === START.y) continue
        const newDis = cost+map[nn.y][nn.x]
        const nodeStr = nodeToString(nn)
        if (distances[nodeStr].cost > newDis) {
            unregisterDistanceInLookUp(nn)
            registerDistanceInLookUp(nn, newDis)
            distances[nodeStr].cost = newDis
            distances[nodeStr].via = node
        }
    }
    renderImage(node)
    registerVisit(visited, node)
}

for (let ii = 0; ii < 120; ii++) {
    renderImage(distances[nodeToString(END)], "#FF0000")
}

let shortestPath = [distances[nodeToString(END)]]
while (!!shortestPath[shortestPath.length-1].via) {
        const node = shortestPath[shortestPath.length-1].via
        const nodeStr = nodeToString(node)
        shortestPath.push(distances[nodeStr])
    }

shortestPath.reverse()

//drawMap(map,shortestPath)
execSync(`ffmpeg -y -start_number 0 -i ${process.argv[2]}%d.png -framerate 60 ${process.argv[2]}path.mp4`)
execSync(`rm ${process.argv[2]}*.png`)

console.log(distances[nodeToString(END)])


