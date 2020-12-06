const fs = require("fs");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
const groups = input.split("\n\n");

let first = 0;
let second = 0;

for (let group of groups) {
  const answers = group.split("\n");
  const l = answers.length;
  const h = {};
  for (let answer of answers) {
    for (let i = 0; i < answer.length; i++) {
      h[answer[i]] = h[answer[i]] ? h[answer[i]] + 1 : 1;
    }
  }
  first += Object.keys(h).length;
  for (let key of Object.keys(h)) {
    if (h[key] >= l) {
      second += 1;
    }
  }
}

console.log("1:", first);
console.log("2:", second);
