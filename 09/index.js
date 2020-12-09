const solution = (filename, size = 5) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });
  const numbers = input.split("\n").map((x) => parseInt(x));

  for (let i = size + 1; i < numbers.length; i++) {
    const batch = numbers.slice(i - size, i);
    const n = numbers[i];
    batch.sort((a, b) => a - b);
    let check = true;
    let kk, jj;
    for (jj = 0; jj < batch.length - 1; jj++) {
      for (kk = jj + 1; kk < batch.length; kk++) {
        if (batch[kk] + batch[jj] === n) {
          check = false;
          break;
        } else {
          if (batch[kk] + batch[jj] > n) {
            break;
          }
        }
      }
      if (!check) {
        break;
      }
    }
    if (check === true) {
      res1 = n;
      break;
    }
  }

  // second
  let offset = 1;
  let arr = [numbers[0], numbers[1]];
  let res = res1 - numbers[0] - numbers[1];
  while (res) {
    if (res > 0) {
      offset++;
      let tmp = numbers[offset];
      res -= tmp;
      arr.push(tmp);
    } else {
      let tmp = arr.shift();
      res += tmp;
      if (!numbers.length) {
        res = res1 - numbers[offset + 1] - numbers[offset + 2];
        arr = [numbers[offset + 1], numbers[offset + 2]];
        offset += 2;
      }
    }
  }
  arr.sort((a, b) => a - b);
  res2 = arr[0] + arr[arr.length - 1];

  return [res1, res2];
};

const [test1] = solution("test1.txt", 5);
console.log(test1, test1 === 127);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 62);

const [res1, res2] = solution("input.txt", 25);
console.log(res1, res2);
