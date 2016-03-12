var core = require("./core");
var prompt = require("./lib/prompt");
var fs = require("fs");

var env = process.env.NODE_ENV || "development";

module.exports = function(filepath, password) {
  var out = fs.readFileSync(filepath).toString();
  var json = JSON.parse(out);

  if(!password) {
    if(env === "development") {
      password = prompt("Passpharse to decrypt config: ", filepath);
    } else {
      throw "No password to decrypt config"
    }
  }
  return core.decrypt(json, password, true);
}
