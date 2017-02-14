var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Library = new Schema({
    name: {
        type: String
    }
});

var Group = new Schema({
    name: {
        type: String
    }
});

var University = new Schema({
    name: {
        type: String,
    },
    libraries: [Library],
    groups: [Group]
});

module.exports = mongoose.model('University', University);