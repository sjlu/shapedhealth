var mongoose = require('../lib/mongoose');
var moment = require('moment');

var Topic = new mongoose.Schema({
  _creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  headline: {
    type: String,
    required: true
  }
});

Topic.pre('save', function(next) {
  this.updated_at = Date.now()
  next();
})

Topic.virtual('updated_ago', function() {
  return moment(this.updated_at).fromNow(true)
})

module.exports = mongoose.model('Topic', Topic);