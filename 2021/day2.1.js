const fs = require('fs')
const content = fs.readFileSync('./day2.txt',{encoding:'utf8', flag:'r'})
const strings = content.split("\n")

const regex = /(\w+) (\d+)/

const instructions = strings.map((v) => {
    const match = v.match(regex)
    return [match[1], parseInt(match[2])]
})

let hoz = 0
let ver = 0
for (const instruction of instructions) {
    switch (instruction[0]) {
        case 'down':
            ver += instruction[1]
            break
        case 'up':
            ver -= instruction[1]
            break
        case 'forward':
            hoz += instruction[1]
            break
    }
}
console.log(hoz, ver, hoz * ver)