# example-cli
To fetch the encypted secret

    node bin/cli.js decrypt-key examples/example-cli/config.json secret 

The password is `secret` and will be stored in the keychain after to type the password the first time.

To reset the password run

    node bin/cli.js keychain-reset examples/example-cli/config.json

