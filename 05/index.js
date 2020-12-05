const fs = require("fs");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
const transformed = input.replace(/[F|L]/g, 0).replace(/[B|R]/g, 1);
const seats = transformed.split("\n");

let maxId = 0;
const ids = [];
for (let seat of seats) {
  const row = parseInt(seat.substr(0, 7), 2) * 8;
  const col = parseInt(seat.substr(7, 3), 2);
  const id = row + col;
  ids.push(id);
  maxId = Math.max(id, maxId);
}

console.log("1:", maxId);

ids.sort((a, b) => a - b);
for (let i = 0; i < ids.length - 2; i++) {
  if (ids[i + 1] - ids[i] > 1) {
    console.log("2:", ids[i] + 1);
    break;
  }
}
