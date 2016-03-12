var path   = require("path");
var passwordMgr = require("../../lib/password-manager");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file>')
    .demand(2)
    .argv

  var filepath = path.join(process.cwd(), argv._[1]);
  passwordMgr.delete("encrypt-conf", filepath, {warn: true});
};
