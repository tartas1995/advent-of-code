const fs = require('fs');
const input = fs.readFileSync('./day3.txt', { encoding:'utf-8'});

const RANGE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function getPrio(char) {
    return RANGE.indexOf(char) + 1;
}

const bagpacks = input.split("\n").map((bg) => {
    let split = bg.length / 2;
    return [bg.substring(0,split), bg.substring(split, bg.length)]
});

let sum = 0;
for (let ii = 0; ii < bagpacks.length; ii++) {
    const bagpack = bagpacks[ii];
    const register = {};
    for (let jj = 0; jj < bagpack[0].length; jj++) {
        const char = bagpack[0][jj];
        const index = bagpack[1].indexOf(char);
        if (index === -1) {
            continue;
        }
        register[char] = true;
    }
    Object.keys(register).forEach((char) => {
        sum += getPrio(char);
    })
}

console.log(sum)