const fs = require('fs')
const content = fs.readFileSync('./day9.txt', { encoding: 'utf8', flag: 'r' })
const rows = content.split("\n")
const values = rows.map((s) => {
    return s.split('').map(n => parseInt(n))
})

let sum = 0

for (let ii = 0; ii < values.length; ii++) {
    let map = "";
    for (let kk = 0; kk < values[ii].length; kk++) {
        // grab numbers
        // current number, north number,...
        let cn = values[ii][kk]
        let nn = values[ii-1] !== undefined ? values[ii-1][kk] : 9
        let wn = values[ii][kk-1] !== undefined ? values[ii][kk-1] : 9
        let on = values[ii][kk+1] !== undefined ? values[ii][kk+1] : 9
        let sn = values[ii+1] !== undefined ? values[ii+1][kk] : 9
        if (cn < nn && cn < wn && cn < on && cn < sn) {
            map += `\x1b[46m\x1b[37m${cn}\x1b[0m`
            sum += (cn + 1)
        } else {
            map += cn
        }
    }
    console.log(map)
}

console.log(sum)