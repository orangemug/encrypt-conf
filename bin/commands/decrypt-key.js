var path        = require("path");
var encryptConf = require("../../");
var json        = require("../json");
var password    = require("../password");
var resp        = require("../resp");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file> <key>')
    .demand(3)
    .argv

  var key = argv._[2];

  var filepath = path.join(process.cwd(), argv._[1]);
  json.get(filepath)
    .then(function(data) {
      return password.get({password: "password"})
        .then(function(res) {
          var out = encryptConf.decrypt(data, res.password);
          if(out.hasOwnProperty(key)) {
            resp.success(
              out[key].replace(/^toencrypt:/, "")
            );
          } else {
            resp.error("No such key");
          }
        })
    })
    .catch(resp.error);
};
