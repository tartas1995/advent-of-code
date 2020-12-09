const fs = require('fs')
const content = fs.readFileSync('./day1.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n')
values = values.map(v => parseInt(v,10))
for (let i in values) {
  const v = values[i]
  for (let j in values) {
    if (i===j) continue;
    const w = values[j]
    if (v+w===2020) {
      console.log(v*w);
    }
  }
}
console.log(values)
