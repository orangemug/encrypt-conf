var keytar = require('keytar');
var yargs  = require("yargs");

function guard(fn) {
  return function(yargs) {
    try {
      fn(yargs);
      process.exit(0);
    } catch(err) {
      console.error("ERR: %s", err.toString());
      process.exit(1);
    }
  }
}

yargs
  .usage('Usage: $0 <command> [options]')
  .demand(1)
  .command(
    'encrypt',
    'Encrypt the config',
    guard(require("./commands/encrypt"))
  )
  .command(
    'encrypt-key',
    'Encrypt the config',
    guard(require("./commands/encrypt-key"))
  )
  .command(
    'decrypt',
    'Decrypt the config',
    guard(require("./commands/decrypt"))
  )
  .command(
    'decrypt-key',
    'Decrypt the config',
    guard(require("./commands/decrypt-key"))
  )
  .command(
    'change-password',
    'Change the password',
    guard(require("./commands/change-password"))
  )
  .command(
    'keychain-reset',
    'Reset from keychain',
    guard(require("./commands/keychain-reset"))
  )
  .strict()
  .help("help")
  .alias("h", "help")
  .argv
