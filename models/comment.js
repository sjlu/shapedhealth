var mongoose = require('../lib/mongoose');
var uid = require('uid');

var Comment = new mongoose.Schema({
  _user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  _topic: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Topic',
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Comment', Comment);