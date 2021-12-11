const fs = require('fs')
const content = fs.readFileSync('./day10.txt', { encoding: 'utf8', flag: 'r' })
const lines = content.split("\n")

const syntaxScore = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}

//const regex = /(\(\)|\[\]|\{\}|<>)/
const regex = /((?:\(|\[|\{|<)(?:\)|\]|\}|>))/

let sum = 0

for (let line of lines) {
    let cleanedLine = line
    let chunk = null
    while ((chunk = cleanedLine.match(regex)) !== null) {
        let type  = chunk[1][0]
        if (type === "(" && chunk[1][1] !== ")") {
            sum += syntaxScore[chunk[1][1]]
        } else if (type === "[" && chunk[1][1] !== "]") {
            sum += syntaxScore[chunk[1][1]]
        } else if (type === "{" && chunk[1][1] !== "}") {
            sum += syntaxScore[chunk[1][1]]
        } else if (type === "<" && chunk[1][1] !== ">") {
            sum += syntaxScore[chunk[1][1]]
        }
        cleanedLine = cleanedLine.slice(0,chunk['index']) + cleanedLine.slice(chunk['index']+2)
    } 
}

console.log(sum)

