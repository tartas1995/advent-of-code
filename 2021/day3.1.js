const fs = require('fs')
const content = fs.readFileSync('./day3.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n")

let rowLength = strings[0].length

const numbers = strings.map((v) => {
    return parseInt(v,2)
})

let register = [];
for (let ii = 0; ii < rowLength; ii++) {
    register.push([0,0])
}

for (const number of numbers) {
    for (let ii = 0; ii < rowLength; ii++) {
        let bitNumber = 2**ii
        register[ii][(number & bitNumber) == bitNumber ? 1 : 0]++
    }
}

let gamma = 0;
let epsilon = 0;
for (let ii = 0; ii < rowLength; ii++) {
    let bitNumber = 2**ii
    if (register[ii][0] < register[ii][1]) {
        gamma += bitNumber
    } else {
        epsilon += bitNumber
    }
}

console.log(gamma,epsilon)
console.log(gamma.toString(2))
console.log(epsilon.toString(2))
console.log(gamma*epsilon)