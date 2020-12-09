const fs = require('fs')
const content = fs.readFileSync('./day2.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n')
const regex = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/

let validCount = 0;

for (let i in values) {
  const v = values[i]
  const rr = v.match(regex)
  if (!!rr) {
    const mini = parseInt(rr[1],10);
    const maxi = parseInt(rr[2],10);
    const letter = rr[3];
    const password = rr[4];
    console.log(mini, maxi, letter, password);
    let nbrOfletter = 0;
    for (let c of password) {
      if (c===letter) nbrOfletter++;
    }
    console.log(nbrOfletter);
    console.log(nbrOfletter >= mini && nbrOfletter <= maxi);
    if (nbrOfletter >= mini && nbrOfletter <= maxi) validCount++;
  }
}
console.log(validCount)
