const fs = require('fs');
const input = fs.readFileSync('./day8.txt', { encoding:'utf-8'});

const trees = input.split("\n")
                    .map(line => line.split('').map(s => parseInt(s, 10)));

function getScenicScore(posY, posX) {
    const value = trees[posY][posX];
    let scenicTop = 0;
    let scenicBottom = 0;
    let scenicLeft = 0;
    let scenicRight = 0;
    //North
    for (let yy = posY - 1; yy >= 0; yy--) {
        scenicTop++;
        if (trees[yy][posX] >= value) {
            break;
        }
    }
    //South
    for (let yy = posY + 1; yy < trees.length; yy++) {
        scenicBottom++;
        if (trees[yy][posX] >= value) {
            break;
        }
    }
    //West
    for (let xx = posX - 1; xx >= 0; xx--) {
        scenicLeft++;
        if (trees[posY][xx] >= value) {
            break;
        }
    }
    //East
    for (let xx = posX + 1; xx < trees[posY].length; xx++) {
        scenicRight++;
        if (trees[posY][xx] >= value) {
            break;
        }
    }
    return scenicTop * scenicBottom * scenicLeft * scenicRight;
}

let highestScore = 0;

for (let yy = 1; yy < trees.length - 1; yy++) {
    for (let xx = 1; xx < trees.length - 1; xx++) {
        const score = getScenicScore(yy, xx);
        if (highestScore < score) {
            highestScore = score
        }
    }
}

console.log(highestScore)