var express = require('express');
var router = express.Router();
var models = require('../models');
var validator = require('validator');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index');
});

module.exports = router;
