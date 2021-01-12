const fs = require("fs");
const path = require("path");

module.exports = (req, res, body) => {
  let file = fs.readFileSync(
    path.resolve(process.cwd(), "app", "docs", "index.html"),
    "utf8"
  );

  res.header("Content-Length", Buffer.byteLength(file));
  res.header("Content-Type", "text/html");
  return file;
};
