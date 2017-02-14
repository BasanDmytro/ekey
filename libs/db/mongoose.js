var mongoose = require('mongoose');
var db_url = process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/apiDB';
mongoose.Promise = global.Promise;
mongoose.connect(db_url, function(){
    console.log('MongoDB connected sucessfully')
});

module.exports = mongoose;