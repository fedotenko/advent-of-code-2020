const solution = (filename) => {
  let res1 = 0;
  let res2 = 0;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const lines = input.split("\n");

  let memory = {};
  let mask;

  // first
  for (let line of lines) {
    if (line.substr(0, 4) === "mask") {
      mask = line.substr(7, 36);
    } else {
      const match = line.match(/\[(\d+)\].* = (\d+)/);
      const address = match[1];
      let value = BigInt(match[2]);

      for (let pos = 0; pos < 36; pos++) {
        if (mask[35 - pos] === "X") {
          continue;
        }
        const bit = BigInt(1) << BigInt(pos);
        switch (mask[35 - pos]) {
          case "1":
            value = value | bit;
            break;
          case "0":
            value = value & ~bit;
            break;
        }
      }
      memory[address] = value;
    }
  }
  Object.keys(memory).forEach((k) => {
    res1 += Number(memory[k]);
  });

  // second
  const getAddresses = (mask, address, pos = 0) => {
    let list = [];
    if (pos === 36) {
      return address;
    } else {
      const ch = mask[35 - pos];
      const bit = BigInt(1) << BigInt(pos);
      if (ch === "X") {
        list = list.concat(getAddresses(mask, address | bit, pos + 1));
        list = list.concat(getAddresses(mask, address & ~bit, pos + 1));
      } else if (ch === "1") {
        list = list.concat(getAddresses(mask, address | bit, pos + 1));
      } else {
        list = list.concat(getAddresses(mask, address, pos + 1));
      }
    }

    return list;
  };

  memory = {};
  for (let line of lines) {
    if (line.substr(0, 4) === "mask") {
      mask = line.substr(7, 36);
    } else {
      const match = line.match(/\[(\d+)\].* = (\d+)/);
      let baseAddress = BigInt(match[1]);
      let addresses = getAddresses(mask, baseAddress);
      for (let address of addresses) {
        memory[address] = parseInt(match[2]);
      }
    }
  }

  Object.keys(memory).forEach((address) => {
    res2 += memory[address];
  });

  return [res1, res2];
};

// First input is a trap for the 2nd solution due number of X.
// const [test1] = solution("test1.txt");
// console.log(test1, test1 === 165);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 208);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
