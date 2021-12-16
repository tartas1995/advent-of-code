const fs = require('fs')
const { exit } = require('process')
const content = fs.readFileSync('./day16.txt', { encoding: 'utf8', flag: 'r' })

/*
 * value test: D2FE28
 * package length test: 38006F45291200
 * package size test: EE00D40C823060
 */

//general function
function convertHexToBinary(hex) {
    let str = ""
    let num = parseInt(hex, 16)
    for (let ii = 3; ii >= 0; ii--) {
        let compare = 0b0001 << ii
        str += ((num & compare) === compare) ? "1" : "0"
    }
    return str
}
/*
const displayInBinary = []
let bcursor = 0
while(bcursor < content.length) {
    displayInBinary.push(...convertHexToBinary(content[bcursor]))
    bcursor++
}
console.log(displayInBinary.join(''))*/

//process
let cursor = -1
const buffer = []
let sumOfVersions = 0

function readPacket() {
    let packet = {}
    let packetFinished = false
    while (!packetFinished && cursor < content.length) {
        cursor++
        buffer.push(...convertHexToBinary(content[cursor]))
        // get version
        if (packet.version === undefined && buffer.length >= 3) {
            const versionBuffer = []
            for (let ii = 0; ii < 3; ii++) {
                versionBuffer.push(buffer.shift())
            }
            packet.version = parseInt(versionBuffer.join(""), 2)
            sumOfVersions += packet.version
        }
        // get type
        if (packet.type === undefined && buffer.length >= 3) {
            const typeBuffer = []
            for (let ii = 0; ii < 3; ii++) {
                typeBuffer.push(buffer.shift())
            }
            packet.type = parseInt(typeBuffer.join(""), 2)
        }
        if (packet.type === 4) { // if value
            const numberBuffer = []
            let last
            do {
                if (buffer.length < 6) {
                    cursor++
                    buffer.push(...convertHexToBinary(content[cursor]))
                    if (buffer.length < 5) {
                        cursor++
                        buffer.push(...convertHexToBinary(content[cursor]))
                    }
                }
                last = buffer.shift() === "0" ? true : false
                for (let ii = 0; ii < 4; ii++) {
                    numberBuffer.push(buffer.shift())
                }
            } while(!last)
            packet.value = parseInt(numberBuffer.join(""), 2)
            return packet
        } else if (packet.type !== undefined) { // if operator
            // get length type
            if (!packet.lengthType && buffer.length > 0) {
                packet.lengthType = buffer.shift()
            }
            // if length type is defined by length
            if (packet.lengthType === "0") {
                // if buffer contains all information
                if (packet.length === undefined && buffer.length >= 15) {
                    // set length
                    const lengthBuffer = []
                    for (let ii = 0; ii < 15; ii++) {
                        lengthBuffer.push(buffer.shift())
                    }
                    packet.length = parseInt(lengthBuffer.join(""), 2)
                    // load children
                    packet.children = []
                    let stopHere = (cursor * 4) - buffer.length + packet.length
                    while ((cursor * 4) < stopHere) {
                        packet.children.push(readPacket(packet.children))
                    }
                    // return packet
                    return packet
                }
            }
            // if length is defined by amount of packets
            if (packet.lengthType === "1") {
                // if if buffer contains all information
                if (packet.size === undefined && buffer.length >= 11) {
                    // set size
                    const sizeBuffer = []
                    for (let ii = 0; ii < 11; ii++) {
                        sizeBuffer.push(buffer.shift())
                    }
                    packet.size = parseInt(sizeBuffer.join(""), 2)
                    // load children
                    packet.children = []
                    while (packet.children.length < packet.size) {
                        packet.children.push(readPacket(packet.children))
                    }
                    // return packet
                    return packet
                }
            }
        }
    }
}

const structure  = readPacket()

//console.log(structure)

function calculatePacket(packet) {
    switch (packet.type) {
        case 0: // sum
            let sum = 0
            for (let pp of packet.children) {
                sum += calculatePacket(pp)
            }
            return sum
        case 1: // product
            let product = 1
            for (let pp of packet.children) {
                product *= calculatePacket(pp)
            }
            return product
        case 2: //minimum
            let mini = null
            for (let pp of packet.children) {
                let r = calculatePacket(pp)
                if (mini === null || r < mini) mini = r
            }
            return mini
        case 3: //maximum
            let max = null
            for (let pp of packet.children) {
                let r = calculatePacket(pp)
                if (max === null || r > max) max = r
            }
            return max
        case 4:
            return packet.value
        case 5: //greater than
            return calculatePacket(packet.children[0]) > calculatePacket(packet.children[1]) ? 1 : 0
        case 6: //less than
            return calculatePacket(packet.children[0]) < calculatePacket(packet.children[1]) ? 1 : 0
        case 7: //equals
            return calculatePacket(packet.children[0]) === calculatePacket(packet.children[1]) ? 1 : 0
        default:
            console.log("WTF", packet.type)
            exit()
    }
}

console.log(calculatePacket(structure))