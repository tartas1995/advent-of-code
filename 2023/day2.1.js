const fs = require('fs');
const input = fs.readFileSync('./day2.txt', { encoding:'utf-8'});

const cubes = { red: 12, blue: 14, green: 13 };

const games = input.split("\n").map((line) => {
    const game = line.split(":");
    const ID = parseInt(game[0].match(/(\d+)/g), 10 );
    const pulls = game[1].split(";").map((pullstr) => {
        const pull = {};
        pullstr.split(",").forEach((cubes) => {
            const color = cubes.match(/red|green|blue/g);
            const number = cubes.match(/(\d+)/g);
            pull[color] = parseInt(number, 10);
        });
        return pull;
    });
    return { id: ID, pulls };
});

let sum_of_valid_games = 0;

games.forEach((game) => {
    if (!game.pulls.some((pull) => {
        return pull.red > cubes.red || pull.green > cubes.green || pull.blue > cubes.blue;
    })) {
        console.log(game.id);
        sum_of_valid_games += game.id;
    }
});

console.log("result:", sum_of_valid_games);