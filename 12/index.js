const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const instructions = input
    .split("\n")
    .map((step) => [step.substr(0, 1), parseInt(step.substr(1))]);

  const move = (x, y, direction, steps) => {
    switch (direction) {
      case "N":
        return [x, y + steps];
      case "S":
        return [x, y - steps];
      case "W":
        return [x - steps, y];
      case "E":
        return [x + steps, y];
      default:
        console.log("Incorrect direction", direction);
    }
  };

  let i;

  // first
  let x = 0;
  let y = 0;
  let activeDirection = "E";
  const compass = ["N", "E", "S", "W"];
  for (let instruction of instructions) {
    const [action, value] = instruction;
    switch (action) {
      case "N":
      case "S":
      case "W":
      case "E":
        [x, y] = move(x, y, action, value);
        break;
      case "R":
        i = (compass.indexOf(activeDirection) + value / 90) % 4;
        activeDirection = compass[i];
        break;
      case "L":
        i = Math.abs(compass.indexOf(activeDirection) - value / 90 + 4) % 4;
        activeDirection = compass[i];
        break;
      case "F":
        [x, y] = move(x, y, activeDirection, value);
        break;
      default:
        throw new Error("Incorrect move", instruction);
    }
  }

  res1 = Math.abs(x) + Math.abs(y);

  // second
  let waypointX = 10;
  let waypointY = 1;
  let shipX = 0;
  let shipY = 0;
  for (let instruction of instructions) {
    const [action, value] = instruction;
    switch (action) {
      case "N":
      case "S":
      case "W":
      case "E":
        [waypointX, waypointY] = move(waypointX, waypointY, action, value);
        break;
      case "R":
        i = value / 90;
        if (i === 1) {
          [waypointX, waypointY] = [waypointY, -waypointX];
        } else if (i === 2) {
          [waypointX, waypointY] = [-waypointX, -waypointY];
        } else if (i === 3) {
          [waypointX, waypointY] = [-waypointY, waypointX];
        }
        break;
      case "L":
        i = value / 90;
        if (i === 1) {
          [waypointX, waypointY] = [-waypointY, waypointX];
        } else if (i === 2) {
          [waypointX, waypointY] = [-waypointX, -waypointY];
        } else if (i === 3) {
          [waypointX, waypointY] = [waypointY, -waypointX];
        }
        break;
      case "F":
        shipX += waypointX * value;
        shipY += waypointY * value;
        break;
      default:
        throw new Error("Incorrect move", instruction);
    }
  }
  res2 = Math.abs(shipX) + Math.abs(shipY);

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 25);

const [_, test2] = solution("test2.txt");
console.log(test2, test2 === 286);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
