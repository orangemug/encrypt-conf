var encryptConf = require("../");

console.log("NOTE: The password is 'password'")
var config = encryptConf(__dirname+"/config.json");

console.log();
console.log("config.secret:", JSON.stringify(config.secret));
console.log("config.public:", JSON.stringify(config.public));
