var DB = require('./dbUtils');
var db = new DB();

function getPointInfo() {
	this.getPointInfo = function(callback) {
		var sql = "select * from device_location";
		db.select_OR_delete(sql, function(err, results, fields) {
			if (err) {
				console.log('CONNECT ERROR: ', err.message);
				callback(err, null, null);
			} else {
				callback(err, results, fields);
			}
			
		});
	};
}

module.exports = getPointInfo;