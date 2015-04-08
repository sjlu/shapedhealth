var models = require('../models');
var async = require('async');

module.exports.getUser = function(req, res, next) {
  if (req.user) return next();

  if (req.headers['authentication-token']) {
    async.waterfall([
      function(cb) {
        models.Token.findOne({
          token: req.headers['authentication-token']
        }, cb);
      },
      function(token, cb) {
        if (!token) {
          return cb(new Error());
        }

        models.User.findById(token._user, cb);
      },
      function(user, cb) {
        if (!user) {
          return cb(new Error());
        }

        req.user = user;
        cb();
      }
    ], function(err) {
      if (err) return res.send(401);
      next()
    });
  } else {
    return next();
  }
}

module.exports.needsLogin = function(req, res, next) {
  if (!req.user) return res.redirect('/login');
  return next();
}

module.exports.requiresUser = function(req, res, next) {
  if (!req.user) return res.send(401);
  return next();
}

module.exports.requiresAdmin = function(req, res, next) {
  if (!req.user.is_admin) return res.send(401);
  return next();
}