var _ = require('lodash');
var dotenv = require('dotenv');

// load dotenv config vars if available
dotenv.load();

var config = {
  ENV: 'development',
  URL: 'http://localhost:3000',
  SESSION_SECRET: 'Ouj4rZ5ZhI8ou1zdv9P9jjwfZngAUaJr',
  MONGOLAB_URI: 'mongodb://localhost/shapedhealth',
  REDISCLOUD_URL: 'redis://localhost:6379',
  FACEBOOK_APP_ID: '595040690632625',
  FACEBOOK_APP_SECRET: '883cce3363e766ad3a41f2edbb3f4c98'
};
config = _.defaults(process.env, config);

// tell express what environment we're in
process.env.NODE_ENV = config.ENV;

module.exports = config;
