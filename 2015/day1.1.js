const fs = require('fs')
const content = fs.readFileSync('./day1.txt',{encoding:'utf8', flag:'r'})

const open = /\(/g
const close = /\)/g

const opens = content.match(open)
const closes = content.match(close)

console.log(opens.length - closes.length)