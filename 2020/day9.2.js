const fs = require('fs')
const content = fs.readFileSync('./day9.txt',{encoding:'utf8', flag:'r'})

const regex = /(\d+)/g
const preambleLength = 25

let nbrRay = content.match(regex)

nbrRay = nbrRay.map(n => parseInt(n))
const nbrRayBackUp = [...nbrRay];

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

console.log('invalid number:', n)

nbrRay = nbrRayBackUp

let foundSet = false
let range = [-1, nbrRay.length - 1]
do {
    range[0]++
    let sum = 0
    for (let i = range[0]; i < range[1]; i++) {
        sum += nbrRay[i]
        if (sum === n) {
            range[1] = i
            foundSet = true
            break
        } else if (sum > n) {
            break
        }
    }
} while (!foundSet)

let min = -1
let max = -1

for (let i = range[0]; i <= range[1]; i++) {
    if (min === -1) min = nbrRay[i]
    if (max === -1) max = nbrRay[i]
    if (min > nbrRay[i]) min = nbrRay[i]
    if (max < nbrRay[i]) max = nbrRay[i]
}

console.log('min:',min, 'max:', max)
console.log('min+max: ',min + max)



/**
 * find a contiguous set of at least two numbers
 * those number result in the nbr found in part 1
 * 
 * 71721541 is too big
 * 67044077 is too low
 */

