var mongoose = require('mongoose');
require('./article');
var Schema = mongoose.Schema;

var University = new Schema({
    name: {
        type: String
    },
    libraries: [String],
    groups: [String]
});

module.exports = mongoose.model('University', University);
