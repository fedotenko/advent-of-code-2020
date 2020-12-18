const solution = (filename) => {
  let res1 = 0;
  let res2 = 0;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const expressions = input.split("\n").map((e) => e.replace(/ /g, ""));

  // first
  for (let expression of expressions) {
    const stack = [];
    for (let current of expression.split("")) {
      let check = true;
      while (check) {
        check = false;
        const top = stack.length ? stack.pop() : null;
        let next;
        if (current > 0) {
          switch (top) {
            case "+":
              next = stack.pop();
              current = parseInt(current) + next;
              check = true;
              break;
            case "*":
              next = stack.pop();
              current = parseInt(current) * next;
              check = true;
              break;
            case null:
              stack.push(parseInt(current));
              break;
            case "(":
              stack.push(top);
              stack.push(parseInt(current));
              break;
            default:
              console.log("Something went wrong", top);
          }
        } else {
          if (current === ")") {
            stack.pop();
            current = top;
            check = true;
          } else {
            stack.push(top);
            stack.push(current);
          }
        }
      }
    }
    res1 += stack[0];
  }

  // second
  // Wrap sums into brackets to change calculation order
  for (let expression of expressions) {
    let pos = 0;
    while (pos < expression.length) {
      if (expression[pos] === "+") {
        let bracketsBalance;
        let offset;
        if (expression[pos + 1] > 0) {
          expression =
            expression.slice(0, pos + 2) + ")" + expression.slice(pos + 2);
        } else {
          bracketsBalance = 1;
          offset = 2;
          while (bracketsBalance) {
            if (expression[pos + offset] === ")") {
              bracketsBalance--;
            } else if (expression[pos + offset] === "(") {
              bracketsBalance++;
            }
            offset++;
          }
          expression =
            expression.slice(0, pos + offset) +
            ")" +
            expression.slice(pos + offset);
        }
        if (expression[pos - 1] > 0) {
          expression =
            expression.slice(0, pos - 1) + "(" + expression.slice(pos - 1);
        } else {
          offset = -2;
          bracketsBalance = -1;
          while (bracketsBalance) {
            if (expression[pos + offset] === ")") {
              bracketsBalance--;
            } else if (expression[pos + offset] === "(") {
              bracketsBalance++;
            }
            offset--;
          }

          expression =
            expression.slice(0, pos + offset + 1) +
            "(" +
            expression.slice(pos + offset + 1);
        }

        pos++;
      }
      pos++;
    }

    res2 += eval(expression);
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 13632);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 669060);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
