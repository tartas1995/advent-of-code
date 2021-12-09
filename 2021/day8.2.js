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

 a is active in 0,2,3,5,6,7,8,9
 b is active in 0,4,5,6,8,9
 c is active in 0,1,2,3,4,7,8,9
 d is active in 2,3,4,5,6,8,9
 e is active in 0,2,6,8,9
 f is active in 0,1,3,4,5,6,7,8,9
 g is active in 0,2,3,5,6,8,9

 a is not active in 1,4
 b is not active in 1,2,3,7
 c is not active in 5,6
 d is not active in 0,1,7
 e is not active in 1,3,4,5,7
 f is not acitve in 2
 g is not active in 1,4,7

 unique
 1 uses 2 segments
 4 uses 4 segments
 7 uses 3 segments
 8 uses 7 segments

 0 uses 6 segments
 2 uses 5 segments
 3 uses 5 segments
 5 uses 5 segments
 6 uses 6 segments
 9 uses 6 segments
 */

const lines = content.split("\n")
const records = lines.map((line) => {
    return line.split(" | ").map((s) => {
        return s.split(" ")
    })
})

function filter(register, segment, segments) {
    return register[segment].filter((c) => {
        return (segments.indexOf(c) !== -1)
    })
}

let sum = 0

for (let record of records) {
    const register = {
        a: ['a','b','c','d','e','f','g'],
        b: ['a','b','c','d','e','f','g'],
        c: ['a','b','c','d','e','f','g'],
        d: ['a','b','c','d','e','f','g'],
        e: ['a','b','c','d','e','f','g'],
        f: ['a','b','c','d','e','f','g'],
        g: ['a','b','c','d','e','f','g'],
    }
    for (let digit of record[0]) {
        let length = digit.length
        if (length === 2) {
            // 1 uses c and f
            let segments = digit.split('')
            register['c'] = filter(register, 'c', segments)
            register['f'] = filter(register, 'f', segments)
        } else if (length === 4) {
            // 4 uses b, c, d and f
            let segments = digit.split('')
            register['b'] = filter(register, 'b', segments)
            register['c'] = filter(register, 'c', segments)
            register['d'] = filter(register, 'd', segments)
            register['f'] = filter(register, 'f', segments)
        } else if (length === 3) {
            // 7 uses a, c and f
            let segments = digit.split('')
            register['a'] = filter(register, 'a', segments)
            register['c'] = filter(register, 'c', segments)
            register['f'] = filter(register, 'f', segments)
        } else if (length === 5) {
            // all 5 segments digits include d
            let segments = digit.split('')
            register['d'] = filter(register, 'd', segments)
        } else if (length === 6) {
            // all 6 segments digits include a, b, f, g
            let segments = digit.split('')
            register['a'] = filter(register, 'a', segments)
            register['b'] = filter(register, 'b', segments)
            register['f'] = filter(register, 'f', segments)
            register['g'] = filter(register, 'g', segments)
        }
    }
    // remove finds
    while (register['a'].length !== 1 || register['b'].length !== 1
        || register['c'].length !== 1 || register['d'].length !== 1
        || register['e'].length !== 1 || register['f'].length !== 1
        || register['g'].length !== 1) {
        const ToBeRemoved = {}
        for (let segment in register) {
            if (register[segment].length === 1) {
                ToBeRemoved[segment] = register[segment][0]
            }
        }
        for (let segment in register) {
            register[segment] = register[segment].filter((c) => {
                let found = false
                for (let index in ToBeRemoved) {
                    if (index === segment)break;
                    if (c === ToBeRemoved[index]) {
                        found = true
                    }
                }
                return !found;
            })
        }
            
    }
    //inverse mapping
    const map = {}
    for (let segment in register) {
        map[register[segment][0]] = segment
    }
    // restore digit
    let digit = ''
    for (let code of record[1]) {
        const segments = code.split('')
        const length = segments.length
        if (length === 2) {
            // 1 uses c and f
            digit += "1"
        } else if (length === 4) {
            // 4 uses b, c, d and f
            digit += "4"
        } else if (length === 3) {
            // 7 uses a, c and f
            digit += "7"
        } else if (length === 7) {
            // 8 uses all 7 segments
            digit += "8"
        } else if (length === 5) {
            let found = { b: false, e: false }
            for (let segment of code) {
                if (map[segment] === "b") found.b = true
                if (map[segment] === "e") found.e = true
            }
            if (found.b) {
                // if b -> 5
                digit += "5"
            } else if (found.e) {
                // if e -> 2
                digit += "2"
            } else {
                // else -> 3
                digit += "3"
            }
            
        } else if (length === 6) {
            let found = { d: false, c: false, e: false }
            for (let segment of code) {
                if (map[segment] === "d") found.d = true
                if (map[segment] === "c") found.c = true
                if (map[segment] === "e") found.e = true
            }
            if (!found.d) {
                // if not d -> 0
                digit += "0"
            } else if (found.c) {
                // else if c -> 9
                digit += "9"
            } else if (found.e){
                //else if e -> 6
                digit += "6"
            } else {
                console.log('wait what')
            }
        }
    }
    console.log(digit)
    const number = parseInt(digit)
    sum += number
}

console.log(sum)