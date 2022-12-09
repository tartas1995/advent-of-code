const fs = require('fs');
const input = fs.readFileSync('./day7.txt', { encoding:'utf-8'});

const MAX_SIZE = 70000000;
const UPDATE_SIZE = 30000000;

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
        if (filename !== undefined) {
            filesystem = browse(filesystem, [...cwd], { size, filename });
        }
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

const rootSize = register.find((directory) => {
    return directory.directory === "/"; 
});

const toBeFreedSpace = UPDATE_SIZE - (MAX_SIZE - rootSize.size);

console.log(toBeFreedSpace)


let smallestDirectory = rootSize;

for (let ii = 0; ii < register.length; ii++) {
    if (smallestDirectory.size > register[ii].size && register[ii].size >= toBeFreedSpace) {
        smallestDirectory = register[ii];
    }
}

console.log(smallestDirectory);
