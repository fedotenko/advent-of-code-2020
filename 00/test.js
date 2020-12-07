const { exec } = require("child_process");
const fs = require("fs");
let timeout;

fs.watch(".", {}, () => {
  if (!timeout) {
    exec("node ./index.js", (err, stdout, stderr) => {
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
