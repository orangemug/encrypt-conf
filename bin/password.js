var prompt = require("prompt");
var Promise = require("pinkie-promise");

prompt.message = "[encrypt-conf]";

module.exports = {
  get: function(obj) {
    obj = Object.assign({}, obj);

    prompt.start();

    for(var k in obj) {
      obj[k] = {
        description: obj[k],
        hidden: true
      };
    }

    var schema = {
      properties: obj
    };

    return new Promise(function(resolve, reject) {
      prompt.get(schema, function(err, res) {
        if(err) {
          reject(err);
        }
        else {
          resolve(res);
        }
      });
    });
  }
};
