const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const lines = input.split("\n");

  const initialState = [];
  for (let line of lines) {
    initialState.push(line.split(""));
  }

  let space = [initialState];
  let cycle = 6;
  let totalCount;
  while (cycle) {
    totalCount = 0;
    const zSize = space.length;
    const ySize = space[0].length;
    const xSize = space[0][0].length;

    const newSpace = [];

    for (let cubeZ = -1; cubeZ <= zSize; cubeZ++) {
      const slice = [];
      for (let cubeY = -1; cubeY <= ySize; cubeY++) {
        const row = [];
        for (let cubeX = -1; cubeX <= xSize; cubeX++) {
          let cube;
          if (
            cubeZ > -1 &&
            cubeZ < zSize &&
            cubeY > -1 &&
            cubeY < ySize &&
            cubeX > -1 &&
            cubeX < xSize
          ) {
            cube = space[cubeZ][cubeY][cubeX];
          } else {
            cube = ".";
          }

          let count = 0;
          for (let offsetZ = -1; offsetZ < 2; offsetZ++) {
            for (let offsetY = -1; offsetY < 2; offsetY++) {
              for (let offsetX = -1; offsetX < 2; offsetX++) {
                const neighborZ = offsetZ + cubeZ;
                const neighborY = offsetY + cubeY;
                const neighborX = offsetX + cubeX;

                if (
                  neighborZ > -1 &&
                  neighborZ < zSize &&
                  neighborY > -1 &&
                  neighborY < ySize &&
                  neighborX > -1 &&
                  neighborX < xSize &&
                  !(offsetZ === 0 && offsetX === 0 && offsetY === 0)
                ) {
                  if (space[neighborZ][neighborY][neighborX] === "#") {
                    count++;
                  }
                }
              }
            }
          }

          if (cube === ".") {
            if (count === 3) {
              cube = "#";
              totalCount++;
            }
          } else {
            if (count === 2 || count === 3) {
              cube = "#";
              totalCount++;
            } else {
              cube = ".";
            }
          }

          row.push(cube);
        }
        slice.push(row);
      }
      newSpace.push(slice);
    }
    space = newSpace;

    cycle--;
  }
  res1 = totalCount;

  space = [[initialState]];
  cycle = 6;
  totalCount = 0;
  while (cycle) {
    totalCount = 0;
    const wSize = space.length;
    const zSize = space[0].length;
    const ySize = space[0][0].length;
    const xSize = space[0][0][0].length;

    const hyperspace = [];
    for (let cubeW = -1; cubeW <= wSize; cubeW++) {
      const newSpace = [];
      for (let cubeZ = -1; cubeZ <= zSize; cubeZ++) {
        const slice = [];
        for (let cubeY = -1; cubeY <= ySize; cubeY++) {
          const row = [];
          for (let cubeX = -1; cubeX <= xSize; cubeX++) {
            let cube;
            if (
              cubeW > -1 &&
              cubeW < wSize &&
              cubeZ > -1 &&
              cubeZ < zSize &&
              cubeY > -1 &&
              cubeY < ySize &&
              cubeX > -1 &&
              cubeX < xSize
            ) {
              cube = space[cubeW][cubeZ][cubeY][cubeX];
            } else {
              cube = ".";
            }

            let count = 0;
            for (let offsetW = -1; offsetW < 2; offsetW++) {
              for (let offsetZ = -1; offsetZ < 2; offsetZ++) {
                for (let offsetY = -1; offsetY < 2; offsetY++) {
                  for (let offsetX = -1; offsetX < 2; offsetX++) {
                    const neighborW = offsetW + cubeW;
                    const neighborZ = offsetZ + cubeZ;
                    const neighborY = offsetY + cubeY;
                    const neighborX = offsetX + cubeX;

                    if (
                      neighborW > -1 &&
                      neighborW < wSize &&
                      neighborZ > -1 &&
                      neighborZ < zSize &&
                      neighborY > -1 &&
                      neighborY < ySize &&
                      neighborX > -1 &&
                      neighborX < xSize &&
                      !(
                        offsetZ === 0 &&
                        offsetX === 0 &&
                        offsetY === 0 &&
                        offsetW === 0
                      )
                    ) {
                      if (
                        space[neighborW][neighborZ][neighborY][neighborX] ===
                        "#"
                      ) {
                        count++;
                      }
                    }
                  }
                }
              }
            }

            if (cube === ".") {
              if (count === 3) {
                cube = "#";
                totalCount++;
              }
            } else {
              if (count === 2 || count === 3) {
                cube = "#";
                totalCount++;
              } else {
                cube = ".";
              }
            }

            row.push(cube);
          }
          slice.push(row);
        }
        newSpace.push(slice);
      }
      hyperspace.push(newSpace);
    }
    space = hyperspace;

    cycle--;
  }
  res2 = totalCount;

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 112);

const [_, test2] = solution("test1.txt");
console.log(test2, test2 === 848);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
