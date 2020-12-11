const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  let I = input
    .split("\n")
    .map((row) => row.split("").map((cell) => (cell === "L" ? 1 : 0)));
  I.unshift(new Array(I[0].length).fill(0));
  I.push(new Array(I[0].length).fill(0));
  I = I.map((row) => [0, ...row, 0]);

  // first
  const emptyRow = [...I[0]];
  let M = I;
  let check = true;
  let tmp = [];
  while (check) {
    check = false;
    tmp.push(emptyRow);
    for (let i = 1; i < M.length - 1; i++) {
      let row = [0];
      for (let j = 1; j < M[0].length - 1; j++) {
        let s =
          M[i - 1][j] +
          M[i + 1][j] +
          M[i - 1][j + 1] +
          M[i + 1][j + 1] +
          M[i - 1][j - 1] +
          M[i + 1][j - 1] +
          M[i][j + 1] +
          M[i][j - 1];
        if (M[i][j] === 1) {
          if (s < 10) {
            check = true;
            row.push(10);
          } else {
            row.push(1);
          }
        }
        if (M[i][j] === 10) {
          if (s > 39) {
            check = true;
            row.push(1);
          } else {
            row.push(10);
          }
        }
        if (M[i][j] === 0) {
          row.push(0);
        }
      }
      row.push(0);
      tmp.push(row);
    }
    tmp.push(emptyRow);
    M = tmp;
    tmp = [];
  }

  res1 = 0;
  for (let i = 0; i < M.length; i++) {
    for (let j = 0; j < M[0].length; j++) {
      if (M[i][j] === 10) {
        res1++;
      }
    }
  }

  // Second
  check = true;
  tmp = [];
  M = I;
  while (check) {
    check = false;
    tmp.push(emptyRow);
    for (let i = 1; i < M.length; i++) {
      let row = [0];
      for (let j = 1; j < M[0].length - 1; j++) {
        let s = 0;
        for (let k = 1; k < 100; k++) {
          if (i - k < 0) break;
          if (M[i - k][j] === 0) continue;
          s += M[i - k][j];
          break;
        }
        for (let k = 1; k < 100; k++) {
          if (i + k >= M.length) break;
          if (M[i + k][j] === 0) continue;
          s += M[i + k][j];
          break;
        }
        for (let k = 1; k < 100; k++) {
          if (i - k < 0 || j + k >= M[0].length) break;
          if (M[i - k][j + k] === 0) continue;
          s += M[i - k][j + k];
          break;
        }
        for (let k = 1; k < 100; k++) {
          if (i + k >= M.length || j + k >= M[0].length) break;
          if (M[i + k][j + k] === 0) continue;
          s += M[i + k][j + k];
          break;
        }
        for (let k = 1; k < 100; k++) {
          if (i - k < 0 || j - k < 0) break;
          if (M[i - k][j - k] === 0) continue;
          s += M[i - k][j - k];
          break;
        }
        for (let k = 1; k < 100; k++) {
          if (i + k >= M.length || j - k < 0) break;
          if (M[i + k][j - k] === 0) continue;
          s += M[i + k][j - k];
          break;
        }
        for (let k = 1; k < 100; k++) {
          if (j + k >= M[0].length) break;
          if (M[i][j + k] === 0) continue;
          s += M[i][j + k];
          break;
        }
        for (let k = 1; k < 100; k++) {
          if (j - k < 0) break;
          if (M[i][j - k] === 0) continue;
          s += M[i][j - k];
          break;
        }

        if (M[i][j] === 1) {
          if (s < 10) {
            check = true;
            row.push(10);
          } else {
            row.push(1);
          }
        }
        if (M[i][j] === 10) {
          if (s > 49) {
            check = true;
            row.push(1);
          } else {
            row.push(10);
          }
        }
        if (M[i][j] === 0) {
          row.push(0);
        }
      }
      row.push(0);
      tmp.push(row);
    }

    tmp.push(emptyRow);
    M = tmp;

    tmp = [];
  }

  res2 = 0;
  for (let i = 0; i < M.length; i++) {
    for (let j = 0; j < M[0].length; j++) {
      if (M[i][j] === 10) {
        res2++;
      }
    }
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 37);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 26);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
