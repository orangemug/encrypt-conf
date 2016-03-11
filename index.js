var crypto  = require('crypto');
var Promise = require("pinkie-promise");
var debug   = require("debug")("encrypt-conf");


var algorithm = 'aes-256-ctr';

function encryptValue(obj, k, v, password) {
  if(v.match(/^encrypted:/)) {
    debug("Value already encrypted for key: %s", k);
  } else if(v.match(/^toencrypt:/)) {
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(v,'utf8','hex')
    crypted += cipher.final('hex');
    obj[k] = "encrypted:"+crypted;
  }
}
 
function decryptValue(obj, k, v, password) {
  if(v.match(/^encrypted:/)) {
    v = v.replace(/^encrypted:/, "");
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(v,'hex','utf8')
    dec += decipher.final('utf8');

    if(!dec.match(/^toencrypt:/)) {
      throw "Invalid password";
    } else {
      obj[k] = dec;
    }
  } else {
    debug("Value already decrypted for key: %s", k);
  }
}

function walkObj(obj, fn) {
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) {
      continue;
    }
    var v = obj[k];

    if(Array.isArray(v)) {
      throw "Sorry not allowed";
    }
    else if(typeof(v) === "object") {
      walkObj(v, fn);
    } else {
      fn(k, v);
    }
  }
  return obj;
}

function encrypt(obj, password) {
  return walkObj(obj, function(k, v) {
    encryptValue(obj, k, v, password);
  });
}

function decrypt(obj, password) {
  return walkObj(obj, function(k, v) {
    decryptValue(obj, k, v, password);
  });
}

function reEncrypt(obj, oldPassword, newPassword) {
  var decryptedObj = decrypt(obj, oldPassword);
  return encrypted(decryptedObj, newPassword);
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  reEncrypt: reEncrypt
};
