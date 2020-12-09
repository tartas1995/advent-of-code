const fs = require('fs')
const content = fs.readFileSync('./day2.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n')
const regex = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/

let validCount = 0;

for (let i in values) {
  const v = values[i]
  const rr = v.match(regex)
  if (!!rr) {
    const mini = parseInt(rr[1],10) - 1;
    const maxi = parseInt(rr[2],10) - 1;
    const letter = rr[3];
    const password = rr[4];
    const p1 = password[mini] === letter;
    const p2 = password[maxi] === letter;
    if ( (p1 && !p2) || (!p1 && p2)) {
        validCount++;
    }
  }
}
console.log(validCount)
