var mongoose = require('mongoose');
require('./univer');
var Schema = mongoose.Schema;


var User = new Schema({
		firstName: {
			type: String
		},
		thirdName: {
			type: String
		},
		secondName: {
			type: String
		},
        email: {
            type: String,
            unique: true
        },
        hashedPassword: {
            type: String
        },
		idNum: {
        	type: String
	    },
		role: {
        	type: String,
			required: true
		},
        university: {
            type: String,
            required: true
        },
        group: {
            type: String
        },
        library: {
            type: String
        },
        books: [JSON]

    });

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('hex');
        //more secure - this.salt = crypto.randomBytes(128).toString('hex');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};


module.exports = mongoose.model('User', User);


