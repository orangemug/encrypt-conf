var yargs = require("yargs");

yargs
  .usage('Usage: $0 <command> [options]')
  .demand(1)
  .command('encrypt',     'Encrypt the config',    require("./commands/encrypt"))
  .command('encrypt-key', 'Encrypt the config',    require("./commands/encrypt-key"))
  .command('decrypt',     'Decrypt the config',    require("./commands/decrypt"))
  .command('decrypt-key', 'Decrypt the config',    require("./commands/decrypt-key"))
  .command('re-encrypt',  'Re-encrypt the config', require("./commands/re-encrypt"))
  .strict()
  .help("help")
  .alias("h", "help")
  .argv
