//interesting display https://paiv.github.io/aoc2020/day/7/
const fs = require('fs')
const content = fs.readFileSync('./day8.txt',{encoding:'utf8', flag:'r'})

//regex to extract bags
const regex  = /((?:acc|jmp|nop) (?:\+|-)\d+)/gi

const insts = content.match(regex)

let rowExecuteXTime = {}

let acc = 0;
let selectedRow = 0;

// selectedRow !== insts.length is to make it work on a fixed input file
while (rowExecuteXTime[selectedRow] === undefined && selectedRow !== insts.length) {
  rowExecuteXTime[selectedRow] = 1
  const inst = insts[selectedRow].split(' ')
  if (inst[0] === 'acc') {
    inst[1] =  parseInt(inst[1])
    acc += inst[1]
    selectedRow++
  } else if (inst[0] === 'jmp') {
    inst[1] =  parseInt(inst[1])
    selectedRow += inst[1]
  } else {
    selectedRow++
  }
}


console.log(acc)
