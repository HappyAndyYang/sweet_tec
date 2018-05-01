var express = require('express');
var router = express.Router();
var Socketclient = require('../socket/socketclient');
var socketclient = new Socketclient();

router.post('/goAhead', function(req, res, next) {
	socketclient.sendMessage(true,"*UP#");
	console.log("11111111111------");
	res.send();
});

router.post('/goBack', function(req, res, next) {
	socketclient.sendMessage(true,"*DOWN#");
	res.send();
});

router.post('/turnLeft', function(req, res, next) {
	socketclient.sendMessage(true,"*STAY#");
	res.send();
});

router.post('/turnRight', function(req, res, next) {
	socketclient.sendMessage(true,"turnRight");
	res.send();
});

router.post('/start', function(req, res, next) {
	socketclient.sendMessage(true,"start");
	res.send();
});

router.post('/stop', function(req, res, next) {
	socketclient.sendMessage(true,"stop");
	res.send();
});

module.exports = router;