const rotate = (M) => {
  const result = [];
  for (let x = 0; x < M.length; x++) {
    const row = [];
    for (let y = 0; y < M.length; y++) {
      row.unshift(M[y][x]);
    }
    result.push(row.join(""));
  }
  return result;
};

const flipV = (M) => {
  const result = [];
  for (let i = 0; i < M.length; i++) {
    result.unshift(M[i]);
  }
  return result;
};

const flipH = (M) => {
  const result = [];
  for (let i = 0; i < M.length; i++) {
    result.push(M[i].split("").reverse().join(""));
  }
  return result;
};

const generateMatrices = (M) => {
  return [
    M,
    flipV(M),
    flipH(M),
    rotate(M),
    flipV(flipH(M)),
    flipV(rotate(M)),
    flipH(flipV(rotate(M))),
    flipV(rotate(rotate(rotate(M)))),
  ];
};

const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const tiles = input.split("\n\n").map((block) => block.split("\n"));

  const blocksByTileId = {};
  const tileIdsForEachSide = {};
  const tileIdsByLeftSide = {};
  const tileIdsByTopSide = {};
  const tileIdsByTopLeftSides = {};

  for (let tile of tiles) {
    const firstLine = tile.shift();
    const id = parseInt(firstLine.substr(5, 4));

    const transformedTiles = generateMatrices(tile);

    blocksByTileId[id] = [];
    for (let transformedTile of transformedTiles) {
      const sides = [transformedTile[0], "", transformedTile[9], ""];
      for (let i = 0; i < 10; i++) {
        sides[1] = sides[1] + transformedTile[i][9];
        sides[3] = sides[3] + transformedTile[i][0];
      }
      blocksByTileId[id].push({ transformedTile, sides, id });

      tileIdsByLeftSide[sides[3]] = tileIdsByLeftSide[sides[3]]
        ? tileIdsByLeftSide[sides[3]].concat(id)
        : [id];
      tileIdsByTopSide[sides[0]] = tileIdsByTopSide[sides[0]]
        ? tileIdsByTopSide[sides[0]].concat(id)
        : [id];
      const topLeftSide = sides[0] + sides[3];
      tileIdsByTopLeftSides[topLeftSide] = tileIdsByTopLeftSides[topLeftSide]
        ? tileIdsByTopLeftSides[topLeftSide].concat(id)
        : [id];

      for (let i = 0; i < 4; i++) {
        const side = sides[i];
        if (!tileIdsForEachSide[side]) {
          tileIdsForEachSide[side] = [[], [], [], []];
        }
        tileIdsForEachSide[side][i].push(id);
      }
    }
  }

  const uniqSidesCountByTileId = {};
  const sidesByTileId = {};
  Object.keys(tileIdsForEachSide).forEach((side) => {
    const ids = tileIdsForEachSide[side].reduce(
      (acc, v) => [...new Set([...acc, ...v])],
      []
    );
    if (ids.length === 1) {
      const id = ids.pop();
      uniqSidesCountByTileId[id] = uniqSidesCountByTileId[id]
        ? uniqSidesCountByTileId[id] + 1
        : 1;
      sidesByTileId[id] = sidesByTileId[id]
        ? sidesByTileId[id].concat(side)
        : [side];
    }
  });

  const cornerIds = Object.keys(uniqSidesCountByTileId)
    .filter((id) => uniqSidesCountByTileId[id] === 4)
    .map((x) => +x);

  res1 = cornerIds.reduce((acc, id) => acc * id, 1);

  let baseCornerBlock;
  let i = 0;
  while (!baseCornerBlock) {
    const cornerId = cornerIds[i];
    baseCornerBlock = blocksByTileId[cornerId].find(
      (b) =>
        b.sides[0] === sidesByTileId[cornerId][1] &&
        b.sides[3] === sidesByTileId[cornerId][0]
    );
    i++;
  }

  const size = Math.sqrt(tiles.length);

  const topBlocks = new Array(size).fill(null);

  let chunk = new Array(8).fill("");
  let image = [];

  for (let y = 0; y < size; y++) {
    let leftBlock = null;
    for (let x = 0; x < size; x++) {
      const topBlock = topBlocks[x];
      let block;
      if (x === 0 && y === 0) {
        block = baseCornerBlock;
      } else {
        if (!topBlock) {
          const ids = tileIdsByLeftSide[leftBlock.sides[1]].filter(
            (id) => id !== leftBlock.id
          );
          block = blocksByTileId[ids[0]].find(
            (b) => b.sides[3] === leftBlock.sides[1] && sidesByTileId[b.id]
          );
        } else if (!leftBlock) {
          const ids = tileIdsByTopSide[topBlock.sides[2]].filter(
            (id) => id !== topBlock.id
          );
          block = blocksByTileId[ids[0]].find(
            (b) => b.sides[0] === topBlock.sides[2] && sidesByTileId[b.id]
          );
        } else {
          const topLeftSide = topBlock.sides[2] + leftBlock.sides[1];
          const ids = tileIdsByTopLeftSides[topLeftSide];
          block = blocksByTileId[ids[0]].find(
            (b) =>
              b.sides[3] === leftBlock.sides[1] &&
              b.sides[0] === topBlock.sides[2]
          );
        }
      }
      leftBlock = block;
      topBlocks[x] = block;
      for (let i = 1; i < 9; i++) {
        chunk[i - 1] += block.transformedTile[i].substr(1, 8);
      }
    }
    image.push(...chunk);
    chunk = new Array(8).fill("");
  }

  let cnt = 0;
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      if (image[i][j] === "#") {
        cnt++;
      }
    }
  }

  const possibleImages = generateMatrices(image);

  for (let image of possibleImages) {
    let monsterCount = 0;
    for (let i = 1; i < image.length - 1; i++) {
      // body check
      const bodyRegEx = /#....##....##....###/g;
      let bodyMatch;
      while ((bodyMatch = bodyRegEx.exec(image[i])) !== null) {
        // head check
        if (image[i - 1][bodyMatch.index + 18] !== "#") {
          continue;
        }
        // feet check
        const feetRegEx = /.#..#..#..#..#..#/g;
        let feetMatch;
        while ((feetMatch = feetRegEx.exec(image[i + 1])) !== null) {
          // move start position of the next match to the next character
          feetRegEx.lastIndex = feetMatch.index + 1;
          if (feetMatch.index === bodyMatch.index) {
            monsterCount++;
          }
        }
      }
    }

    res2 = cnt - monsterCount * 15;

    if (monsterCount) {
      break;
    }
  }

  return [res1, res2];
};

const [test1, test2] = solution("test1.txt");
console.log(test1, test1 === 20899048083289);
console.log(test2, test2 === 273);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
