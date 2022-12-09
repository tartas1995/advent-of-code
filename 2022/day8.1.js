const fs = require('fs');
const input = fs.readFileSync('./day8.txt', { encoding:'utf-8'});

const trees = input.split("\n")
                    .map(line => line.split('').map(s => parseInt(s, 10)));

function isVisible(posY, posX) {
    const value = trees[posY][posX];
    let isVisibleTop = true;
    let isVisibleBottom = true;
    let isVisibleLeft = true;
    let isVisibleRight = true;
    //North
    for (let yy = 0; yy < posY; yy++) {
        if (trees[yy][posX] >= value) {
            isVisibleTop = false;
        }
    }
    //South
    for (let yy = posY + 1; yy < trees.length; yy++) {
        if (trees[yy][posX] >= value) {
            isVisibleBottom = false;
        }
    }
    //West
    for (let xx = 0; xx < posX; xx++) {
        if (trees[posY][xx] >= value) {
            isVisibleLeft = false;
        }
    }
    //East
    for (let xx = posX + 1; xx < trees[posY].length; xx++) {
        if (trees[posY][xx] >= value) {
            isVisibleRight = false;
        }
    }
    return isVisibleTop
        || isVisibleBottom
        || isVisibleLeft
        || isVisibleRight;
}

let count = 0;

for (let yy = 1; yy < trees.length - 1; yy++) {
    //let str = "";
    for (let xx = 1; xx < trees.length - 1; xx++) {
        const vis = isVisible(yy, xx);
        /*
        if (vis) {
            str += `\x1b[33m${trees[yy][xx]}\x1b[0m`;
        } else {
            str += `${trees[yy][xx]}`;
        }
        */
        count += vis ? 1 : 0;
    }
    //console.log(str);
}

const borderCount = (trees.length*2) + (trees[0].length*2) - 4;

console.log(`interior visible: ${count}`)
console.log(`exterior visible: ${borderCount}`)

console.log(`total visible: ${borderCount + count}`)