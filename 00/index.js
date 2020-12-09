const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === null);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === null);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
