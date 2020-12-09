const fs = require('fs')
const content = fs.readFileSync('./day4.txt',{encoding:'utf8', flag:'r'})
let values = content.split('\n\n')

let nbr = 0;

const regex = /(byr:|pid:|eyr:|hgt:|iyr:|ecl:|hcl:|cid:)[^\s]+/g
const color = /^#[0-9A-F]{6}$/ig
const pid = /^[0-9]{9}$/ig

const requiredField = ['byr','pid','eyr','hgt','iyr','ecl','hcl']

for (pp of values) {
  const match = pp.match(regex)
  let nbrOfRequiredFieldsPresent = 0
  for (field of requiredField) {
    for (e of match) {
      const splitE = e.split(':')
      if (splitE[0] === field) {
        if (field === 'byr') {
          const year = parseInt(splitE[1])
          if (year >= 1920 && year <= 2002) {
            nbrOfRequiredFieldsPresent++
          }
        }
        if (field === 'iyr') {
            const year = parseInt(splitE[1])
            if (year >= 2010 && year <= 2020) {
              nbrOfRequiredFieldsPresent++
            }
        }
        if (field === 'eyr') {
          const year = parseInt(splitE[1])
          if (year >= 2020 && year <= 2030) {
            nbrOfRequiredFieldsPresent++
          }
        }
        if (field === 'hgt') {
          const height = parseInt(splitE[1])
          const type = splitE[1].substr(-2,2)
          if (type === 'in' && height >= 59 && height <= 76) {
            nbrOfRequiredFieldsPresent++
          }
          if (type === 'cm' && height >= 150 && height <= 193) {
            nbrOfRequiredFieldsPresent++
          }
        }
        if (field === 'hcl') {
          const match = splitE[1].match(color)
          if (match !== null) {
            nbrOfRequiredFieldsPresent++
          }
        }
        if (field === 'ecl') {
          const ec = splitE[1]
          if (ec === 'amb' || ec === 'blu' || ec === 'brn' ||
              ec === 'gry' || ec === 'grn' || ec === 'hzl' ||
              ec === 'oth' ) {
            nbrOfRequiredFieldsPresent++
          }
        }
        if (field === 'pid') {
          const match = splitE[1].match(pid)
          if (match !== null) {
            nbrOfRequiredFieldsPresent++
          }
        }
        break
      }
    }
  }
  if (nbrOfRequiredFieldsPresent === requiredField.length) nbr++
}

console.log(nbr);
