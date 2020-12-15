const solution = (filename, turns) => {
  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const numbers = input.split(",").map((x) => parseInt(x));

  const positions = new Map();
  let next = 0;
  let turn = 1;
  for (let number of numbers) {
    positions.set(number, turn);
    turn++;
  }
  while (turn < turns) {
    const position = positions.get(next);
    if (!position) {
      positions.set(next, turn);
      next = 0;
    } else {
      positions.set(next, turn);
      next = turn - position;
    }
    turn++;
  }

  return [next];
};

const [test1] = solution("test1.txt", 2020);
console.log(test1, test1 === 436);

const [test2] = solution("test2.txt", 30000000);
console.log(test2, test2 === 175594);

const [res] = solution("input.txt", 30000000);
console.log(res);
