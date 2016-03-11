var prompt = require("prompt-sync")();

module.exports = function(label) {
  return prompt(label+": ", {echo: "*"});
}
