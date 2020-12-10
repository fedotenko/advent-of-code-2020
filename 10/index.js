const solution = (filename) => {
  let res1 = null;
  let res2 = 1;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const adapters = input.split("\n").map((x) => parseInt(x));
  adapters.sort((a, b) => a - b);

  // first
  const diffs = {};
  for (let i = 0; i < adapters.length - 1; i++) {
    const diff = adapters[i + 1] - adapters[i];
    diffs[diff] = diffs[diff] ? diffs[diff] + 1 : 2;
  }

  res1 = diffs["1"] * diffs["3"];

  // second
  // total number of distinct arrangements is a multipication of distinct arrangements of (n = n + 1) subsequences.
  // max subsequence length is 6, so we can precalculate number of arrangements for them

  const calculateArrangementsNumber = (arrangement, processed = []) => {
    let cnt = 1;
    const current = arrangement.join("-");
    if (processed.includes(current)) {
      return 0;
    }
    processed.push(current);
    for (let i = 1; i < arrangement.length - 1; i++) {
      if (arrangement[i + 1] - arrangement[i - 1] <= 3) {
        const newSeq = [...arrangement];
        newSeq.splice(i, 1);
        cnt += calculateArrangementsNumber(newSeq, processed);
      }
    }

    return cnt;
  };

  // sequence looks like Tribonacci Numbers
  const n = [1];
  for (let i = 1; i < 7; i++) {
    const tmp = new Array(i).fill(1).map((_, index) => index);
    n.push(calculateArrangementsNumber(tmp));
  }

  let length = 1;
  let count = 1;
  for (let i = 0; i < adapters.length - 1; i++) {
    if (adapters[i + 1] - adapters[i] === 1) {
      length++;
    } else {
      if (length > i) {
        // begin of the adapters list
        count *= n[length + 1]; // implied 0 should be counted as a sequence element
      } else {
        count *= n[length];
      }
      length = 1;
    }
  }
  count *= n[length];
  res2 = count;

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 220);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 19208);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
