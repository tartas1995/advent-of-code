const fs = require('fs');
const input = fs.readFileSync('./day3.txt', { encoding:'utf-8'});

const map = input.split("\n").map((line) => {return line.split("")});

// get numbers and location of numbers
const numbers = [];
// get symbol and location of symbols
const symbolLocations = [];
for (let key in map) {
    let currentNumber = {
        locations: [],
        numberStr: "",
        valid: false,
    };
    const ln = key;
    const line = map[key];
    for (let key in line) {
        const char = line[key];
        if (!isNaN(char)) {
            currentNumber.locations.push({y: parseInt(ln), x:parseInt(key)});
            currentNumber.numberStr += char;
        } else {
            if (currentNumber.numberStr !== "") {
                numbers.push(currentNumber);
                currentNumber = {
                    locations: [],
                    numberStr: "",
                    valid: false,
                };
            }
            if (char !== ".") symbolLocations.push({y: parseInt(ln), x:parseInt(key)});
        }
    }
}

for (let location of symbolLocations) {
    for (let number of numbers) {
        for (let numLoc of number.locations) {
            if (
                ((location.x - 1) <= numLoc.x && (location.x + 1) >= numLoc.x)
                &&
                ((location.y - 1) <= numLoc.y && (location.y + 1) >= numLoc.y)
            ) number.valid = true;
        }
    }
}

let sum = 0;
for (let number of numbers) {
    if (number.valid) sum += parseInt(number.numberStr, 10);
}

console.log(sum);

// 524521 too low