var path        = require("path");
var encryptConf = require("../../");
var json        = require("../json");
var password    = require("../password");
var resp        = require("../resp");


module.exports = function(yargs) {
  var argv = yargs
    .usage('Usage: $0 <config_file>')
    .demand(2)
    .argv

  var filepath = path.join(process.cwd(), argv._[1]);
  json.get(filepath)
    .then(function(data) {
      return password.get({password: "password"})
        .then(function(res) {
          return encryptConf.encrypt(data, res.password);
        })
    })
    .then(json.set.bind(this, filepath))
    .catch(resp.error);
};
