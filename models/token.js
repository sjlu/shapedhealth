var mongoose = require('../lib/mongoose');
var uid = require('uid');

var Token = new mongoose.Schema({
  _user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    default: function() {
      return uid(24);
    }
  }
});

module.exports = mongoose.model('Token', Token);