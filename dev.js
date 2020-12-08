const { exec } = require("child_process");
const fs = require("fs");
const path = `./${process.argv[2]}`;
let timeout;

fs.watch(path, {}, () => {
  if (!timeout) {
    exec(`node ${path}/index.js`, (err, stdout, stderr) => {
      if (err) {
        console.log("=== ERROR ===");
        console.log("Error:", err);
      } else {
        console.log("=== RESULT ===");
        console.log(stdout);
      }
    });
    timeout = setTimeout(() => (timeout = null), 10);
  }
});
