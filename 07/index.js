const solution = (filename) => {
  let res1;
  let res2;

  const fs = require("fs");
  const input = fs.readFileSync("./" + filename, { encoding: "utf8" });
  const bags = input.split("\n");

  // preparation
  const rules = {};
  for (let bag of bags) {
    const [name, rule] = bag.split(" bags contain ");
    const clauses = rule.split(", ");
    rules[name] = {};

    if (clauses[0] === "no other bags.") {
      continue;
    }

    for (let clause of clauses) {
      const count = parseInt(clause);
      const nestedBagName = clause.replace(/\d+ /, "").replace(/ bag.*/g, "");
      rules[name][nestedBagName] = count;
    }
  }

  // first
  const bagNames = ["shiny gold"];
  const uniqBags = [];
  while (bagNames.length) {
    const currentBag = bagNames.pop();
    for (let parentBag of Object.keys(rules)) {
      if (Object.keys(rules[parentBag]).includes(currentBag)) {
        if (!bagNames.includes(parentBag)) {
          bagNames.push(parentBag);
        }
        if (!uniqBags.includes(parentBag)) {
          uniqBags.push(parentBag);
        }
      }
    }
  }
  res1 = uniqBags.length;

  // second
  const containers = [{ bagName: "shiny gold", count: 1 }];
  res2 = 0;
  while (containers.length) {
    const { bagName: name, count } = containers.pop();
    if (rules[name] && Object.keys(rules[name]).length) {
      for (let nestedBagName of Object.keys(rules[name])) {
        res2 += rules[name][nestedBagName] * count;
        containers.push({
          bagName: nestedBagName,
          count: rules[name][nestedBagName] * count,
        });
      }
    }
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 4);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 126);

const [r1, r2] = solution("input.txt");

console.log(r1, r2);
