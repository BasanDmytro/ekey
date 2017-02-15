var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var oldUser = new Schema({
    name: { type: String, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true }
});

var Book = new Schema({
    idNum: {type: String, required: true},
    name: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: String, required: true },
    pages: { type: String, required: true },
    description: { type: String, required: true },
    oldUsers: [oldUser],
    library: { type: String, required: true}
});


