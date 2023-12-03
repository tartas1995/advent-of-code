const fs = require('fs');
const input = fs.readFileSync('./day1.txt', { encoding:'utf-8'});

const regex = /(\d)/g;

const numbers = input.split("\n").map((str) => {
    return [...str.match(regex)];
})

console.log(numbers);

let sum = 0;

numbers.forEach((arr) => {
    sum += parseInt(`${arr[0]}${arr[arr.length - 1]}`, 10);
})

console.log(sum);