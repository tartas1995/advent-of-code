const fs = require('fs')
const content = fs.readFileSync('./day3.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n')

const free = '.'
const tree = '#'

let result = 1;

const dx = [1,3,5,7,1];
const dy = [1,1,1,1,2];

for (let i = 0; i < dx.length; i++) {
  const subDx = dx[i]
  const subDy = dy[i]
  let numberOfTree = 0
  let posX = 0;
  let posY = 0;
  while (values.length - 2 >= posY) {
    const row = values[posY]
    let value = posX + subDx
    if (posX + subDx > row.length - 1) {
      value = (posX + subDx)%(row.length - 1) - 1
    }
    if (row[posX] === tree) {
      numberOfTree++
    }
    console.log(row.substr(0,posX) + '\x1b[46m' + row.substr(posX,1) + '\x1b[0m' + row.substr(posX+1,row.length), posX, row[posX])
    posY += subDy
    posX = value
  }
  console.log(numberOfTree)
  result *= numberOfTree;
}
console.log(result)
