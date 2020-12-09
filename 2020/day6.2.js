const fs = require('fs')
const content = fs.readFileSync('./day6.txt',{encoding:'utf8', flag:'r'})
let groups = content.split('\n\n')

groups = groups.map(e => e.split('\n'))

//remove last empty row (that atom enforces)
groups[groups.length - 1].pop()

let nbr = 0

for (let group of groups) {
  let counterObj = {}
  for (let person of group) {
    let splitted = person.split('')
    for (let l of splitted) {
      if (!counterObj[l]) counterObj[l] = 0
      counterObj[l]++
    }
  }
  for (let q in counterObj) {
    if (counterObj[q] === group.length) {
      nbr++
    }
  }
}

console.log(nbr)
