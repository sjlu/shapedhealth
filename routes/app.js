var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

// needs auth
router.use(auth.needsLogin);

// app
router.get('/', function(req, res, next) {
  return res.render('app');
});

module.exports = router;