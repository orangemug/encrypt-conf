var fs = require("fs");


function readSync(filepath) {
  var raw = fs.readFileSync(filepath)
  return JSON.parse(raw);
}

function writeSync(filepath, data) {
  var jsonData = JSON.stringify(data, null, "  ");
  fs.writeFileSync(filepath, jsonData);
}

module.exports = {
  readSync: readSync,
  writeSync: writeSync
};
