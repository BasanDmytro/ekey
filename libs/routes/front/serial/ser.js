var serialport = require("serialport").SerialPort;
var express = require('express');
var app = express();
var fs = require("fs");
var SerialPort = serialport.SerialPort;

var serialPort = new SerialPort("/dev/cu.usbmodem1411", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

var dataForOut;
serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log(data);
    dataForOut = data;
  });
});

app.get('/', function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(dataForOut);
});

var server = app.listen(1488, function () {
	var host = server.address().address;
	var port = server.address().port
});