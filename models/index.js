var mongoose = require('../lib/mongoose');
var fs = require('fs');

fs.readdirSync(__dirname).forEach(function(file) {
  if (file.indexOf('.js') < 0 || file === "index.js") return;

  var modelName = file.replace('.js', '');
  modelName = modelName.substring(0, 1).toUpperCase() + modelName.substring(1);

  module.exports[modelName] = require(__dirname + "/" + file);
});