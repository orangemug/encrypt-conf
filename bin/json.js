var fs      = require("fs");
var Promise = require("pinkie-promise");


function get(filepath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filepath, function(err, data) {
      if(err) {
        return error(err);
      }

      try {
        return resolve(JSON.parse(data));
      } catch(err) {
        return reject(err);
      }
    });
  });
}

function set(filepath, data) {
  return new Promise(function(resolve, reject) {
    var jsonData = JSON.stringify(data, null, "  ");
    fs.writeFile(filepath, jsonData, function(err, data) {
      if(err) {
        return reject(err);
      }
      else {
        return resolve();
      }
    });
  });
}

module.exports = {
  get: get,
  set: set
};
