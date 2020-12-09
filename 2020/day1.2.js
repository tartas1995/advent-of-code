const fs = require('fs')
const content = fs.readFileSync('./day1.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n')
values = values.map(v => parseInt(v,10))
for (let i in values) {
  const v = values[i]
  for (let j in values) {
    if (i===j) continue;
    const w = values[j]
    for (let k in values) {
      if (k===j || i===k) continue;
      const u = values[k]
      if (v+w+u===2020) {
        console.log(v*w*u);
      }
    }
  }
}
console.log(values)
