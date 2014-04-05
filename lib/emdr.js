
var file = require('fs-utils');
var async = require('async');
var _ = require('lodash');

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var config = file.readDataSync(process.cwd() + '/_config.yml');

var Emdr = module.exports = function (options) {
  EventEmitter.call(this);
  this.options = _.extend({ task: 'start' }, options, config);
};
util.inherits(Emdr, EventEmitter);

Emdr.prototype.init = function (ready) {

  var self = this;
  self.tasks = {};

  async.eachSeries(this.options.tasks,
    function (task, next) {
      try {
        self.tasks[task] = require('./tasks/' + task);
      } catch (err) {
        return next(err);
      }
      next();
    },
  function (err) {
    ready(err);
  });

};

Emdr.prototype.execute = function (callback) {
  var task = this.tasks[this.options.task];
  if (!task) {
    var err = new Error('No task (' + this.options.task + ') exists for emdr');
    return callback(err);
  }

  this.on('log', function (msg) {
    console.log(msg);
  });
  task.execute.apply(this, [this.options, callback]);

};
