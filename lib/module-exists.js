var fs      = require("fs");
var path    = require("path");
var pkgUp   = require("pkg-up");
var semver  = require("semver");


module.exports = function(moduleName, version) {
  var modPath;
  try {
    modPath = require.resolve(moduleName);
  } catch(err) {
    return;
  }

  var pkgPath = pkgUp.sync(
    path.dirname(modPath)
  );

  var pkg = JSON.parse(
    fs.readFileSync(pkgPath).toString()
  );

  return semver.satisfies(pkg.version, version);
}
