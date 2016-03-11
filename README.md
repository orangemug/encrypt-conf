# encrypt-conf
Encrypt/decrypt a config.


## Install

    npm install


## CLI
Global usage

    Usage: bin/cli.js <command> [options]

    Commands:
      encrypt      Encrypt the config
      encrypt-key  Encrypt the config
      decrypt      Decrypt the config
      decrypt-key  Decrypt the config
      re-encrypt   Re-encrypt the config

    Options:
      -h, --help  Show help                                                [boolean]

Command usage


Some example usage, first off see the usage

    Usage: bin/cli.js <config_file> <key> <value>

    Options:
      -h, --help  Show help                                                [boolean]

Then encypt a value to the config

    node bin/cli.js encrypt-key example.json secure secret
    [encrypt-conf]: password: *****

See the encrypted value in the config

    $ cat example.json 
    {
      "secure": "encrypted:eadaed95c762f4108720cf477bf75a08"
    }

To decrypt it again

    $ node bin/cli.js decrypt-key example.json secure
    [encrypt-conf]: password:  
    secret


## Usage
To use in your app

    var encryptConf = require("encrypt-conf");

    // NOTE: It'll prompt in development if `ENCRYPT_CONF_PASSPHRASE`
    prompt.env.ENCRYPT_CONF_PASSPHRASE = "password";
    var config = encryptConf(__dirname+"/config.json", prompt.env.ENCRYPT_CONF_PASSPHRASE);
    assert.equal(config.secret, "secret");

**NOTE:** This is all synchronous so should be done at require time.


## License
[MIT](LICENSE)
