const fs = require('fs')
const content = fs.readFileSync('./day8.txt', { encoding: 'utf8', flag: 'r' })

/**
 * seven segments
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
 */

// 1 uses 2 segments
// 4 uses 4 segments
// 7 uses 3 segments
// 8 uses 7 segments

const lines = content.split("\n")
const records = lines.map((line) => {
    return line.split(" | ").map((s) => {
        return s.split(" ")
    })
})

let count = 0

for (let record of records) {
    for (let digit of record[1]) {
        let length = digit.length
        if (length === 2) count++
        if (length === 4) count++
        if (length === 3) count++
        if (length === 7) count++
    }
}

console.log(count)