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

let sum_of_minimum_cubes = 0;

games.forEach((game) => {
    const minimum = { red: 0, green: 0, blue: 0 };
    game.pulls.forEach((pull) => {
        if (pull.red > minimum.red) minimum.red = pull.red;
        if (pull.green > minimum.green) minimum.green = pull.green;
        if (pull.blue > minimum.blue) minimum.blue = pull.blue;
    })
    console.log(minimum);
    sum_of_minimum_cubes += (minimum.red * minimum.green * minimum.blue);
});

console.log("result:", sum_of_minimum_cubes);