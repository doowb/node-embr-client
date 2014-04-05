
var _ = require('lodash');
var inspect = require('util').inspect;
var subscriber = require('../subscriber');

module.exports = {
  execute: function (options, callback) {
    var emdr = this;
    options = _.extend({}, options);

    var start = new Date();
    var count = 0;
    var total = 0;

    var outputInterval = setInterval(outputMessageRate, 1000);
    var loopInterval = setInterval(loop, 200);

    subscriber.call(emdr, options);
    emdr.on('data', function (data) {
      count++;
      // emdr.emit('log', data.toString());
    });

    function outputMessageRate () {
      var timeRunning = new Date() - start;
      // var rate = count / timeRunning;
      var rate = count;
      count = 0;
      start = new Date();
      emdr.emit('log', rate);
    };

    function loop () {
      total++;

      if (total > 50) {
        clearInterval(loopInterval);
        clearInterval(outputInterval);
        return callback(null);
      }
    };

  }
};
