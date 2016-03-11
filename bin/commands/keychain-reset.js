var path   = require("path");
var keytar = require("keytar");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file>')
    .demand(2)
    .argv

  var filepath = path.join(process.cwd(), argv._[1]);
  keytar.deletePassword("encrypt-conf", filepath);
};
