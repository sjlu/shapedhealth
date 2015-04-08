var FB = require('fb');

module.exports.me = function(token, cb) {
  // ping facebook for our id
  FB.api('me', {
    fields: 'first_name,last_name,email',
    access_token: token
  }, function(result) {
    if (!result || result.error) {
      return cb(result.error);
    }

    cb(null, result);
  })
}