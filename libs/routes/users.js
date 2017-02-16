/**
 * Created by admin on 13.02.17.
 */
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

router.post('/setbook', upload.array(), function (req, res, next) { // set book to library
    var book = new Book;
    book.idNum = req.body.idNum;
    book.name = req.body.name;
    book.author = req.body.author;
    book.year = req.body.year;
    book.pages = req.body.pages;
    book.description = req.body.description;
    book.library = req.body.library;
    book.save(function (err) {
        if (err) {
            res.sendStatus(500)
        }
        res.send("OK");
    })
});

router.post('/setbooktostudent', upload.array(), function (req, res, next) { // set book to library
    var idBook = req.body.idBook;
    var idStudent = req.body.idStudent;
    Book.findOne({idNum: idBook}, function(err, book) {
        if (err) throw err;
        User.findOne({id: idStudent}, function (err, usr) {
            if (err) throw err;
            usr.books.push(book);
            usr.save();
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


router.post('/setuniver', upload.array(), function (req, res, next) { // set univer
   var univer = new University;
   univer.name = req.body.name;
   univer.save(function (err) {
       if (err) {
           res.sendStatus(500)
       }
   })
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
    bcrypt.hash(password, 10, function(err, hash){
        if (err) {
            res.sendStatus(500)
        } else {
            user.hashedPassword = hash;
            user.save(function (err) {
                if (err) {
                    res.sendStatus(500)
                }
                res.send("OK");
            })
        }
    })
});


router.post ('/login', upload.array(), function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400);
    } else {
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({username: email})
            .select('email')
            .select('hashedPassword')
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
                        return res.sendfile("401.html")
                    }
                    res.send(
                        JSON.stringify(user)
                    );
                })
            })
    }
});

module.exports = router;