const { exec } = require("child_process");
const fs = require("fs");
const { exit } = require("process");
const day = process.argv[2];
const path = `./${day}`;
let timeout;

if (!day) {
  console.log("Day is not defined.");
  exit();
}

if (!fs.existsSync(path)) {
  console.log("Folder not found. Please make sure that it exists.", path);
  exit();
}

fs.watch(path, {}, () => {
  if (!timeout) {
    exec(`node ${path}/index.js`, (err, stdout) => {
      if (err) {
        console.log("=== ERROR ===");
        console.log("= Output =");
        console.log(stdout);
        console.log("= Error =");
        console.log(err);
      } else {
        console.log("=== RESULT ===");
        console.log(stdout);
      }
    });
    timeout = setTimeout(() => (timeout = null), 10);
  }
});
