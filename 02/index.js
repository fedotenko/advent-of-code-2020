const solution = (filename) => {
  let res1 = 0;
  let res2 = 0;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const data = input.split("\n");

  for (let row of data) {
    const [rule, password] = row.split(": ");
    const [numbers, letter] = rule.split(" ");
    const [min, max] = numbers.split("-");

    const transformed = password.split(letter).join("");
    const lengthDiff = password.length - transformed.length;

    if (lengthDiff >= +min && lengthDiff <= +max) {
      res1++;
    }

    if (
      password.length >= min &&
      ((password[min - 1] === letter && password[max - 1] !== letter) ||
        (password[min - 1] !== letter && password[max - 1] === letter))
    ) {
      res2++;
    }
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 2);

const [_, test2] = solution("test1.txt");
console.log(test2, test2 === 1);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
