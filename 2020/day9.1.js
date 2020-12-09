const fs = require('fs')
const content = fs.readFileSync('./day9.txt',{encoding:'utf8', flag:'r'})

const regex = /(\d+)/g
const preambleLength = 25

let nbrRay = content.match(regex)

nbrRay = nbrRay.map(n => parseInt(n))

let cache = []

for (let i = 0; i < preambleLength; i++) {
    cache.push(nbrRay.shift())
}

const isSumOfCache = (n) => {
    const filtered = cache.filter(m => m<n)
    for (let m of filtered) {
        if (filtered.indexOf(n-m) !== -1) {
            return true
        }
    }
    return false
}

let n = null
let isSum = false
do {
    isSum = false
    n = nbrRay.shift()
    isSum = isSumOfCache(n)
    if (isSum) {
        cache.shift()
        cache.push(n)
    }
} while (isSum)

console.log(cache)
console.log(n)


/**
 * cache 25 number
 * drop the first one when we add another
 * and the added number needs to be the sum of 2 of the previously cached numbers
 * 
 * find the first number in the file that is not the result of the process
 */

