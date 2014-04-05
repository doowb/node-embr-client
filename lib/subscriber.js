
var zmq = require('zmq');
var zlib = require('zlib');
var sub = zmq.socket('sub');


module.exports = function (options) {
  console.log('subscriber::options', options);
  var emdr = this;

  sub.connect(options.endpoint);
  sub.subscribe(options.channel);

  sub.on('message', function (data) {
    zlib.inflate(data, function (err, obj) {
      var output = JSON.parse(obj);
      emdr.emit('data', obj);
    });
  });

};
