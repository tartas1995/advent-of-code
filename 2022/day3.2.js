const fs = require('fs');
const input = fs.readFileSync('./day3.txt', { encoding:'utf-8'});

const RANGE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function getPrio(char) {
    return RANGE.indexOf(char) + 1;
}

const bagpacks = input.split("\n");

const groups = [];

const chunkSize = 3;
for (let i = 0; i < bagpacks.length; i += chunkSize) {
    const group = bagpacks.slice(i, i + chunkSize);
    groups.push(group);
}


let sum = 0;
for (let ii = 0; ii < groups.length; ii++) {
    const group = groups[ii];
    let badge = null;
    for (let jj = 0; jj < group[0].length; jj++) {
        const char = group[0][jj];
        const index2 = group[1].indexOf(char);
        const index3 = group[2].indexOf(char);
        if (index2 === -1 || index3 === -1) {
            continue;
        }
        badge = char;
        break; 
    }
    sum += getPrio(badge);
}

console.log(sum)