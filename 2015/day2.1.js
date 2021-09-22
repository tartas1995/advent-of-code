const fs = require('fs')
const content = fs.readFileSync('./day2.txt',{encoding:'utf8', flag:'r'})

//2*l*w + 2*w*h + 2*h*l. 
// 1. l
// 2. w
// 3. h
// 1679962 is too high
// 1591738 is too high
// 1588178 is correct


const regex = /(\d+x\d+x\d+)/g

let gifts = content.match(regex)

gifts = gifts.map(e => e.split('x').map(e => parseInt(e)))

let total = 0

for (let gift of gifts) {
    const l = gift[0]
    const w = gift[1]
    const h = gift[2]
    let slack = 0;
    console.log(`l:${l}  w:${w}  h:${h}`);
    if (l >= w && l >= h) {
        console.log('l is tallest');
        slack = w*h; 
    } else if (w >= l && w >= h) {
        console.log('w is tallest');
        slack = l*h;
    } else {
        console.log('h is tallest');
        slack = w*l;
    }
    const f = (2*((l*w)+(w*h)+(h*l))) + slack//(2*l*w) + (2*w*h) + (2*h*l) + slack
    console.log(`(2*((${l}*${w})+(${w}*${h})+(${h}*${l}))) + ${slack}=${f}`)
    total += f
}

console.log(total)