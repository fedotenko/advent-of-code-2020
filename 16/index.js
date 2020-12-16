const solution = (filename) => {
  let res1 = 0;
  let res2 = 1;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const [rulesRaw, ticketRaw, nearbyRaw] = input
    .split("\n\n")
    .map((raw) => raw.split("\n"));

  // prepare rules
  const rules = {};
  for (let rule of rulesRaw) {
    const [, name, s1, e1, s2, e2] = rule.match(
      /([\w| ]+): (\d+)\-(\d+) or (\d+)\-(\d+)/
    );
    rules[name] = {
      s1,
      e1,
      s2,
      e2,
    };
  }

  // prepare nearby
  nearbyRaw.shift();
  const nearbyTickets = nearbyRaw.map((line) => line.split(",").map((x) => +x));

  // prepare ticket
  ticketRaw.shift();
  const ticket = ticketRaw[0].split(",").map((x) => parseInt(x));

  const validTickets = [];

  // first
  for (let nearbyTicket of nearbyTickets) {
    const fieldValues = [];
    for (let fieldValue of nearbyTicket) {
      let count = 0;
      Object.keys(rules).forEach((k) => {
        const rule = rules[k];
        if (
          !(
            (fieldValue >= rule.s1 && +fieldValue <= rule.e1) ||
            (+fieldValue >= rule.s2 && fieldValue <= +rule.e2)
          )
        ) {
          count++;
        }
      });
      if (count === Object.keys(rules).length) {
        res1 += +fieldValue;
      } else {
        fieldValues.push(+fieldValue);
      }
    }
    validTickets.push(fieldValues);
  }

  // second
  const positions = {};
  let position = 0;
  const ruleNames = Object.keys(rules);
  while (position < 20) {
    for (let ruleName of ruleNames) {
      const rule = rules[ruleName];
      for (i = 0; i < validTickets.length; i++) {
        const value = validTickets[i][position];
        if (
          !(
            (value >= rule.s1 && value <= rule.e1) ||
            (value >= rule.s2 && value <= rule.e2)
          )
        ) {
          break;
        }
      }
      if (i === 235) {
        if (positions[ruleName]) {
          positions[ruleName].push(position);
        } else {
          positions[ruleName] = [position];
        }
      }
    }
    position++;
  }

  while (true) {
    const field = Object.keys(positions).find((k) => positions[k].length === 1);
    if (!field) {
      break;
    }
    const position = positions[field][0];
    if (field.startsWith("departure")) {
      res2 *= +ticket[position];
    }
    Object.keys(positions).forEach((k) => {
      positions[k] = positions[k].filter((xx) => xx !== position);
    });
  }

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 71);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
