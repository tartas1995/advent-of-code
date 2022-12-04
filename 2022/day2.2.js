// A is Rock
// B is Paper
// C is Scissor

// X is Rock
// Y is Paper
// Z is Scissor

// 1 is Rock
// 2 is Paper
// 3 is Scissor

// lost is 0
// draw is 3
// win is 6

Symbols = {
    Rock: 1,
    Paper: 2,
    Scissor: 3,
    A: "Rock",
    B: "Paper",
    C: "Scissor",
    X: "lose",
    Y: "draw",
    Z: "win",
}

WinTable = {
    Rock: "Paper",
    Paper: "Scissor",
    Scissor: "Rock",
}

LostTable = {
    Rock: "Scissor",
    Paper: "Rock",
    Scissor: "Paper",
}

ScoreTable = {
    lose: 0,
    draw: 3,
    win: 6
}

const fs = require('fs');
const input = fs.readFileSync('./day2.txt', { encoding:'utf-8'});

const rounds = input.split("\n");

let score = 0;

for (let ii = 0; ii < rounds.length; ii++) {
    const op = Symbols[rounds[ii][0]];
    const me = Symbols[rounds[ii][2]];
    score += ScoreTable[me]

    if (me === "draw") {
        score += Symbols[op]
    } else if (me === "win") {
        score += Symbols[WinTable[op]];
    } else {
        score += Symbols[LostTable[op]];
    }
}

console.log (score)