var mongoose = require('mongoose');

var libs = process.cwd() + '/libs/';

var config = require(libs + 'config');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;


module.exports = mongoose;