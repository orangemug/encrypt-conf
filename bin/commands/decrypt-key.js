var path        = require("path");
var encryptConf = require("../../core");
var json        = require("../json");
var prompt      = require("../../lib/prompt");
var keytar      = require("keytar");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file> <key>')
    .demand(3)
    .argv

  var key = argv._[2];

  var filepath = path.join(process.cwd(), argv._[1]);
  var data = json.readSync(filepath);

  var password = prompt("password", filepath);

  try {
    var out = encryptConf.decrypt(data, password);
  } catch(err) {
    if(err.code === "invalid_password") {
      keytar.deletePassword("encrypt-conf", filepath);
    }
    throw err;
  }

  if(out.hasOwnProperty(key)) {
    console.log(out[key].replace(/^toencrypt:/, ""))
  } else {
    throw new Error("No such key");
  }
};
