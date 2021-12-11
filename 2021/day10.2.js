const fs = require('fs')
const content = fs.readFileSync('./day10.txt', { encoding: 'utf8', flag: 'r' })
const lines = content.split("\n")

const syntaxScore = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
}

const regex = /((?:\(|\[|\{|<)(?:\)|\]|\}|>))/

const uncorruptedCleanedLines = []

for (let line of lines) {
    let cleanedLine = line
    let chunk = null
    let corrupted = false
    while ((chunk = cleanedLine.match(regex)) !== null) {
        let type  = chunk[1][0]
        if (type === "(" && chunk[1][1] !== ")") {
            corrupted = true
        } else if (type === "[" && chunk[1][1] !== "]") {
            corrupted = true
        } else if (type === "{" && chunk[1][1] !== "}") {
            corrupted = true
        } else if (type === "<" && chunk[1][1] !== ">") {
            corrupted = true
        }
        cleanedLine = cleanedLine.slice(0,chunk['index']) + cleanedLine.slice(chunk['index']+2)
    } 
    if (!corrupted) {
        uncorruptedCleanedLines.push(cleanedLine)
    }
}

let results = []

for (let line of uncorruptedCleanedLines) {
    let result = 0
    for (let ii = line.length - 1; ii > -1; ii--) {
        result *= 5
        result += syntaxScore[line[ii]]
    }
    results.push(result)
}

results.sort((a,b) => {return a -b})

console.log(results[Math.floor(results.length/2)])

