var express = require('express');
var router = express.Router();
var auth = require('../../lib/auth');

// lock away
router.use(auth.requiresUser);

// routes
router.use("/me", require('./me'));

module.exports = router;
