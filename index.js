const { exit } = require("process")
const exec = require('child_process').execSync;
const fs = require('fs')
const https = require('https')

// basic check

if (process.argv.length === 2) {
    let command = ''
    switch (process.platform) { 
        case 'darwin' : command += 'open';
        case 'win32' : command += 'start';
        case 'win64' : command += 'start';
        default : command += 'xdg-open';
    }
    command += ` https://adventofcode.com/`;
    exec(command)
}

if (process.argv.length < 5) {
    console.log('node . YEAR DAY PART\n e.g. node . 2021 1 2')
    exit()
}

// FUNCTIONS

function openInputFile(year, day) {
    let command = ''
    switch (process.platform) { 
        case 'darwin' : command += 'open';
        case 'win32' : command += 'start';
        case 'win64' : command += 'start';
        default : command += 'xdg-open';
    }
    command += ` https://adventofcode.com/${year}/day/${day}/input`;
    exec(command)
}

// input validation

const year = parseInt(process.argv[2])
const day = parseInt(process.argv[3])
const part = parseInt(process.argv[4])

const currentDate = new Date()

if (year < 2015) {
    console.log('advent of code started in 2015')
    exit()
}
if (year > currentDate.getFullYear() || ( year === currentDate.getFullYear() && currentDate.getMonth() !== 11) ) {
    console.log('that advent of code would be in the future')
    exit()
}
// TODO FIX
if (year === 2017) {
    console.log('2017 structure is different and this doesnt work with it')
    exit()
}
// END

const dir = `${process.argv[1]}/${year}`
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}
process.chdir(dir)

if (day < 1 || day > 25) {
    console.log('that is not a day of the month')
    exit()
}

if (part < 1 || part > 2) {
    console.log('there are only 2 parts in a week')
    exit()
}

// actual process

let dontRun = false;

// check if file exists
const file = `./day${day}.${part}.js`
if (!fs.existsSync(file)) {
    // create empty file or "copy" previous part if present
    let content = ''
    if (part > 1 && fs.existsSync(`./day${day}.${part - 1}.js`)) {
        content = fs.readFileSync(`./day${day}.${part - 1}.js`,{encoding:'utf8', flag:'r'})
    }
    fs.writeFileSync(file, content)
    // open vscode
    exec(`code ${process.argv[1]}`)
    exec(`code ${file}`)
    // don't run the script
    dontRun = true
}

// check if inputFile exists
const inputFile = `./day${day}.txt`
if (!fs.existsSync(inputFile)) {
    // create empty file
    let content = ''
    fs.writeFileSync(file, content)
    // open links to input in browser
    openInputFile(year, day)
    // open file in vscode
    exec(`code ${process.argv[1]}`)
    exec(`code ${inputFile}`)
    // don't run the script
    dontRun = true
} 

// if not previously told not to, run script
if (!dontRun) {
    require(`${process.cwd()}/${file}`)
}