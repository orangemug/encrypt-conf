var keytar = require('keytar');
var prompt = require("prompt-sync")();

module.exports = function(label, dirname) {
  var pw = keytar.getPassword("encrypt-conf", dirname);
  if(pw === null) {
    console.warn("WARN: Failed to retrieve from keychain");
    pw = prompt(label+": ", {echo: "*"});
    keytar.addPassword("encrypt-conf", dirname, pw);
  }
  return pw;
}
