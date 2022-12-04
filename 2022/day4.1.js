const fs = require('fs');
const input = fs.readFileSync('./day4.txt', { encoding:'utf-8'});

const assignments = input.split("\n").map((assignment) => {
    return assignment.split(',').map((assignmentPerElf) => {
        return assignmentPerElf.split('-').map((num) => {
            return parseInt(num, 10);
        });
    })
})

let counter = 0;

for (let ii = 0; ii < assignments.length; ii++) {
    const assignment = assignments[ii];
    // if 1 is contain in 0
    if (assignment[0][0] <= assignment[1][0] && assignment[1][1] <= assignment[0][1]) {
        counter++;
    // if 0 is contain in 1
    } else if (assignment[1][0] <= assignment[0][0] && assignment[0][1] <= assignment[1][1]) {
        counter++;
    }
}

console.log(counter);