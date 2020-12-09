const fs = require('fs')
const content = fs.readFileSync('./day6.txt',{encoding:'utf8', flag:'r'})
let groups = content.split('\n\n')

const regex  = /([a-z])/gi
const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}

groups = groups.map(e => e.match(regex).filter(distinct))

let nbr = 0

for (let e of groups) {
  nbr += e.length
}

console.log(nbr)
