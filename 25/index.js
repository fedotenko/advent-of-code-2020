const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const [cardKey, doorKey] = input.split("\n").map((x) => +x);
  const magic = 20201227;

  const detectLoopSize = (key) => {
    const subjectNumber = 7;
    let value = subjectNumber;
    let count = 0;
    while (value !== key) {
      value = (value * subjectNumber) % magic;
      count++;
    }
    return count;
  };

  const cardLoopSize = detectLoopSize(cardKey);
  const doorLoopSize = detectLoopSize(doorKey);

  const getEncryptionKey = (key, count) => {
    const subjectNumber = key;
    let value = key;
    for (let i = 0; i < count; i++) {
      value = (value * subjectNumber) % magic;
    }
    return value;
  };

  res1 = getEncryptionKey(cardKey, doorLoopSize);
  res2 = getEncryptionKey(doorKey, cardLoopSize);

  return [res1, res2];
};

const [test1, test2] = solution("test1.txt");
console.log(test1, test2, test1 === test2);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
