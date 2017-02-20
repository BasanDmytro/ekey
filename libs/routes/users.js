var express = require('express');
var passport = require('passport');
var multer = require('multer');
var upload = multer();
var bcrypt = require('bcrypt');
var router = express.Router();

var University = require('../model/univer');

var User = require('../model/article');

var Book = require('../model/book');

var libs = process.cwd() + '/libs/';

var db = require(libs + 'db/mongoose');

router.get('/', function(req, res) {
    res.json({
        'sad': 'asd'
    });
    console.log("sad");
});


router.get('/reg', function (req, res) {
    res.sendFile( __dirname + "/ekey-front/registration/" + "registrationUser.html" );

});

router.get('/main', function (req, res) {
    res.sendFile( __dirname + "/ekey-front/mainpage/" + "mainpage.html" );

});

router.get('/log', function (req, res) {
    res.sendFile( __dirname + "/ekey-front/login/" + "login.html" );

});

router.post('/setbook', upload.array(), function (req, res, next) { // set book to library
    var book = new Book;
    book.idNum = req.body.idBook;
    book.name = req.body.nameBook;
    book.author = req.body.authorBook;
    book.year = req.body.yearBook;
    book.pages = req.body.booksheets;
    book.description = req.body.keywords;
    console.log(book);
    book.save(function (err) {
        if (err) {
            res.sendStatus(404)
        }
    });
    res.sendFile( __dirname + "/ekey-front/mainpage/" + "mainpage.html" );
});


router.post('/setuniver', upload.array(), function (req, res, next) { // set univer
    var univer = new University;
    univer.name = req.body.name;
    univer.save(function (err) {
        if (err) {
            res.sendStatus(500)
        }
    })
});


router.post('/setbooktostudent', upload.array(), function (req, res, next) { // set book to library
    var idBook = req.body.idBook;
    var idStudent = req.body.id;
    var dateFrom = req.body.dateFrom;
    var dateTo = req.body.dateTo;
    Book.findOne({idNum: idBook}, function(err, book) {
        if (err) throw err;
        User.findOne({id: idStudent}, function (err, usr) {
            var temp = {};
            temp.idNum = book.idNum;
            temp.name = book.name;
            temp.author = book.author;
            temp.year = book.year;
            temp.pages = book.pages;
            temp.description = book.description;
            temp.dateFrom = dateFrom;
            temp.dateTo = dateTo;
            usr.books.push(JSON.stringify(temp));
            usr.save(function(err) {
                if(!err) {
                    console.log(usr);
                }
                else {
                    console.log("Error: " + err);
                }
            });
            if (err) throw err;
            res.sendFile( __dirname + "/ekey-front/mainpage/" + "mainpage.html" );
        });
    });
});

router.post('/deletebooktostudent', upload.array(), function (req, res, next) { // delete book to library
    var idBook = req.body.idBook;
    var idStudent = req.body.idStudent;
    Book.findOne({idNum: idBook}, function(err, book) {
        if (err) throw err;
        User.findOne({id: idStudent}, function (err, usr) {
            if (err) throw err;
            usr.books.pop(book);
            usr.save();
        });
    });
});

router.post('/setgroup', upload.array(), function (req, res, next) { // set group
    University.findOne({name: req.body.univer}, function(err, users) {
        if (err) throw err;
        users.groups.push(req.body.group);
        users.save();
    });
});

router.post('/setlibrary', upload.array(), function (req, res, next) { // set library
    University.findOne({name: req.body.univer}, function(err, users) {
        if (err) throw err;
        users.libraries.push(req.body.library);
        users.save();
    });
});




router.get('/universities', function(req, res) { //get all universities
    University.find({}, function(err, users) {
        if (err) throw err;
        res.send(JSON.stringify(users));
        console.log(users);
    });
});

router.post('/regstudent', upload.array(), function (req, res, next) {
    var user = new User;
    user.firstName = req.body.firstName;
    user.thirdName = req.body.thirdName;
    user.secondName = req.body.secondName;
    user.email = req.body.email;
    user.role = req.body.role;
    user.id = req.body.id;
    user.university = req.body.university;
    user.group = req.body.group;
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if (err) {
            res.sendStatus(500)
        } else {
            user.hashedPassword = hash;
            user.save(function (err) {
                if (err) {
                    res.sendStatus(404)
                }
                res.sendFile( __dirname + "/ekey-front/login/" + "login.html" );
            })
        }
    });

});

router.post('/reglib', upload.array(), function (req, res, next) {
    var user = new User;
    user.firstName = req.body.firstName;
    user.thirdName = req.body.thirdName;
    user.secondName = req.body.secondName;
    user.email = req.body.email;
    user.role = req.body.role;
    user.id = req.body.id;
    user.university = req.body.university;
    user.library = req.body.library;
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if (err) {
            res.sendStatus(500)
        } else {
            user.hashedPassword = hash;
            user.save(function (err) {
                if (err) {
                    res.sendStatus(404)
                }
                res.sendFile( __dirname + "/ekey-front/login/" + "login.html" );
            })
        }
    });
});

router.post ('/login', upload.array(), function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400);
    } else {
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({email: email})
            .select('email')
            .select('hashedPassword')
            .select('firstName')
            .select('thirdName')
            .select('secondName')
            .select('role')
            .select('university')
            .select('group')
            .select('library')
            .select('books')
            .exec(function(err, user){
                if (err) {
                    return res.sendStatus(500)
                }
                if (!user) {
                    return res.sendfile("401.html")
                }
                bcrypt.compare(password, user.hashedPassword, function(err, valid) {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    if (!valid) {
                        return res.sendStatus(404);
                    }
                    res.sendFile( __dirname + "/ekey-front/mainpage/" + "mainpage.html" );
                })
            })
    }
});

router.post('/usr', upload.array(), function(req, res, next) {
        User.findOne({email: req.body.email})
            .select('email')
            .select('id')
            .select('firstName')
            .select('thirdName')
            .select('secondName')
            .select('role')
            .select('university')
            .select('group')
            .select('library')
            .select('books')
            .exec(function(err, user){
                if (err) {
                    console.log("error");
                    return res.sendStatus(500)
                }
                console.log(JSON.stringify(user));
                res.json(JSON.stringify(user));
            })
});

module.exports = router;