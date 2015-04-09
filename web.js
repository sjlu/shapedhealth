var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var redis = require('./lib/redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var flash = require('express-flash');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var models = require('./models');
var auth = require('./lib/auth');

// config
// app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  secret: config.SESSION_SECRET,
  store: new RedisStore({
    client: redis
  }),
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// auth
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  models.User.findById(id, done);
});
passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: config.URL + "/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'email', 'picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    profile = profile._json;
    models.User.findOrCreate({
      fbid: profile.id
    }, {}, function(err, user) {
      if (err) return done(err);
      user.first_name = profile.first_name;
      user.last_name = profile.last_name;
      user.email = profile.email;

      if (profile.picture && profile.picture.data && profile.picture.data.url) {
        user.picture = profile.picture.data.url;
      } else {
        user.picture = null;
      }

      user.save(function(err, user) {
        if (err) return done(err);
        done(null, user);
      });
    });
  }
));

// get user
app.use(auth.getUser);

// routes
app.use('/', require('./routes/index'));
app.use('/app', require('./routes/app'));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.trace(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.trace(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
