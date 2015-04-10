var express = require('express');
var router = express.Router();
var models = require('../../models');
var Promise = require('bluebird');

router.get("/", function(req, res, next) {

  Promise.resolve()
    .then(function() {
      return models.Topic.find({}).populate('_creator').exec()
    })
    .then(function(topics) {
      res.json(topics);
    })
    .catch(next);

})

router.post("/", function(req, res, next) {

  Promise.resolve()
    .then(function() {
      return models.Topic.create({
        _creator: req.user,
        headline: req.body.headline
      })
    })
    .then(function(topic) {
      res.json(topic);
    })
    .catch(next);

})


router.get('/:id', function(req, res, next) {

  Promise.resolve()
    .then(function() {
      return models.Topic.findById(req.params.id).exec()
    })
    .then(function(topic) {
      res.json(topic)
    })
    .catch(next)

});

router.get('/:id/comments', function(req, res, next) {

  Promise.resolve()
    .then(function() {
      return models.Comment.find({
        _topic: req.params.id
      })
      .populate('_user')
      .exec()
    })
    .then(function(comment) {
      res.json(comment);
    })
    .catch(next);

})

router.post('/:id/comments', function(req, res, next) {

  Promise.resolve()
    .then(function() {
      return models.Topic.findById(req.params.id).exec()
    })
    .then(function(topic) {
      return models.Comment.create({
        _topic: topic,
        _user: req.user,
        text: req.body.text
      })
    })
    .then(function(comment) {
      res.json(comment);
    })
    .catch(next);

})

module.exports = router;