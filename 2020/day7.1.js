//interesting display https://paiv.github.io/aoc2020/day/7/
const fs = require('fs')
const content = fs.readFileSync('./day7.txt',{encoding:'utf8', flag:'r'})
let groups = content.split('\n')
groups.pop()

//regex to extract bags
const regex  = /^(\w+ \w+ bag)s contain/i

//remove duplicates
const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}

//list of all the bag types that need to be searched for to extract (list A)
let listOfTypesToSearchFor = ['shiny gold bag']
//list of all the bag types that were searched (list B)
let listOfTypesSearchedFor = []

//run until to list A is empty
while(listOfTypesToSearchFor.length !== 0) {
  //get and remove the last element of list A
  let searchTerm = listOfTypesToSearchFor.pop()
  //add searchTerm to List B
  listOfTypesSearchedFor.push(searchTerm)
  //find row that contains searchTerm
  let rowWithType = groups.filter((e) => {
    return e.includes(searchTerm)
  })
  //get the first bag in the phrase (assuming that is the containing one)
  let canContainType = rowWithType.map((e) => {
    const match = e.match(regex)
    return match[1]
  })
  //filter duplicates and the searchTerm out
  canContainType = canContainType.filter(distinct).filter((e) => {
    return e !== searchTerm
  })
  //filter already searched terms and the already planned terms
  let filteredTypes = canContainType.filter((e) => {
    return !listOfTypesSearchedFor.includes(e)
      && !listOfTypesToSearchFor.includes(e)
  })
  //add array of bag that can contain searchTerm to List A
  listOfTypesToSearchFor.push(...filteredTypes)
}

//return length of list B - 1 to get the number of bag
//that can contain the shiny body
console.log(listOfTypesSearchedFor.length - 1)
