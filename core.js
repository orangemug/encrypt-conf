var crypto = require('crypto');
var debug  = require("debug")("encrypt-conf");


var algorithm = 'aes-256-ctr';

function encryptValue(k, v, password) {
  if(v.match(/^encrypted:/)) {
    debug("Value already encrypted for key: %s", k);
    return v;
  } else if(v.match(/^toencrypt:/)) {
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(v,'utf8','hex')
    crypted += cipher.final('hex');
    return "encrypted:"+crypted;
  } else {
    return v;
  }
}
 
function decryptValue(k, v, password, remove) {
  if(v.match(/^encrypted:/)) {
    v = v.replace(/^encrypted:/, "");
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(v,'hex','utf8')
    dec += decipher.final('utf8');

    if(!dec.match(/^toencrypt:/)) {
      var err = new Error("Invalid password");
      err.code = "invalid_password";
      throw err;
    } else {
      if(remove) {
        return dec.replace(/^toencrypt:/, "")
      } else {
        return dec;
      }
    }
  } else {
    debug("Value already decrypted for key: %s", k);
    return v;
  }
}

function walkObj(obj, fn) {
  obj = Object.assign({}, obj);
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) {
      continue;
    }
    var v = obj[k];

    if(Array.isArray(v)) {
      throw "Sorry not allowed";
    }
    else if(typeof(v) === "object") {
      obj[k] = walkObj(v, fn);
    } else {
      obj[k] = fn(k, v);
    }
  }
  return obj;
}

function encrypt(obj, password) {
  return walkObj(obj, function(k, v) {
    return encryptValue(k, v, password);
  });
}

function decrypt(obj, password, clean) {
  return walkObj(obj, function(k, v) {
    return decryptValue(k, v, password, clean);
  });
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
};
