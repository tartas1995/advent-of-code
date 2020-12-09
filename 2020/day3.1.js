const fs = require('fs')
const content = fs.readFileSync('./day3.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n')

const free = '.'
const tree = '#'

let numberOfTree = 0;

const dx = 3;
const dy = 1;

let posX = 0;
let posY = 0;

const charWorth = 1 / (values[0].length - 1)

while (values.length - 2 >= posY) {
  const row = values[posY]
  let value = posX + dx
  if (posX + dx > row.length - 1) {
    value = (posX + dx)%(row.length - 1) - 1
  }
  if (row[posX] === tree) {
    numberOfTree++
  }
  console.log(row.substr(0,posX) + '\x1b[46m' + row.substr(posX,1) + '\x1b[0m' + row.substr(posX+1,row.length), posX, row[posX])
  posY += dy
  posX = value
}
console.log(numberOfTree)
