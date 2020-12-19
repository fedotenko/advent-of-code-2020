// Was too lazy to recall grammar things
// so both tasks have been solved with brute force approach
const solution = (filename) => {
  let res1 = 0;
  let res2 = 0;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const [rulesRaw, messages] = input
    .split("\n\n")
    .map((part) => part.split("\n"));

  const resolved = [];
  const rules = new Array(rulesRaw.length).fill(null);
  for (let ruleRaw of rulesRaw) {
    let [index, cond] = ruleRaw.split(": ");
    if (cond === '"a"') {
      resolved.push(parseInt(index));
      rules[parseInt(index)] = "a";
    } else if (cond === '"b"') {
      resolved.push(parseInt(index));
      rules[parseInt(index)] = "b";
    } else {
      rules[parseInt(index)] = cond;
    }
  }
  const digitRegExp = /\d/;
  const processedRules = [...resolved];
  while (resolved.length) {
    const resolvedRuleIndex = resolved.shift();
    for (let i = 0; i < rules.length; i++) {
      if (processedRules.includes(i) || !rules[i]) {
        continue;
      }
      const re = new RegExp(`\\b${resolvedRuleIndex}\\b`, "g");
      let rule = rules[i].replace(re, `(${rules[resolvedRuleIndex]})`);
      if (!digitRegExp.test(rule)) {
        rule = rule.replace(/\s/g, "");
        let tmpRule;
        while (tmpRule !== rule) {
          tmpRule = rule;
          rule = rule.replace(/\((\w+)\)/g, "$1");
        }
        resolved.push(i);
        processedRules.push(i);
      }
      rules[i] = rule;
    }
  }

  // first
  const zeroRegex = new RegExp(`^${rules[0]}$`);
  for (let message of messages) {
    if (zeroRegex.test(message)) {
      res1++;
    }
  }

  if (!rules[8]) {
    return [res1];
  }

  // second
  // JS doesn't support recursive regular expressions :(
  // So, solution is create multiple regular expressions
  // with diffelent level of nesing and test against them.

  // Fix rule #8.
  // "8: 42 | 42 8" can produce only "42+" sequencies
  const rule8 = rules[8].replace(/ \|.*/, "+");
  // Process rule 11
  const [rule42, rule31] = rules[11].replace(/.* \| /, "").split(" 11 ");

  let tmpRule = "";
  const customZeroRuleRegExps = [];
  for (let level = 0; level < 5; level++) {
    tmpRule = rule42 + tmpRule + rule31;
    const regExp = new RegExp(`^${rule8}${tmpRule}$`);
    customZeroRuleRegExps.push(regExp);
  }

  for (let message of messages) {
    for (let regExp of customZeroRuleRegExps) {
      if (regExp.test(message)) {
        res2++;
        break;
      }
    }
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 2);

const [, test2] = solution("test2.txt");
console.log(test2, test2 === 12);

const [res1] = solution("input1.txt");
console.log(res1);

const [, res2] = solution("input2.txt");
console.log(res2);
