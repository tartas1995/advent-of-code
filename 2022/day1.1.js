const fs = require('fs');
const input = fs.readFileSync('./day1.txt', { encoding:'utf-8'});

const elves = input.split("\n\n").map((inv) => {
    return inv.split("\n").map((num) => {
        return parseInt(num, 10);
    })
})

let highestCalElfIndex = null;
let highestCalSum = 0;
for (let ii = 0; ii < elves.length; ii++) {
    let sum = 0;
    for (let jj = 0; jj < elves[ii].length; jj++) {
        sum +=  elves[ii][jj];
    }
    if (highestCalElfIndex === null || highestCalSum < sum) {
        highestCalElfIndex = ii;
        highestCalSum = sum;
    }
}

console.log(`Index: ${highestCalElfIndex}`)
console.log(`Calories: ${highestCalSum}`)
console.log(`Elf: ${elves[highestCalElfIndex]}`)