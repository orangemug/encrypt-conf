var path        = require("path");
var encryptConf = require("../../core");
var json        = require("../json");
var prompt      = require("../prompt");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file> <key>')
    .demand(3)
    .argv

  var key = argv._[2];

  var filepath = path.join(process.cwd(), argv._[1]);
  var data = json.readSync(filepath);

  var password = prompt("password");
  var out = encryptConf.decrypt(data, password);
  if(out.hasOwnProperty(key)) {
    resp.success(
      out[key].replace(/^toencrypt:/, "")
    );
  } else {
    resp.error("No such key");
  }
};
