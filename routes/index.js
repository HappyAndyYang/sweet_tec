var express = require('express');
var router = express.Router();
var GetPointInfo = require("../dbaction/getPointInfo");
var Socketclient = require('../socket/socketclient');

var getPointInfo = new GetPointInfo();
var socketclient = new Socketclient();
//var io = require('../socketio');
/* GET home page. */
router.get('/', function(req, res, next) {
//	  res.render('index', { title: 'Express' });
//		res.render('showTime');
	res.render('baidu_map_v2');
});

router.get('/GetPoint', function(req, res, next) {
	var data = {};
	getPointInfo.getPointInfo(function(err,result,callback) {
		data = {
				latitude: result[0].latitude,
				longitude: result[0].longitude
		};
		console.log(data);
		res.send(data);
	});
});

router.get('/map', function(req, res, next) {
//	  res.render('index', { title: 'Express' });
//		res.render('showTime');
	res.render('baidu_map');
});

module.exports = router;
