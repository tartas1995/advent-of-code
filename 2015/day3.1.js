const fs = require('fs')
const content = fs.readFileSync('./day3.txt',{encoding:'utf8', flag:'r'})

const instructions = content.split('')

//2564 is too low

let postion = {
    y:0,
    x:0
}

const fieldsVisited = {
    0: { 0: true }
}

let numberOfUniqueFields = 1;

while (instructions.length !== 0) {
    const instruction = instructions.shift();
    switch (instruction) {
        case '^':
            postion.y++;
            break;
        case 'v':
            postion.y--;
            break;
        case '>':
            postion.x++;
            break;
        case '<':
            postion.x--;
            break;
        default:
            console.log(`wtf is this: ${instruction}`)
    }
    if (!Object.prototype.hasOwnProperty.call(fieldsVisited, postion.x)) {
        fieldsVisited[postion.x] = {}
    }
    if (!fieldsVisited[postion.x][postion.y]) {
        numberOfUniqueFields++;
    }
    fieldsVisited[postion.x][postion.y] = true;
}

console.log(numberOfUniqueFields)