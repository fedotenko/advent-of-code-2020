const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const lines = input.split("\n");
  const instructions = lines.map((line) => {
    const [op, arg] = line.split(" ");
    return [op, parseInt(arg)];
  });

  // first
  let visited = lines.map((_) => false);
  let pos = 0;
  let acc = 0;
  while (!visited[pos]) {
    const [op, arg] = instructions[pos];
    visited[pos] = true;
    switch (op) {
      case "acc":
        acc += arg;
        pos++;
        break;
      case "jmp":
        pos += arg;
        break;
      default:
        pos++;
    }
  }
  res1 = acc;

  // second
  pos = 0;
  let currenPos = 0;
  while (pos !== lines.length) {
    visited = lines.map((_) => false);
    acc = 0;

    let changedPos = undefined;
    let i = -1;
    pos = 0;
    while (pos < lines.length && !visited[pos]) {
      let [op, arg] = instructions[pos];

      if (
        changedPos !== undefined ||
        i < currenPos ||
        op === "acc" ||
        (op === "nop" && arg === 0)
      ) {
      } else {
        op = op === "jmp" ? "nop" : "jmp";
        changedPos = currenPos;
      }

      visited[pos] = true;
      switch (op) {
        case "acc":
          acc += arg;
          pos++;
          break;
        case "jmp":
          pos += arg;
          break;
        default:
          pos++;
      }
      i++;
    }
    currenPos++;
  }
  res2 = acc;

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 5);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 8);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
