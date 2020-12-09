//interesting display https://paiv.github.io/aoc2020/day/7/
const fs = require('fs')
const content = fs.readFileSync('./day7.txt',{encoding:'utf8', flag:'r'})
let groups = content.split('\n')
groups.pop()

//regex to extract bags
const regex  = /(\d+) (\w+ \w+ bag)/gi

const dive = (node) => {
  const multiplier = node[0]
  const searchTerm = node[1]
  const rowWithType = groups.filter((e) => {
    return e.includes(`${searchTerm}s contain`)
  })
  const contains = []
  rowWithType.forEach((e) => {
    const match = [...e.matchAll(regex)]
    if (match === null)return null
    contains.push(...match.map((n) => {
      return [parseInt(n[1]), n[2]]
    }))
  })
  if (contains.length === 0) {
    return multiplier
  }
  let nbr = multiplier
  for (let n of contains) {
    const result = dive(n) * multiplier
    nbr += result
  }
  return nbr
}

console.log(dive([ 1 ,'shiny gold bag']) - 1)
