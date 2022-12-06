const fs = require('fs');
const input = fs.readFileSync('./day6.txt', { encoding:'utf-8'});

for (let ii = 0; ii < input.length - 4; ii++) {
    const subStr = input.slice(ii, ii + 4);
    let unique = true;
    for (let jj = 0; jj < subStr.length; jj++) {
        if (subStr.indexOf(subStr[jj]) !== jj) {
            unique = false;
            break;
        }
    }
    if (unique) {
        console.log(subStr, ii + 4)
        break;
    }
}