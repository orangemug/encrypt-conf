var path        = require("path");
var encryptConf = require("../../core");
var json        = require("../json");
var prompt      = require("../prompt");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file>')
    .demand(2)
    .argv

  var filepath = path.join(process.cwd(), argv._[1]);
  var data = json.readSync(filepath);

  var oldPassword = prompt("old password");
  var newPassword = prompt("new password");

  var data = encryptConf.decrypt(data, oldPassword);
  encryptConf.encrypt(data, newPassword);
  json.writeSync(filepath, data);
  console.error("File written to: %s", filepath);
};
