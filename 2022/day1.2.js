const fs = require('fs');
const input = fs.readFileSync('./day1.txt', { encoding:'utf-8'});

const elves = input.split("\n\n").map((inv) => {
    return inv.split("\n")
        .filter((num) => {
            return num.length > 0
        })
        .map((num) => {
            return parseInt(num, 10);
        })
})


const Ranking = []

for (let ii = 0; ii < elves.length; ii++) {
    let sum = 0;
    for (let jj = 0; jj < elves[ii].length; jj++) {
        sum +=  elves[ii][jj];
    }
    Ranking.push({
        index: ii,
        sum
    })
}

Ranking.sort((a, b) => {
    if (a.sum < b.sum) {
        return 1;
    } else if (a.sum > b.sum) {
        return -1;
    } else {
        return 0;
    }
})

console.log(Ranking)

let sumOfHighest3 = 0;
for (let ii = 0; ii < 3; ii++) {
    sumOfHighest3 += Ranking[ii].sum;
    console.log(`Index: ${Ranking[ii].index}`)
    console.log(`Calories: ${Ranking[ii].sum}`)
    console.log(`Elf: ${elves[Ranking[ii].index]}`)
}

console.log(`Sum of Highest 3: ${sumOfHighest3}`)
