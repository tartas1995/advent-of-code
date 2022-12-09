const fs = require('fs');
const input = fs.readFileSync('./day7.txt', { encoding:'utf-8'});

const LIMIT = 100000;

const lines = input.split("\n");

const cwd = [];

let filesystem = {};

function browse(filesystem, cwd, data) {
    if (cwd.length === 0) {
        if (data.size === 'dir') {
            if (!filesystem[data.filename]) {
                filesystem[data.filename] = {};
            }
        } else {
            filesystem[data.filename] = parseInt(data.size, 10);
        }
    } else {
        const currentDirectory = cwd.shift();
        if (!filesystem[currentDirectory]) {
            filesystem[currentDirectory] = {};
        }
        filesystem[currentDirectory] = browse(filesystem[currentDirectory], [...cwd], data);
    }
    return filesystem;
}

for (let ii = 0; ii < lines.length; ii++) {
    const line = lines[ii];
    const isCommand = line[0] === "$";
    
    if (isCommand) {
        const command = line.substring(2, 4);
        switch (command) {
            case "ls":
                break;
            case "cd":
                const directory = line.substring(5);
                if (directory === '..') {
                    cwd.pop();
                } else {
                    cwd.push(directory);
                }
                break;
            default:
                console.error('wtf');
                break;
        }
    } else {
        const [ size, filename ] = line.split(" ");
        filesystem = browse(filesystem, [...cwd], { size, filename });
    }
}

const register = [];

function computeDirectorySize(filesystem, cwd = []) {
    let size = 0;
    for (let key in filesystem) {
        if (typeof filesystem[key] !== "number") {
            const sizeOfSubDirectory = computeDirectorySize(filesystem[key], [...cwd, key]);
            size += sizeOfSubDirectory;
        } else {
            size += filesystem[key];
        }
    }
    if (cwd.length !== 0) {
        register.push({
            directory: cwd.join(' '),
            size
        });
    }
    return size;
}

computeDirectorySize(filesystem);

const filteredRegister = register.filter((directory) => {
    return directory.size <= LIMIT;
})
/*
// I thought the highest sum of directories where the sum of sizes are below 100k
const combinations = [];

function getCombinations(active = [], rest = filteredRegister) {
    if (rest.length == 0) {
        if (active.length > 0) {
            const max = active.reduce((accumulator, directory) => { 
                return accumulator - directory.size 
            }, LIMIT);
            if (max < 10) {
                console.log(max);
            }
            combinations.push(active); 
        }
    } else {
        const max = active.reduce((accumulator, directory) => { 
            return accumulator - directory.size 
        }, LIMIT);
        const newRest = rest.filter((directory) => {
            return directory.size <= max;
        })
        if (newRest.length > 0) {
            getCombinations([...active, newRest[0]], newRest.slice(1));
            getCombinations([...active], newRest.slice(1));
        } else {
            combinations.push(active); 
        }
    }
}

getCombinations();

//console.log(combinations)


let highestScore = 0;
let combination = null;

for (let ii = 0; ii < combinations.length; ii++) {
    const comb = combinations[ii];
    let score = 0;
    for (let jj = 0; jj < comb.length; jj++) {
        score += comb[jj].size;
    }
    if (highestScore < score) {
        highestScore = score;
        combination = comb;
    }
}
*/

let score = 0;

for (let ii = 0; ii < filteredRegister.length; ii++) {
    score += filteredRegister[ii].size;
}

console.log(score);