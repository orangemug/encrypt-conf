var path        = require("path");
var encryptConf = require("../../core");
var json        = require("../json");
var prompt      = require("../../lib/prompt");
var keytar      = require("keytar");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file>')
    .demand(2)
    .argv

  var filepath = path.join(process.cwd(), argv._[1]);
  var data = json.readSync(filepath);

  var oldPassword = prompt("old password", filepath);
  var newPassword = prompt("new password", filepath);

  try {
    var data = encryptConf.decrypt(data, oldPassword);
  } catch(err) {
    if(err.code === "invalid_password") {
      keytar.deletePassword("encrypt-conf", filepath);
    }
  }

  encryptConf.encrypt(data, newPassword);
  json.writeSync(filepath, data);
  console.error("File written to: %s", filepath);
};
