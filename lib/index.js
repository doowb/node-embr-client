
var Emdr = require('./emdr');

module.exports = {
  execute: function (task, callback) {
    var options = {
      task: task
    };
    var emdr = new Emdr(options);
    emdr.init(function (err) {
      if (err) {
        return callback(err);
      }
      emdr.execute(callback);
    });
  }
};
