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

})

module.exports = router;