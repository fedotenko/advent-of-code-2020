const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const numbers = input
    .split("\n")
    .map((x) => parseInt(x))
    .sort((a, b) => a - b);
  const length = numbers.length;

  // first
  let i = 0;
  let j = length - 1;
  let sum = 0;
  while (sum !== 2020 && i < j) {
    sum = numbers[i] + numbers[j];
    if (sum < 2020) {
      i++;
    } else if (sum > 2020) {
      j--;
    }
  }
  res1 = numbers[i] * numbers[j];

  // second
  let k;
  for (i = 0; i < length - 2; i++) {
    for (j = i + 1; i < length - 1; j++) {
      for (k = j + 1; k < length; k++) {
        sum = numbers[i] + numbers[j] + numbers[k];
        if (sum === 2020) {
          // ughh
          return [res1, numbers[i] * numbers[j] * numbers[k]];
        }
        if (sum > 2020) {
          break;
        }
      }
      if (j === k - 1) {
        break;
      }
    }
  }
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 514579);

const [_, test2] = solution("test1.txt");
console.log(test2, test2 === 241861950);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
