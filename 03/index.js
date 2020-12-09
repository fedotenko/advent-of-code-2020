const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const data = input.split("\n");

  const calculate = (map, offset) => {
    const [offsetX, offsetY] = offset;
    const width = map[0].length;
    let x = 0;
    let y = 0;
    let count = 0;

    while (y < map.length) {
      if (map[y][x] === "#") {
        count++;
      }
      y += offsetY;
      x += offsetX;
      if (x >= width) {
        x = x % width;
      }
    }

    return count;
  };

  res1 = calculate(data, [3, 1]);

  const offsets = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  let mul = 1;

  for (let offset of offsets) {
    mul *= calculate(data, offset);
  }
  res2 = mul;

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 7);

const [_, test2] = solution("test1.txt");
console.log(test2, test2 === 336);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
