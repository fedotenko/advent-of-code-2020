const r = (s) => {
  return s.split("").reverse().join("");
};

const fr = (a) => {
  return [r(a[3]), a[0], r(a[1]), a[2]];
};
const fh = (a) => {
  return [r(a[0]), a[3], r(a[2]), a[1]];
};

const fv = (a) => {
  return [a[2], r(a[1]), a[0], r(a[3])];
};

const td = (c) => {
  const res = [];
  for (let i = 0; i < 4; i++) {
    let num = parseInt(c[i].replace(/\./g, 0).replace(/\#/g, 1), 2);
    res.push(num);
  }
  return res;
};

const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const blocks = input.split("\n\n").map((block) => block.split("\n"));

  const B = {};
  const C = {};
  const f = {};
  s2b = {};

  for (let block of blocks) {
    const firstLine = block.shift();
    const id = parseInt(firstLine.substr(5, 4));
    const sides = [block[0], "", block[9], ""];
    for (let i = 0; i < 10; i++) {
      sides[1] = sides[1] + block[i][9];
      sides[3] = sides[3] + block[i][0];
    }

    cases = [
      td(sides),
      td(fv(sides)),
      td(fh(sides)),
      td(fv(fh(sides))),
      td(fr(sides)),
      td(fr(fr(sides))),
      td(fr(fr(fr(sides)))),
      td(fv(fr(sides))),
      td(fv(fr(fr(fr(sides))))),
    ];
    C[id] = cases;
    B[id] = block;

    const t = [];
    for (let c of cases) {
      for (let s of c) {
        t.push(s);
        s2b[s] = s2b[s] ? s2b[s].concat(id) : [id];
      }
    }
    for (let tt of [...new Set(t)]) {
      f[tt] = f[tt] ? f[tt] + 1 : 1;
    }
  }

  // console.log(s2b);

  // console.log(C);
  // console.log(f);

  let k = Object.keys(f);
  let z = k.reduce((acc, v) => (f[v] === 1 ? acc + 1 : acc), 0);
  let u = k.filter((kk) => f[kk] === 1);

  let dd = [];
  for (let uu of u) {
    console.log(s2b[uu]);
    dd.push(...s2b[uu]);
  }

  console.log(new Set(dd));

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === null);

// const [_, test2] = solution("test2.txt");
// console.log(test2, test2 === null);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
