const fs = require('fs');
const input = fs.readFileSync('./day5.txt', { encoding:'utf-8'});

let [ crateInput, instructionsInput ] = input.split("\n\n");

const instructions = instructionsInput.split('\n').map((str) => {
    const match = str.match(/move (\d+) from (\d+) to (\d+)/);
    return [ 
        parseInt(match[1], 10), 
        parseInt(match[2], 10), 
        parseInt(match[3], 10) 
    ];
});

const cratesLines = crateInput.split('\n').slice(0, -1);

const crates = [];

for (let ii = cratesLines.length - 1; ii >= 0; ii--) {
    const match = cratesLines[ii].match(/(\[[A-Z]\]\s?|   \s?)/g);
    for (let jj = 0; jj < match.length; jj++) {
        if (!crates[jj]) {
            crates[jj] = [];
        }
        const letter = match[jj].match(/([A-Z])/g);
        if (letter !== null) {
            crates[jj].push(letter[0]);
        }
    }
}

console.log(crates);
console.log(instructions);

for (let ii = 0; ii < instructions.length; ii++) {
    const instr = instructions[ii];
    crates[instr[2]-1].push(...crates[instr[1]-1].slice(-1*instr[0]))
    crates[instr[1]-1].splice(-1*instr[0])
}

console.log(crates);
let res = '';
for (let ii = 0; ii < crates.length; ii++) {
    res += crates[ii].pop();
}
console.log(res);