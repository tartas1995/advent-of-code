const fs = require('fs')
const content = fs.readFileSync('./day2.txt',{encoding:'utf8', flag:'r'})

//2*l*w + 2*w*h + 2*h*l. 
// 1. l
// 2. w
// 3. h
// correct 3783758


const regex = /(\d+x\d+x\d+)/g

let gifts = content.match(regex)

gifts = gifts.map(e => e.split('x').map(e => parseInt(e)))

let total = 0

for (let gift of gifts) {
    const l = gift[0]
    const w = gift[1]
    const h = gift[2]
    let wrap = 0;
    if (l >= w && l >= h) {
        wrap = (2*w)+(2*h); 
    } else if (w >= l && w >= h) {
        wrap = (2*l)+(2*h);
    } else {
        wrap = (2*l)+(2*w);
    }
    const f = l*w*h
    const r = wrap + f
    total += r
}

console.log(total)