var prompt   = require("prompt-sync")();
var checkDep = require("check-dep");

// Require keytar if it exists
if(checkDep("keytar", "^3.0.0")) {
  var keytar = require("keytar");
}

module.exports = {
  get: function(label, dirname) {
    var pw;
    if(keytar) {
      pw = keytar.getPassword("encrypt-conf", dirname);
    }

    if(!pw) {
      if(keytar) {
        console.warn("WARN: Failed to retrieve from keychain");
      }

      pw = prompt(label+": ", {echo: "*"});

      if(keytar) {
        keytar.addPassword("encrypt-conf", dirname, pw);
      }
    }
    return pw;
  },
  delete: function(service, app, opts) {
    if(keytar) {
      keytar.deletePassword(service, app);
    } else if(opts.warn) {
      console.warn("WARN: keytar not installed");
    }
  }
}
