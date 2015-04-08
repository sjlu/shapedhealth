var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebook = require('../lib/facebook');
var Promise = require('bluebird');
var models = require('../models');
var _ = require('lodash');

router.post('/token', function(req, res, next) {
  var token = req.body["FBAccessToken"]
  if (!token) {
    next(new Error("FBAccessToken is required in the body"))
  }

  var getMe = Promise.promisify(facebook.me);
  var findOrCreate = Promise.promisify(models.User.findOrCreate, models.User);

  Promise.resolve()
    .bind({})
    .then(function() {
      return getMe(token);
    })
    .then(function(fbUser) {
      this.fbUser = fbUser;
      return findOrCreate({fbid: fbUser.id}, {})
    })
    .then(function(user) {
      user = _.first(user);
      req.user = user;
      user.first_name = this.fbUser.first_name;
      user.last_name = this.fbUser.last_name;
      return user.save()
    })
    .then(function(user) {
      return models.Token.create({
        _user: user._id
      })
    })
    .then(function(token) {
      res.json(token);
    })
    .catch(next);
});
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/app',
  failureRedirect: '/auth/facebook'
}));

module.exports = router;