var path        = require("path");
var encryptConf = require("../../core");
var json        = require("../json");
var passwordMgr = require("../../lib/password-manager");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file>')
    .demand(2)
    .argv

  var filepath = path.join(process.cwd(), argv._[1]);
  var data = json.readSync(filepath);
  var password = passwordMgr.get("password", filepath);
  var data = encryptConf.encrypt(data, password);
  json.writeSync(filepath, data);
  console.error("File written to: %s", filepath);
};
