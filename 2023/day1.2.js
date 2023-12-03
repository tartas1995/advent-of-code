const fs = require('fs');
const input = fs.readFileSync('./day1.txt', { encoding:'utf-8'});

const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

const numbers = input.split("\n").map((str) => {
    return [...str.matchAll(regex)].map((value) => {
        switch (value[1]) {
            case "one": return 1;
            case "two": return 2;
            case "three": return 3;
            case "four": return 4;
            case "five": return 5;
            case "six": return 6;
            case "seven": return 7;
            case "eight": return 8;
            case "nine": return 9;
            default: return parseInt(value[1], 10);
        }
    })
})

console.log(numbers);

let sum = 0;

numbers.forEach((arr) => {
    sum += parseInt(`${arr[0]}${arr[arr.length - 1]}`, 10);
})

console.log(sum);