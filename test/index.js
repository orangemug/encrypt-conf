var assert = require("assert");
var encryptConf = require("../core");


describe("encrypt-conf", function() {
  var refIn = {
    "secure":   "toencrypt:private",
    "insecure": "public",
  }

  var refOut = {
    "secure":   "encrypted:eadaed95c762f4108720cc5071f35e08bd",
    "insecure": "public"
  }

  it("should encrypt", function() {
    var out = encryptConf.encrypt(refIn, "foobar");
    assert.deepEqual(out, refOut);
  });

  it("should decrypt", function() {
    var out = encryptConf.decrypt(refOut, "foobar");
    assert.deepEqual(out, refIn);
  });

});
