const fs = require('fs')
const content = fs.readFileSync('./day5.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n')
values.pop()

//let seatIds = []
let highestSeatId = -1

const minRow = 0
const maxRow = 127
const minColumn = 0
const maxColumn = 7

for (let pp of values) {
  const ppArray = pp.split('')
  let row = -1
  let column = -1
  let rowRange = [minRow, maxRow]
  let columnRange = [minColumn, maxColumn]
  for (let i = 0; i < 7; i++) {
    const inst = ppArray[i]
    const difference = rowRange[1] - rowRange[0]
    const step = Math.ceil(difference / 2);
    if (inst === 'F') {
      rowRange[1] = rowRange[1] - step
    } else if (inst === 'B') {
      rowRange[0] = rowRange[0] + step
    } else {
      console.log('error', inst)
    }
  }
  if (rowRange[0]===rowRange[1]) {
    row = rowRange[0]
  }
  for (let i = 7; i < 10; i++) {
    const inst = ppArray[i]
    const difference = columnRange[1] - columnRange[0]
    const step = Math.ceil(difference / 2);
    if (inst === 'L') {
      columnRange[1] = columnRange[1] - step
    } else if (inst === 'R') {
      columnRange[0] = columnRange[0] + step
    } else {
      console.log('error', inst)
    }
  }
  if (columnRange[0]===columnRange[1]) {
    column = columnRange[0]
  }
  let seatId = (row * 8) + column
  if (seatId > highestSeatId)  {
    highestSeatId = seatId
  }
}
console.log(highestSeatId)
