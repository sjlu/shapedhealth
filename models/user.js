var mongoose = require('../lib/mongoose');
var _ = require('lodash');
var findOrCreate = require('mongoose-findorcreate')

var User = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true
  },
  fbid: {
    type: Number,
    required: true,
    unique: true
  },
  picture: {
    type: String
  }
});

User.plugin(findOrCreate);

User.method('toJSON', function() {
  var user = this.toObject({virtuals: true});
  delete user.password;
  return user;
});

User.virtual('name').get(function() {
  var name = [];
  if (this.first_name) {
    name.push(this.first_name);
  }
  if (this.last_name) {
    name.push(this.last_name);
  }
  return name.join(" ");
});

User.virtual('is_admin').get(function() {
  if (_.contains([
    'tacticalazn@gmail.com'
  ], this.email)) {
    return true;
  }

  return false;
})

module.exports = mongoose.model('User', User);
