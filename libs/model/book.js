var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
    idNum: {type: String, required: true},
    name: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: String, required: true },
    pages: { type: String, required: true },
    description: { type: String, required: true },
    dateFrom: { type: String },
    dateTo: { type: String }
});


module.exports = mongoose.model('Book', Book);