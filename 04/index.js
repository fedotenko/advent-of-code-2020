const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const passports = input
    .split("\n\n")
    .map((passport) => passport.split("\n").join(" "));

  // first
  let validPassports = [];
  for (let passport of passports) {
    const fields = passport.split(" ");
    let pattern = {
      byr: 1,
      iyr: 1,
      eyr: 1,
      hgt: 1,
      hcl: 1,
      ecl: 1,
      pid: 1,
    };
    fields.forEach((field) => {
      const [key, value] = field.split(":");
      delete pattern[key];
    });
    if (Object.keys(pattern).length === 0) {
      validPassports.push(passport);
    }
  }
  res1 = validPassports.length;

  // Second
  const validStrictPassports = [];
  for (let passport of validPassports) {
    const fields = passport.split(" ");
    let valid = true;
    fields.forEach((field) => {
      const [key, value] = field.split(":");
      if (
        key === "byr" &&
        !(
          value.replace(/\d/g, "").length === 0 &&
          value.length === 4 &&
          value >= 1920 &&
          value <= 2002
        )
      ) {
        valid = false;
      }
      if (
        key === "iyr" &&
        !(
          value.replace(/\d/g, "").length === 0 &&
          value.length === 4 &&
          value >= 2010 &&
          value <= 2020
        )
      ) {
        valid = false;
      }
      if (
        key === "eyr" &&
        !(
          value.replace(/\d/g, "").length === 0 &&
          value.length === 4 &&
          value >= 2020 &&
          value <= 2030
        )
      ) {
        valid = false;
      }

      if (
        key === "ecl" &&
        !["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value)
      ) {
        valid = false;
      }

      if (
        key === "hcl" &&
        !(
          value.length === 7 &&
          value[0] === "#" &&
          value.replace(/[0-9]|[a-f]/g, "") === "#"
        )
      ) {
        valid = false;
      }

      if (
        key === "pid" &&
        !(value.length === 9 && value.replace(/\d/g, "").length === 0)
      ) {
        valid = false;
      }

      if (key === "hgt") {
        const m = value.substr(value.length - 2);
        const n = value.substr(0, value.length - 2);
        if (
          !(
            (m === "in" && n >= 59 && n <= 76) ||
            (m === "cm" && n >= 150 && n <= 193)
          )
        ) {
          valid = false;
        }
      }
    });

    if (valid) {
      validStrictPassports.push(passport);
    }
  }

  res2 = validStrictPassports.length;

  return [res1, res2];
};

const [test1] = solution("test1.txt");
console.log(test1, test1 === 2);

const [, test2] = solution("test2.txt");
console.log(test2, test2 === 0);

const [, test3] = solution("test3.txt");
console.log(test3, test3 === 4);

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
