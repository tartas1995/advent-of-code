const fs = require('fs')
const content = fs.readFileSync('./day3.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n")

let rowLength = strings[0].length

const numbers = strings.map((v) => {
    return parseInt(v,2)
})

let filtered = numbers
let ii = 0
while (filtered.length > 1) {
    let register = [0,0]
    let bitNumber = 2**(rowLength-1-ii)
    for (const number of filtered) {
        register[(number & bitNumber) == bitNumber ? 1 : 0]++
    }
    ii++
    let bitValue = register[0] <= register[1]
    filtered = filtered.filter((v) => {
        return ((v & bitNumber) === bitNumber) === bitValue
    })
}
let oxygen = filtered[0]
filtered = numbers
ii = 0
while (filtered.length > 1) {
    let register = [0,0]
    let bitNumber = 2**(rowLength-1-ii)
    for (const number of filtered) {
        register[(number & bitNumber) == bitNumber ? 1 : 0]++
    }
    ii++
    let bitValue = register[0] > register[1]
    filtered = filtered.filter((v) => {
        return ((v & bitNumber) === bitNumber) === bitValue
    })
}
let co2 = filtered[0]

console.log(oxygen, co2, oxygen * co2);