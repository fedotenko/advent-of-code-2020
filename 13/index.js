const solution = (filename) => {
  let res1 = 0;
  let res2 = 0;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const lines = input.split("\n");

  const timestamp = lines[0];
  const busIds = lines[1];

  // first
  const buses = busIds
    .split(",")
    .filter((x) => x !== "x")
    .map((x) => parseInt(x));
  let minDiff = Number.MAX_SAFE_INTEGER;
  let busId;
  for (let bus of buses) {
    let currentDiff = (Math.floor(timestamp / bus) + 1) * bus - timestamp;
    if (currentDiff < minDiff) {
      minDiff = currentDiff;
      busId = bus;
    }
  }
  res1 = busId * minDiff;

  // second
  const entries = busIds.split(",");
  let diff = 1;
  const offsets = [];
  let offset = -1;
  for (let i = 0; i < entries.length; i++) {
    if (entries[i] === "x") {
      diff++;
    } else {
      offset += diff;
      offsets.push(offset);
      diff = 1;
    }
  }

  let firstBusDepart = 0;
  let period = buses[0];
  for (let i = 1; i < buses.length; i++) {
    while ((firstBusDepart + offsets[i]) % buses[i] !== 0) {
      firstBusDepart += period;
    }
    period *= buses[i];
  }
  res2 = firstBusDepart;

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 295);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 1261476);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
