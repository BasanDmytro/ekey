/**
 * Created by admin on 13.02.17.
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';

var db = require(libs + 'db/mongoose');

router.get('/', function(req, res) {
    res.json({
        'sad': 'asd'
    });
    console.log("sad");
});

module.exports = router;