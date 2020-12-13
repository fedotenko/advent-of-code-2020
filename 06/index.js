const solution = (filename) => {
  let res1 = 0;
  let res2 = 0;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const groups = input.split("\n\n");

  for (let group of groups) {
    const answers = group.split("\n");
    const length = answers.length;
    const count = {};
    for (let answer of answers) {
      for (let i = 0; i < answer.length; i++) {
        count[answer[i]] = count[answer[i]] ? count[answer[i]] + 1 : 1;
      }
    }
    res1 += Object.keys(count).length;
    for (let key of Object.keys(count)) {
      if (count[key] >= length) {
        res2 += 1;
      }
    }
  }

  return [res1, res2];
};

const [test1] = solution("test.txt");
console.log(test1, test1 === 11);

const [_, test2] = solution("test.txt");
console.log(test2, test2 === 6);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
