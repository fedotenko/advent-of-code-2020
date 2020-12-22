const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const [startDeck1, startDeck2] = input.split("\n\n").map((line) =>
    line
      .split("\n")
      .splice(1)
      .map((x) => parseInt(x))
  );

  const deck1 = [...startDeck1];
  const deck2 = [...startDeck2];

  while (deck1.length && deck2.length) {
    const card1 = deck1.shift();
    const card2 = deck2.shift();
    if (card1 > card2) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  }
  const winnerDeck = deck1.length ? [...deck1] : [...deck2];
  res1 = winnerDeck.reduce((acc, v, i) => acc + v * (winnerDeck.length - i), 0);

  const getHash = (arr1, arr2) => {
    return arr1.join("-") + "|" + arr2.join("-");
  };

  let recursiveWinnerDeck;
  const game = (subDeck1, subDeck2) => {
    const hashes = [getHash(subDeck1, subDeck2)];
    while (subDeck1.length && subDeck2.length) {
      const card1 = subDeck1.shift();
      const card2 = subDeck2.shift();
      const deck1Win =
        subDeck1.length >= card1 && subDeck2.length >= card2
          ? game([...subDeck1.slice(0, card1)], [...subDeck2.slice(0, card2)])
          : card1 > card2;

      if (deck1Win) {
        subDeck1.push(card1, card2);
      } else {
        subDeck2.push(card2, card1);
      }
      const hash = getHash(subDeck1, subDeck2);
      if (hashes.includes(hash)) {
        return true;
      } else {
        hashes.push(hash);
      }
    }
    recursiveWinnerDeck = subDeck1.length ? subDeck1 : subDeck2;
    return !!subDeck1.length;
  };

  game([...startDeck1], [...startDeck2]);

  res2 = recursiveWinnerDeck.reduce(
    (acc, v, i) => acc + v * (recursiveWinnerDeck.length - i),
    0
  );

  return [res1, res2];
};

const [test1, test2] = solution("test1.txt");
console.log(test1, test1 === 306);
console.log(test2, test2 === 291);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
