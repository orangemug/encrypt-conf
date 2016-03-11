module.exports = {
  success: function(data) {
    if(data !== undefined) {
      console.log(data);
    }
    process.exit(0);
  },
  error: function(err, code) {
    console.error("ERR: %s", err);
    process.exit(code || 1);
    return;
  }
};
