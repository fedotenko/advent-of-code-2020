const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const lines = input.split("\n");

  const getMoves = (line) => {
    const letters = line.split("").reverse();
    const moves = [];
    while (letters.length) {
      letter = letters.pop();
      if (letter === "w" || letter === "e") {
        moves.push(letter);
      } else {
        moves.push(letter + letters.pop());
      }
    }

    return moves.reverse();
  };

  const getCoords = (line) => {
    const moves = getMoves(line);
    const pos = [0, 0];
    while (moves.length) {
      const move = moves.pop(moves);
      switch (move) {
        case "nw":
          pos[1] = pos[1] - 1;
          break;
        case "ne":
          pos[0] = pos[0] - 1;
          break;
        case "e":
          pos[0] = pos[0] - 1;
          pos[1] = pos[1] + 1;
          break;
        case "se":
          pos[1] = pos[1] + 1;
          break;
        case "sw":
          pos[0] = pos[0] + 1;
          break;
        case "w":
          pos[0] = pos[0] + 1;
          pos[1] = pos[1] - 1;
          break;
      }
    }
    return pos;
  };

  let floor = {};
  for (let line of lines) {
    const coords = getCoords(line);
    const position = coords.join("|");
    floor[position] = !floor[position];
  }

  res1 = Object.keys(floor).reduce((acc, position) => acc + floor[position], 0);

  const directions = ["nw", "ne", "e", "se", "sw", "w"];
  const offsets = directions.map((d) => getCoords(d));

  for (let day = 1; day <= 100; day++) {
    // create envelope
    const positions = Object.keys(floor);
    for (let position of positions) {
      const coords = position.split("|").map((x) => +x);
      for (let offset of offsets) {
        const newCoords = [coords[0] + offset[0], coords[1] + offset[1]];
        const newPosition = newCoords.join("|");
        if (!(newPosition in floor)) {
          floor[newPosition] = false;
        }
      }
    }
    // generate new floor
    const newPositions = Object.keys(floor);
    const newFloor = { ...floor };
    for (let position of newPositions) {
      const coords = position.split("|").map((x) => +x);
      let count = 0;
      for (let offset of offsets) {
        const adjestedCoords = [coords[0] + offset[0], coords[1] + offset[1]];
        const adjustedPosition = adjestedCoords.join("|");
        if (floor[adjustedPosition]) {
          count += floor[adjustedPosition];
        }
      }
      if (floor[position]) {
        if (count === 0 || count > 2) {
          newFloor[position] = false;
        }
      } else {
        if (count === 2) {
          newFloor[position] = true;
        }
      }
    }

    floor = { ...newFloor };
  }

  res2 = Object.keys(floor).reduce((acc, k) => acc + floor[k], 0);

  return [res1, res2];
};

const [test1, test2] = solution("test1.txt");
console.log(test1, test1 === 10);
console.log(test2, test2 === 2208);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
