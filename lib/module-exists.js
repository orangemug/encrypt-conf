var path    = require("path");
var readPkg = require("read-pkg");
var semver  = require("semver");


module.exports = function(moduleName, version) {
  var pkgPath;
  try {
    pkgPath = require.resolve(moduleName);
  } catch(err) {
    return;
  }

  var pkg = readPkg.sync(
    path.dirname(pkgPath)
  );

  return semver.satisfies(pkg.version, version);
}
