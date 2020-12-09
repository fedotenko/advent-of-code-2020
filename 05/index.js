const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const transformed = input.replace(/[F|L]/g, 0).replace(/[B|R]/g, 1);
  const seats = transformed.split("\n");

  let maxId = 0;
  const ids = [];
  for (let seat of seats) {
    const row = parseInt(seat.substr(0, 7), 2) * 8;
    const col = parseInt(seat.substr(7, 3), 2);
    const id = row + col;
    ids.push(id);
    maxId = Math.max(id, maxId);
  }

  res1 = maxId;

  ids.sort((a, b) => a - b);
  for (let i = 0; i < ids.length - 2; i++) {
    if (ids[i + 1] - ids[i] > 1) {
      res2 = ids[i] + 1;
      break;
    }
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 357);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
