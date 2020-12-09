//interesting display https://paiv.github.io/aoc2020/day/7/
const fs = require('fs')
const content = fs.readFileSync('./day8.txt',{encoding:'utf8', flag:'r'})

//regex to extract bags
const regex  = /((?:acc|jmp|nop) (?:\+|-)\d+)/gi

const insts = content.match(regex)

const pathRegister = [
  [0, -1, -1, {}, 0, []]
]

const dive = (selectedRow, lastRow, changed, rowExecuteFrom, acc, accRegister) => {
  if (rowExecuteFrom[selectedRow] !== undefined) {
    return null
  }
  if (selectedRow === insts.length)  {
    return [changed, rowExecuteFrom, acc, accRegister]
  }
  rowExecuteFrom[selectedRow] = lastRow
  const inst = insts[selectedRow].split(' ')
  inst[1] =  parseInt(inst[1])
  if (inst[0] === 'acc') {
    accRegister.push(inst[1])
    pathRegister.push([selectedRow + 1, selectedRow, changed, rowExecuteFrom, acc + inst[1], accRegister])
  } else if (changed === -1 && inst[0] === 'jmp' || inst[0] === 'nop') {
    pathRegister.push([selectedRow + inst[1], selectedRow, inst[0] !== 'jmp' ? selectedRow : -1, rowExecuteFrom, acc, accRegister])
    pathRegister.push([selectedRow + 1, selectedRow, inst[0] !== 'nop' ? selectedRow : -1, rowExecuteFrom, acc, accRegister])
  } else if (inst[0] === 'jmp') {
    pathRegister.push([selectedRow + inst[1], selectedRow, changed, rowExecuteFrom, acc, accRegister])
  } else if (inst[0] === 'nop') {
    pathRegister.push([selectedRow + 1, selectedRow, changed, rowExecuteFrom, acc, accRegister])
  }
  return null
}

// correct would be 2251 for my input file
while(pathRegister.length !== 0) {
  const node = pathRegister.pop()
  const result = dive(node[0], node[1], node[2], node[3], node[4], node[5])
  if (result !== null) {
    console.log('changed: ',result[0])
    //console.log('rowExecuteFrom: ', result[1])
    console.log('acc (wrong fix file manually and run part 1): ', result[2])
    //console.log('accRegister: ', result[3])
    /*let nbr = 0
    for (let value of result[3]) {
      nbr += value
    }
    console.log(nbr)*/
  }
}
