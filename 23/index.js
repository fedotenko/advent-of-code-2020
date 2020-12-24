const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  let initialState = input.split("").map((x) => parseInt(x));

  const play = (initialCups, cupsNumber, turnsNumber) => {
    const cupsArray = [...initialCups];

    for (let value = initialCups.length + 1; value <= cupsNumber; value++) {
      cupsArray.push(value);
    }
    const cups = new Uint32Array([...cupsArray]);
    const links = new Uint32Array(cupsNumber)
      .fill(null)
      .map((_, index) => index + 1);
    links[cupsNumber - 1] = 0;

    let currentPosition = 0;
    for (let turn = 0; turn < turnsNumber; turn++) {
      const currentLabel = cups[currentPosition];

      const picked = [];
      let pick1 = links[currentPosition];
      picked.push(cups[pick1]);
      let pick2 = links[pick1];
      picked.push(cups[pick2]);
      pick3 = links[pick2];
      picked.push(cups[pick3]);

      links[currentPosition] = links[pick3];

      let destinationLabel = currentLabel === 1 ? cupsNumber : currentLabel - 1;
      while (picked.includes(destinationLabel)) {
        destinationLabel =
          destinationLabel === 1 ? cupsNumber : destinationLabel - 1;
      }

      const destinationPosition = cups.indexOf(destinationLabel);
      const tmpPosition = links[destinationPosition];
      links[destinationPosition] = pick1;
      links[pick3] = tmpPosition;

      if (!(turn % 1000000)) {
        console.log(turn, new Date());
      }
      currentPosition = links[currentPosition];
    }

    return [cups, links];
  };

  // first
  const [cups1, links1] = play(initialState, initialState.length, 100);
  let position = links1[cups1.indexOf(1)];
  let res = [];
  for (let i = 0; i < 8; i++) {
    res.push(cups1[position]);
    position = links1[position];
  }
  res1 = res.join("");

  // second
  const [cups2, links2] = play(initialState, 1000000, 10000000);
  position = links2[cups2.indexOf(1)];
  const label1 = cups2[position];
  const label2 = cups2[links2[position]];
  res2 = label1 * label2;

  return [res1, res2];
};

const [test1, test2] = solution("test1.txt");
console.log(test1, test1 === "67384529");
console.log(test2, test2 === 149245887792);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
