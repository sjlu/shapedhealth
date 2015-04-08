var kue = require('./kue');
var jobs = require('../jobs');

module.exports.create = function(name, data) {
  var j = kue.create(name, data);

  return {
    save: function(cb) {
      if (!jobs[name]) {
        return cb(new Error("no such job named " + name))
      }
      return j.save(cb);
    }
  }
};