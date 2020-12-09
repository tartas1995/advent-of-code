const fs = require('fs')
const content = fs.readFileSync('./day4.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n\n')

let nbr = 0;

const regex = /(byr:|pid:|eyr:|hgt:|iyr:|ecl:|hcl:|cid:)[^\s]+/g

const requiredField = ['byr','pid','eyr','hgt','iyr','ecl','hcl']

for (pp of values) {
  const match = pp.match(regex)
  let nbrOfRequiredFieldsPresent = 0
  for (field of requiredField) {
    for (e of match) {
      const splitE = e.split(':')
      if (splitE[0] === field) {
        nbrOfRequiredFieldsPresent++
        break
      }
    }
  }
  if (nbrOfRequiredFieldsPresent === requiredField.length) nbr++
}

console.log(nbr);
