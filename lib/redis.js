var redis = require("redis");
var URI = require('URIjs');
var config = require('../config');

if (config.REDISCLOUD_URL) {
  var redisParts = URI(config.REDISCLOUD_URL);
  var hostname = redisParts.hostname();
  var port = redisParts.port();
  var password = redisParts.password();
}

var client;
if (config.REDISCLOUD_URL) {
  client = redis.createClient(port, hostname, {
    auth_pass: password
  });
} else {
  client = redis.createClient();
}

module.exports = client;