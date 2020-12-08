const execute = (instructions) => {
  let visited = instructions.map((_) => false);
  let acc = 0;
  let pos = 0;

  while (!visited[pos] && pos < instructions.length) {
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

  return [acc, pos];
};

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

  [res1] = execute(instructions);

  // second
  let step = 0;
  for (let i = 0; i < instructions.length; i++) {
    const [op, arg] = instructions[i];
    if (op === "acc" || (op === "nop" && arg === 0)) {
      continue;
    }
    const newInstructions = instructions.map((instruction, index) =>
      i !== index
        ? instruction
        : [instruction[0] === "jmp" ? "nop" : "jmp", instruction[1]]
    );

    [res2, step] = execute(newInstructions);
    if (step === instructions.length) {
      break;
    }
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 5);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 8);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
